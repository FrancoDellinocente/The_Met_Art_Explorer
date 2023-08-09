<template>
  <div class="explorer">
    <p v-if="vacio">Cargando...</p>
    <p v-else>{{ allIds?.total }}</p>
    <!-- <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p> -->
    <div class="explorer__gallery">
      <ul v-if="!vacio" class="explorer__wrapexp">
        <li v-for="item in items" :key="item.id" class="wrapexp__item">
          <CardItem :obra="item"/>
        </li>
      </ul>
      <div v-if="!vacio" class="explorer__pagination">
        <div>
          <p>{{ currentPage }}</p>
          <p>{{ totalPages }}</p>
        </div>
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { iAllIDs} from '../interfaces/interfaces';
import CardItem from '../components/CardItem.vue';

let allIds = ref<iAllIDs>();  
let vacio = ref(true);
const itemsPerPage = 20;
const currentPage = ref(1);


onMounted(() => {
  getObras();
  console.log(vacio)
});

let totalPages:any;
let currentIds = ref([]);
let items = ref<any>([]);

async function getObras() {
  try {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
    const data = await response.json();
    allIds = data;
    vacio.value = false;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function paginateIds() {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allIds.objectIDs.slice(startIndex, endIndex);
}


async function fetchItems() {
  items.value = await Promise.all(currentIds.value.map(id => fetchItemById(id)));
  console.log(items.value)
}


watch(currentPage, () => {
  console.log("eeeeee" )
  currentIds.value = paginateIds();
  fetchItems();
});

watch(vacio, () => {
  console.log("ddddddddd" )
  console.log(allIds.objectIDs.length)
  totalPages = Math.ceil(allIds.objectIDs.length / itemsPerPage); 
  console.log(totalPages )
  currentIds.value=paginateIds();
  fetchItems(); 
});


async function fetchItemById(id:any) {
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
  const data = await response.json();
  return data;
}


// Función para ir a la página anterior
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Función para ir a la página siguiente
function nextPage() {
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
}
</script>


<style>
  .explorer{
    position: relative;
    
    
    padding: 4.5em 10% 0 10%;
    background-color: var(--blanco);
    height: auto;
    min-height: 100dvh;
    color: var(--negro);
    hyphens: none;
    line-height: 2.7em;
    text-align: center;

  }

  .explorer__gallery{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }

  .explorer__wrapexp{
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-around;
    gap: 1em;
  }

  .wrapexp__item{
    width: 6em;
    height: auto;
    max-height: 10em;
    overflow: hidden;
  }
</style>