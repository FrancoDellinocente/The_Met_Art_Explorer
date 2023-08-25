<template>
  <div class="explorer">
    <h1 v-if="isLoading">Cargando...</h1>
    <div v-else class="explorer__filters">
      <div class="explorer__search"> 
        <input type="text" class="search__input" name="search" id="search" placeholder="Search" v-model="searchTerm">
        <button type="submit" on class="search__button"  @click="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </div>
    <h1 v-if="!isLoading" class="explorer__total">{{ allIds?.total }} results</h1> 
    <div class="explorer__gallery">
      <ul v-if="!isLoading " class="explorer__wrapexp">
        <li v-for="item in items" :key="item.objectID" class="wrapexp__item">
          <CardItem :obra="item" />
        </li>
      </ul>
    </div>
    <div v-if="!isLoading " class="explorer__pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination__button">Previous</button>
      <div class="pagination__texts">
        <p class="pagination__text">{{ currentPage }} / </p>
        <p class="pagination__text">{{ totalPages }}</p>
      </div>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination__button">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { iAllIDs, iItem} from '../interfaces/interfaces';
import CardItem from '../components/CardItem.vue';
import { useRoute } from 'vue-router'

let allIds = ref<iAllIDs>({ total: 0, objectIDs: [0] });  
let isLoading  = ref<boolean>(true);
const itemsPerPage = 20;
const currentPage = ref(1);
let totalPages:any;
let currentIds = ref<number[]>([]);
let items = ref<iItem[]>([]);
let dataCache = ref<{ [id: number]: any }>({});
const route = useRoute();
let artistParam = route.params.artist;
//filter
let searchTerm = ref('');

onMounted(() => {
  getObras(searchTerm.value);
});

async function getObras(searchTerm: string) {
  try {
    let apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=""';

    // Si se proporciona el parámetro artista
    if (artistParam) {
      apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${artistParam}`;
    }

    if(searchTerm){
      apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    allIds.value = data; //fetch de todos los items
    totalPages = Math.ceil(allIds.value.objectIDs.length / itemsPerPage); //cargamos total de paginas
    currentIds.value=paginateIds(); //seraramos por 20 ids y traemos los 20 segun la currentPage
    fetchItems(); //traemos los datos de cada item
    isLoading.value = false;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function paginateIds() {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allIds.value.objectIDs.slice(startIndex, endIndex);
}


async function fetchItems() {
  //console.log(currentIds.value)
  const fetchedItems = await Promise.all(currentIds.value?.map(id => fetchItemById(id)));
  items.value = fetchedItems.filter(item => item && item.objectID && item.isHighlight !== undefined); //filtramos porque hay algunos ids sin datos en la API
  //console.log(items.value)
}

async function fetchItemById(id:any) {
  if (dataCache.value[id]) {
    // Si los detalles ya están en la caché, devuelve los datos de la caché
    return dataCache.value[id];
  } else {
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
  const data = await response.json();
  dataCache.value[id] = data;
  return data;
}
}

function search() {
  if (searchTerm.value.trim() !== '') {
    getObras(searchTerm.value); // Llama a getObras con el término de búsqueda
  }
}

//actualiza los datos cuando cambia de pag
watch(currentPage, () => {
  currentIds.value = paginateIds();
  fetchItems();
});
 
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

  .explorer__search{
    margin: 1em 0;

    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center; 
    gap: .5rem;
  }

  .search__input{
    border: grey solid 0.1em;
    border-radius: .2rem;
    width: 90%;
    padding: 1rem;
  }

  .search__button{
    border: var(--color-fondoRojo) solid 0.1em;
    border-radius: .2rem;
    background-color: var(--color-fondoRojo);
    padding: 1rem;
    margin-left: 1rem;
    height: auto;
  }

  .search__button:hover{
    background-color: var(--color-fondoRojoHover);
    border: .1em solid var(--blanco);
  }

  .bi{
    fill: var(--blanco);
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