import { useStoge } from "./localStorage";
const { storage } = useStoge();

class Detalle {
  constructor({ idProducto, cantidad }) {
    this.idProducto = idProducto;
    this.cantidad = cantidad;
  }
  get() {
    return {
      idProducto: this.idProducto,
      cantidad: this.cantidad,
    };
  }
}
class Venta {
  constructor({ id, arr }) {
    this.id = typeof id !== "undefined" ? id : Date.now();
    this.arr = arr.map(
      (det) =>
        new Detalle({
          idProducto: det.idProducto,
          cantidad: det.cantidad,
        })
    );
    this.has = arr.reduce((ac, cu) => {
      if (cu.idProducto in ac) {
        ac[cu.idProducto] = ac[cu.idProducto] + cu.cantidad;
        return ac;
      }
      ac[cu.idProducto] = cu.cantidad;
      return ac;
    }, {});
  }
  get() {
    return {
      id: this.id,
      arr: this.arr,
    };
  }
}

class Ventas {
  constructor() {
    this.ventas = [];
    this.hashVentas = {};
  }
  get() {
    return this.ventas;
  }
  isIn(id) {
    return this.ventas.reduce(
      (ac, cur) => (ac = ac == true ? true : cur.id == id),
      false
    );
  }
  updateHashVentas() {
    this.hashVentas = this.ventas.reduce((ac, cu) => {
      Object.keys(cu.has).forEach((key) => {
        if (key in ac) {
          ac[key] = ac[key] + cu.has[key];
          return;
        }
        ac[key] = cu.has[key];
      });
      return ac;
    }, {});
  }
  nuevaVenta(venta) {
    if (this.isIn(venta.id)) return;
    this.ventas.unshift(venta);
    storage.set("ventas", this.ventas);
    this.updateHashVentas();
  }
  viejaVenta(venta) {
    if (this.isIn(venta.id)) return;
    this.ventas.push(venta);
    storage.set("ventas", this.ventas);
    this.updateHashVentas();
  }
  nuevasVentas(arr) {
    arr.forEach((el) => {
      this.viejaVenta(new Venta({ ...el }));
    });
    this.updateHashVentas();
  }
  actualizarVenta(id, nuevaVenta) {
    const ven = this.ventas.find((venta) => venta.id == id);
    if (ven) {
      Object.assign(ven, nuevaVenta);
      storage.set("ventas", this.ventas);
    }
    this.updateHashVentas();
  }
  eliminarVenta(id) {
    const index = this.ventas.findIndex((venta) => venta.id == id);
    if (index !== -1) {
      this.ventas.splice(index, 1);
      storage.set("ventas", this.ventas);
    }
    this.updateHashVentas();
  }
}

const ventas = new Ventas();

export function useVentas() {
  if (!storage.get("ventas")) {
    storage.set("ventas", []);
  }
  if (storage.get("ventas")) {
    const ven = storage.get("ventas");
    ventas.nuevasVentas(ven);
  }
  const newVenta = (venta) => {
    const newVenta = new Venta(venta);
    ventas.nuevaVenta(newVenta);
  };

  return {
    newVenta,
    ventas,
  };
}
