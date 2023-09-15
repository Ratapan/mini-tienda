<script setup>
import { computed, ref } from "vue";
import { useProductsStore } from "../store/productsStore";
import { useVentaStore } from "../store/ventaStore";
const storeProds = useProductsStore();
const storeVen = useVentaStore();

const selectProducto = ref("");
const cantidadProducto = ref("");

const porVender = ref([]);
const error = ref("");

const ventas = computed(() => storeVen.ventas);
const ventasHas = computed(() => storeVen.ventasHash);
const productos = computed(() => storeProds.productos);

function addProductosVenta() {
  error.value = "";
  const idProducto = selectProducto.value;
  const cantidad = cantidadProducto.value;
  if (selectProducto.value == "" || cantidadProducto.value == "") {
    error.value = "Elige un producto y cantidad";
    return;
  }
  const selectedProduct = storeProds.productoById(selectProducto.value);

  porVender.value.push({
    idProducto,
    cantidad,
    name: selectedProduct.name,
  });
  selectProducto.value = "";
  cantidadProducto.value = "";
}
function delProductosVenta(i) {
  porVender.value.splice(i, 1);
}
function addVenta() {
  if (porVender.value.length == 0) return;
  const arr = [...porVender.value];
  storeVen.add({ arr });
  porVender.value = [];
}
</script>
<template>
  <section>
    <br />
    <div class="venta radius-mini">
      <section v-if="error !== ''">
        <p class="n-select err-bg radius center">
          Error: Tienes que llenar los campos
        </p>
        <br />
      </section>
      <section class="venta__add separar">
        <select
          class="venta__add-select inputs radius-mini"
          v-model="selectProducto"
          name="producto"
        >
          <option value="" selected disabled>Producto</option>
          <option v-for="prod in productos" :disabled="(prod.count - ventasHas[prod.id])<1" :key="prod.id" :value="prod.id">
            <p>{{ prod.name }}</p>
            <p v-if="ventasHas[prod.id]">
              &nbsp;{{ prod.count - ventasHas[prod.id] }} de {{ prod.count }}
            </p>
          </option>
        </select>
        <br />
        <input
          class="venta__add-count radius-mini"
          type="number"
          placeholder="cantidad"
          v-model="cantidadProducto"
          min="1"
          max="50"
          pattern="^[0-9]+"
        />
        <button @click="addProductosVenta" class="radius">
          <i class="gg-add"></i>
        </button>
      </section>
      <br />
      <section v-for="(el, i) in porVender" :key="i">
        <article class="venta radius-mini">
          <p>
            <button class="radius" @click="delProductosVenta(i)">🗑️</button>
            &nbsp; {{ el.cantidad }} &nbsp; de &nbsp; {{ el.name }}
          </p>
        </article>
        <br />
      </section>
      <button @click="addVenta" class="radius">Nueva venta</button>
    </div>
    <section class="history">
      <br />
      <div class="n-select flex" v-if="ventas.total">
        <h2>Historial</h2>
        <p>&nbsp; {{ ` Ventas total: $${ventas.total}` }}</p>
      </div>
      <br />
      <div v-for="ven in ventas.ventas" :key="ven.id">
        <article class="venta radius-mini">
          <div class="details__header">
            <div class="details__fecha">
              {{
                `${new Date(ven.id).getMonth()}/${new Date(ven.id).getDate()}`
              }}&nbsp; &nbsp;{{
                `${new Date(ven.id).getHours()}:${new Date(
                  ven.id
                ).getMinutes()}`
              }}&nbsp; &nbsp; Total: &nbsp; {{ ven.total }}
            </div>
            <div>
              <button class="radius" @click="storeVen.del(ven.id)">🗑️</button>
            </div>
          </div>
          <section>
            <article
              class="details__text"
              v-for="det in ven.details"
              :key="det"
            >
              <div>
                {{ det.name }}
              </div>
              <div>Cantidad:&nbsp;{{ det.cantidad }}</div>
              <div>Total:&nbsp;{{ det.total }}</div>
            </article>
          </section>
        </article>
        <br />
      </div>
    </section>
  </section>
</template>
