
<template>
    <div class="detail">
        <button class="detail__back" @click="goBack">Back</button>
        <section class="detail__head">
            <div class="detail__imgcontainer">
                <img :class="['detail__img']" :src="getImageSource()" alt="">
            </div>
            <div class="detail__maininf">
                <h1 class="maininf__title">{{item?.title}}</h1>
                <h2 class="maininf__artist"><a :href="getExplorerLink()">{{item?.artistDisplayName}}</a></h2>
                <h3 class="maininf__date">{{item?.objectDate}}</h3>
            </div>
        </section>
        <section class="detail__info">
          <div class="info__section">
            <h1 class="info__title">Descripcion:</h1>
            <p class="info__row" v-if="item?.title.length!==0">
              <span class="info__category">Title:</span>
              <span class="info__text">{{item?.title}}</span>
            </p>
            <p class="info__row" v-if="item?.objectDate.length!==0">
              <span class="info__category">Date:</span>
              <span class="info__text">{{item?.objectDate}}</span>
            </p>
            <p class="info__row" v-if="item?.classification.length!==0">
              <span class="info__category">Classification:</span>
              <span class="info__text">{{item?.classification}}</span>
            </p>
            <p class="info__row" v-if="item?.department.length!==0">
              <span class="info__category">Department:</span>
              <span class="info__text">{{item?.department}}</span>
            </p>
            <p class="info__row" v-if="item?.medium.length!==0">
              <span class="info__category">Medium:</span>
              <span class="info__text">{{item?.medium}}</span>
            </p>
            <p class="info__row" v-if="item?.dimensions.length!==0">
              <span class="info__category">Dimensions:</span>
              <span class="info__text">{{item?.dimensions}}</span>
            </p>
            <p class="info__row" v-if="item?.classification.length!==0">
              <span class="info__category">Classification:</span>
              <span class="info__text">{{item?.classification}}</span>
            </p>
            <p class="info__row" v-if="item?.repository.length!==0">
              <span class="info__category">Repository:</span>
              <span class="info__text">{{item?.repository}}</span>
            </p>
          </div>
          <div class="info__section info__section--last">
            <h1 class="info__title">Artist:</h1>
            <p class="info__row" v-if="item?.artistDisplayName.length!==0">
              <span class="info__category">Name:</span>
              <span class="info__text">{{item?.artistDisplayName}}</span>
            </p>
            <p class="info__row" v-if="item?.artistNationality.length!==0">
              <span class="info__category">Nationality:</span>
              <span class="info__text">{{item?.artistNationality}}</span>
            </p>
            <p class="info__row" v-if="item?.artistBeginDate.length!==0">
              <span class="info__category">Birth and Death::</span>
              <span class="info__text">{{item?.artistBeginDate}} - {{item?.artistEndDate}}</span>
            </p>
          </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { iItem } from '../interfaces/interfaces';
import copyright from '../assets/imgCopyright.jpg'

import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const route = useRoute();
const idFromRoute = computed(() => route.params.id);
let item = ref<iItem | null>(null);

onMounted(async () => {
    const fetchedItem = await fetchItemById(idFromRoute.value);
    item.value = fetchedItem;
});

async function fetchItemById(id: any): Promise<iItem> {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    const data = await response.json();
    return data;
}


const router = useRouter(); 

function goBack() {
  router.go(-1);
}

const getImageSource = () => {
  return item.value?.isPublicDomain ? item.value?.primaryImage : copyright;
};

const getExplorerLink = () => {
    if (item && item.value?.artistDisplayName) {
      return `/Explorer/${encodeURIComponent(item.value?.artistDisplayName)}`;
    } else {
      return '/Explorer';
    }
}

</script>

<style>
  .detail{
    position: relative;

    padding: 4.5em 0;
    background-color: var(--blanco);
    height: auto;
    min-height: 100dvh;
    color: var(--negro);
    hyphens: none;
    line-height: 2.7em;

    display: flex;
    flex-direction: column;
  }

  .detail__back{
    padding: 0 10%;
    align-self: start;
    text-decoration: underline;
    cursor: pointer;
  }

  .detail__head{
    background-color: var(--color-fondoTarjeta);
    padding: 0 10%;

    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .detail__imgcontainer{
    min-width: 20dvw;
    height: 50dvh;
    overflow: hidden;
    margin: 1em 0;

    display: flex;
    justify-content: center;
  }

  .detail__img{
    object-fit: contain;
    display: flex;
    justify-self: center;
  }

  .detail__maininf{
    justify-self: start;
    margin: 1em 0 1em 1em;
    line-height: inherit;
    
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .maininf__title{
    font-size: 3em;
    font-weight: bold;
    margin-bottom: .5rem;
    overflow: hidden;
  }

  .maininf__artist{
    font-size: 1em;
    font-weight: bold;
    line-height: 1em;
    margin-bottom: .5rem;
    text-decoration: underline;
  }

  .maininf__date{
    font-size: 1em;
    font-weight:lighter;
    line-height: 1em;
    margin-bottom: .5rem;
  }

  .detail__info{
    margin-bottom: .5rem;
  }

  .info__section{
    width: 80%;
    margin: auto;
    padding: 1rem 0; 
    border-bottom: solid 0.1rem var(--negro);
  }

  .info__section--last{
    border-bottom: none;
  }

  .info__title{
    font-weight: 400;
    font-size: 2.2rem;
    letter-spacing: .02em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  .info__row{
    font-size: 1rem;
    line-height: 1.2;
    margin-bottom: .3rem;
  }

  .info__category{
    margin-right: .5rem;
  }

  .info__text{
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .detail__head{
    grid-template-columns:1fr;
    grid-template-rows: 1fr auto;
    }
  } 

  @media (max-width: 425px) {
    .detail__back{
      padding: 0 5%;
    }

    .detail__head{
      padding: 0 5%;
    }

    .detail__imgcontainer{
      width: 100%;
    }

    .info__section{
      width: 90%;
    }
  } 
</style>