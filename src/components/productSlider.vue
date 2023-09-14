<script setup>
import {useProductsStore} from '../store/productsStore';
import {useModal} from "../composables/modal";
import ProductCard from "./productCard.vue";
import { computed } from "vue";

const { change } = useModal();
const storeProds = useProductsStore()

const productos = computed(() => storeProds.productos)

const props = defineProps({
  show: Boolean,
});


</script>
<template>
  <section id="show-products" :class="show ? 'sectionShow' : 'sectionShowNo'">
    <br />
    <button
      id="newProduct"
      @click="change"
      class="n-select radius center"
      type="button"
    >
      <i class="gg-add"></i> &nbsp; &nbsp;
      <p>Nuevo producto &nbsp;</p>
    </button>
    <br />
    <div class="slider radius-mini" id="slider-productos">
      <div v-for="(card,i) in productos" :key="i">
        <ProductCard 
        :idProd="card.id"
        :photo="card.photo"
        :name="card.name"
        :precio="card.precio"
        :count="card.count"
        />
      </div>
    </div>
  </section>
</template>