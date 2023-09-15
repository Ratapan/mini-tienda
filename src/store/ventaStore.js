import { defineStore } from "pinia";
import { useVentas } from "../composables/ventas";
import { useProduct } from "../composables/products";
const { newVenta, ventas } = useVentas();
const { productos } = useProduct();

export const useVentaStore = defineStore("ventas", {
  state: () => ({
    ventasList: [...ventas.get()],
    ventasHas: { ...ventas.getHash() }
  }),
  getters: {
    ventas: (state) => {
      if (state.ventasList.length > 0) {
        const ventas = state.ventasList.map((v) => {
          const details = Object.keys(v.has).map((id) => {
            const prodDetail = productos.getById(id);
            const cantidad = v.has[id];
            return {
              id,
              cantidad,
              total: prodDetail.precio * cantidad,
              name: prodDetail.name,
            };
          });
          const total = details.reduce((ac, cu) => (ac += cu["total"]), 0);
          return { ...v, details, total };
        });
        const total = ventas.reduce((ac, cu) => (ac += cu["total"]), 0);
        return { total, ventas };
      }
      return [];
    },
    ventasHash: (state) => {
      return { ...state.ventasHas };
    },
    ventaById: (state) => {
      return (id) => state.ventasList.find((el) => el.id == id);
    },
  },
  actions: {
    add(venta) {
      newVenta(venta);
      this.ventasList = [...ventas.get()];
      this.ventasHas = { ...ventas.getHash() };
    },
    del(id) {
      ventas.eliminarVenta(id);
      this.ventasList = [...ventas.get()];
      this.ventasHas = { ...ventas.getHash() };
    },
  },
});
