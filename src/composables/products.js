import { useStoge } from "./localStorage";
const { storage } = useStoge();

class Producto {
  constructor({ id, photo, name, count, precio }) {
    this.id = typeof id !== "undefined" ? id : Date.now();
    this.photo = photo;
    this.name = name;
    this.count = count;
    this.precio = precio;
  }
  get() {
    return {
      id: this.id,
      photo: this.photo,
      name: this.name,
      count: this.count,
      precio: this.precio,
    };
  }
  agregar() {}
  disminuir() {
    return {
      photo: this.photo,
      name: this.name,
      count: this.count,
      precio: this.precio,
    };
  }
}

class Productos {
  constructor() {
    this.productos = [];
  }
  get() {
    return this.productos;
  }
  getById(id) {
    return this.productos.find((prod) => prod.id == id);
  }
  isIn(id) {
    return this.productos.reduce(
      (ac, cur) => (ac = ac == true ? true : cur.id == id),
      false
    );
  }
  nuevoProducto(producto) {
    if (this.isIn(producto.id)) return;
    this.productos.unshift(producto);
    storage.set("productos", this.productos);
  }
  viejoProducto(producto) {
    if (this.isIn(producto.id)) return;
    this.productos.push(producto);
    storage.set("productos", this.productos);
  }
  nuevosProductos(arr) {
    arr.forEach((el) => {
      this.viejoProducto(new Producto({ ...el }));
    });
  }
  actualizarProducto(id, nuevoProducto) {
    const productoExistente = this.productos.find(
      (producto) => producto.id == id
    );
    if (productoExistente) {
      Object.assign(productoExistente, nuevoProducto);
      storage.set("productos", this.productos);
    }
  }
  eliminarProducto(id) {
    const index = this.productos.findIndex((producto) => producto.id == id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      storage.set("productos", this.productos);
    }
  }
}

const productos = new Productos();

export function useProduct() {
  if (!storage.get("productos")) {
    storage.set("productos", []);
  }
  if (storage.get("productos")) {
    const prods = storage.get("productos")
    productos.nuevosProductos(prods);
  }

  const newProduct = ({ photo, name, count, precio }) => {
    const newProducto = new Producto({
      photo: photo,
      name: name,
      count: count,
      precio: precio,
    });
    productos.nuevoProducto(newProducto);
  };


  return {
    newProduct,
    productos,
  };
}
