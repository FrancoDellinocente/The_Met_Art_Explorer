
<template>
    <div class="detail">
        <div>
            <div class="detail__imgcontainer">
                <img :class="[determineImageOrientationClass(), 'detail__img']" :src="getImageSource()" alt="">
            </div>
            <div>
                <h1>obra</h1>
                <h2>autor</h2>
                <h3>año</h3>
                <p>descripcion</p>
            </div>
        </div>
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
    console.log("aaaa")
  return item.value?.isPublicDomain ? item.value?.primaryImage : copyright;
};

const truncateText = (text: string) => {
  const maxLength = 4 * 16; // 2 rem equivalent in characters assuming 1 rem = 16px (adjust accordingly)
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength - 3) + '...';
  }
};

</script>

<style>
  .detail{
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

  .detail__imgcontainer{
    width: 20em;
    height: 16em;
    overflow: hidden;
    margin-bottom: 1em;

    display: flex;
    justify-content: center;
  }

  .horizontal-image {
    width: 100%;
    height: auto;
  }

  .vertical-image {
    width: auto;
    height: 100%;
    display: flex;
    justify-self: center;
  }
</style>