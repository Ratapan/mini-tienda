import { defineStore } from "pinia";
import { useProduct } from "../composables/products";
const { newProduct, productos } = useProduct();

export const useProductsStore = defineStore("products", {
  state: () => ({ products: [...productos.get()] }),
  getters: {
    productos: (state) => {
      if (state.products.length > 0) return state.products;
      return [
        {
          id: 0,
          photo: "http://placekitten.com/250/250",
          name: "Ejemplo",
          precio: 1000,
          count: 1,
        },
      ];
    },
    productoById: (state) => {
      return (id) => state.products.find((prod) => prod.id == id);
    },
  },
  actions: {
    add(product) {
      newProduct(product);
      this.products = [...productos.get()];
    },
    del(id) {
      productos.eliminarProducto(id)
      this.products =[...productos.get()];
    },
  },
});
