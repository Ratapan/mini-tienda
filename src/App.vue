<script setup>
import { ref } from "vue";
import ProductSlider from "./components/productSlider.vue";
import Modal from "./components/modal.vue";
import Venta from "./components/venta.vue";

const showProducts = ref(true);
</script>
<template>
  <header class="n-select flex">
    <h1>Mini tienda!</h1>
  </header>
  <br />
  <main>
    <div class="n-select flex">
      <h2>Productos</h2>
      &nbsp; &nbsp;
      <i
        @click="showProducts = !showProducts"
        id="btn-show-products"
        class="gg-chevron-up-o"
        :class="showProducts ? 'rotateDown' : 'rotateUp'"
      ></i>
    </div>
    <ProductSlider v-if="showProducts" :show="showProducts" />
    <br />
    <div class="n-select flex">
      <h2>Crear venta</h2>
    </div>
    <Venta />
  </main>
  <br />
  <br />
  <br />
  <br />
  <footer class="footer flex-center">
    <img
      class="footer__logo"
      src="https://ratapan.com/repo/Imgs/svg/rtp-b.svg"
      alt="logo"
    />
    <p>
      &nbsp; &nbsp; Sígueme en
      <a href="http://github.com/Ratapan/" target="_blank">Github🐈‍⬛ </a> o
      <a
        href="https://www.instagram.com/ratapics/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IG📸 </a
      > 
    </p>
  </footer>
  <Modal />
</template>
