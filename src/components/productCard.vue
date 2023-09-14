<script  setup>
import { computed } from "vue";
import { useProductsStore } from "../store/productsStore"
import {useVentaStore} from '../store/ventaStore';
const ventaStore = useVentaStore()
const ventas = computed(() => ventaStore.ventasHash)

const storeProds = useProductsStore()
const props = defineProps({
   idProd: Number
  ,photo: String
  ,name: String
  ,precio: Number
  ,count: Number
})
</script>
<template>
  <article :id="`cont-item-${idProd}`" class="container-item center-col-top radius n-select">

    <img class="radius container-item-img" :src="photo" alt="">
    <p class="text-center container-item-text">{{name}} <strong v-if="!(idProd in ventas)" style="cursor: pointer;" @click="(storeProds.del(idProd))" >🗑️</strong></p>
    
    <p class=" container-item-text" :id="`container-item-precio-${idProd}`">Precio: ${{precio}}</p>
    <input style="display: none" type="number" :value="precio" name="" :id="`container-item-precio-input-${idProd}`">
    
    <p class="container-item-text" :id="`container-item-count-${idProd}`">Cantidad: {{count}}</p>
    <input style="display: none" type="number" :value="count" name="" :id="`container-item-count-input-${idProd}`">
  </article>
    
</template>