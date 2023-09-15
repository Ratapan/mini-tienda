<script setup>
import { useModal } from "../composables/modal";
import {useProductsStore} from '../store/productsStore';

const useProds = useProductsStore()

import { onMounted, ref, watch } from "vue";
const { showModal, change } = useModal();

const photo = ref("");
const name = ref("");
const precio = ref("");
const count = ref("");
const stream = ref(null);

const error = ref(false);

onMounted(async () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { min: 300, ideal: 300, max: 300 },
        height: { min: 300, ideal: 300, max: 300 },
      },
      audio: false,
    });
  } catch (error) {
    console.log(error);
  }
  async function startVideo(stream, video) {
    stream.value.get;
    video.srcObject = stream.value;
  }
  async function stopVideo(video) {
    video.srcObject = null;
  }

  watch(showModal, async () => {
    if (showModal) {
      startVideo(stream, video);
      return;
    } else {
      stopVideo(video);
    }
  });


});
function takePhoto() {
    canvas.style.display = "inline-block";
    video.style.display = "none";
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    photo.value = canvas.toDataURL("image/jpeg");
  }
  const reTakePhoto = () => {
    photo.value = "";
    video.style.display = "inline-block";
    canvas.style.display = "none";
  };

async function addProduct() {
  if (
    photo.value === "" ||
    name.value === "" ||
    precio.value === "" ||
    count.value === ""
  ) {
    error.value = true;
    return;
  }

  useProds.add({
    photo: photo.value,
    name: name.value,
    precio: precio.value,
    count: count.value,
  });
  photo.value = "";
  name.value = "";
  precio.value = "";
  count.value = "";
  change()
}
</script>
<template>
  <div
    id="modal"
    class="modal-bg"
    :style="`display:${showModal ? 'flex' : 'none'};`"
  >
    <article class="modal">
      <header>
        <i @click="change" id="close-modal" class="gg-close-o"></i>
      </header>
      <main class="modal-content center-col-top">
        <div class="modal-photo">
          <video
            id="video"
            width="300"
            height="300"
            class="radius"
            autoplay
            playsinline
            muted
          ></video>
          <canvas id="canvas" width="300" height="300" class="radius"></canvas>
          <button
            class="take-photo center"
            id="take-photo"
            @click="takePhoto"
            v-if="photo == ''"
          >
            🔴
          </button>
          <button
            class="take-photo center"
            id="re-take-photo"
            @click="reTakePhoto"
            v-if="photo !== ''"
          >
            📷
          </button>
        </div>
        <br />
        <input
          class="inputs radius-mini"
          type="text"
          placeholder="Producto"
          id="product-name"
          v-model="name"
        />
        <br />
        <input
          class="inputs radius-mini"
          type="number"
          placeholder="Precio"
          id="product-precio"
          min="1"
          pattern="^[0-9]+"
          v-model="precio"
        />
        <br />
        <input
          class="inputs radius-mini"
          type="number"
          placeholder="Cantidad"
          id="product-count"
          min="1"
          pattern="^[0-9]+"
          v-model="count"
        />
        <br />
        <section v-if="error">
          <p class="n-select err-bg radius center">
            Error: Tienes que llenar los campos
          </p>
          <br />
        </section>

        <button
          id="add-product"
          type="button"
          class="radius"
          @click="addProduct"
        >
          Agregar producto
        </button>
      </main>
    </article>
  </div>
</template>
../composables/modal
