
<template>
    <div class="detail">
        <section class="detail__head">
            <div class="detail__imgcontainer">
                <img :class="[determineImageOrientationClass(), 'detail__img']" :src="getImageSource()" alt="">
            </div>
            <div class="detail__maininf">
                <h1 class="maininf__title">{{item?.title}}</h1>
                <h2 class="maininf__artist">{{item?.artistDisplayName}}</h2>
                <h3 class="maininf__date">{{item?.objectDate}}</h3>
            </div>
        </section>
        <section class="detail__info">
          <div class="info__section">
            <h1 class="info__title">Descripcion</h1>
            <p class="info__row">
              <span class="info__category">Classification:</span>
              <span class="info__text">{{item?.classification}}</span>
            </p>
            <p class="info__row">
              <span class="info__category">Department:</span>
              <span class="info__text">{{item?.department}}</span>
            </p>
            <p class="info__row">
              <span class="info__category">Medium:</span>
              <span class="info__text">{{item?.medium}}</span>
            </p>
          </div>
          <div class="info__section">

          </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { iItem } from '../interfaces/interfaces';
import copyright from '../assets/imgCopyright.jpg'

import { useRoute } from 'vue-router';
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

const determineImageOrientationClass = () => {
    console.log(item)
  const imageUrl = item.value?.isPublicDomain ? item.value?.primaryImage : copyright;
  const image = new Image();
  image.src = imageUrl;
  const aspectRatio = image.width / image.height;
  
  return aspectRatio > 1 ? 'horizontal-image' : 'vertical-image';
};

const getImageSource = () => {
  return item.value?.isPublicDomain ? item.value?.primaryImage : copyright;
};

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

  .horizontal-image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .vertical-image {
    width: auto;
    height: 100%;
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
    margin: 1em 0;
  }

  .info__section{
    width: 80%;
    margin: auto;
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
    line-height: 1em;
    margin-bottom: .3rem;
  }

  .info__category{
    margin-right: .5rem;
  }

  .info__text{
    font-weight: 600;
  }
</style>