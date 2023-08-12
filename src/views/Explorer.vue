<template>
  <div class="explorer">
    <h1 v-if="vacio">Cargando...</h1>
    <h1 v-else class="explorer__total">{{ allIds?.total }} results</h1>
    <div class="explorer__gallery">
      <ul v-if="!vacio" class="explorer__wrapexp">
        <li v-for="item in items" :key="item.id" class="wrapexp__item">
          <CardItem :obra="item" />
        </li>
      </ul>
    </div>
    <div v-if="!vacio" class="explorer__pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination__button">Anterior</button>
      <div class="pagination__texts">
        <p class="pagination__text">{{ currentPage }} / </p>
        <p class="pagination__text">{{ totalPages }}</p>
      </div>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination__button">Siguiente</button>
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
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=""');
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
  // items.value = await Promise.all(currentIds.value.map(id => fetchItemById(id)));
  const fetchedItems = await Promise.all(currentIds.value.map(id => fetchItemById(id)));
  items.value = fetchedItems.filter(item => item && item.objectID && item.isHighlight !== undefined);
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
    scrollToTop();
  }
}

// Función para ir a la página siguiente
function nextPage() {
  if (currentPage.value < totalPages) {
    currentPage.value++;
    scrollToTop();
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  .explorer__total{
    text-align: start;
    border-bottom: grey solid 0.1em;
    margin-bottom: 1em;
  }

  .explorer__gallery{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }

  .explorer__wrapexp{
    height: 100%;
    width: 100%;
    overflow: hidden;

    display: flex;
    flex-flow: wrap;

    justify-content: center;
    gap: 2em;
  }

  .wrapexp__item{
    flex: 1;
    min-width: 20em;
    max-width: 20em;
    height: 22em; 
  }

  .explorer__pagination{
    width: 100%;
    margin: 1em 0;
    border-top: grey solid 0.1em;

    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .pagination__texts{
    display: flex;
    flex-flow: row;
  }

</style>