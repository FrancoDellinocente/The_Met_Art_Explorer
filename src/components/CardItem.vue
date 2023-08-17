<template>
  <div class="carditem">
    <router-link :to="'/Detail/'+ props.obra?.objectID" @click="scrollToTop" >
      <div class="carditem_imgcontainer">
          <img :class="[determineImageOrientationClass(), 'carditem__img']" :src="getImageSource()" alt="">
      </div>
      <h1 class="carditem__title">{{ truncateText(props.obra?.title) }}</h1>
      <h2 class="carditem__subtitle">{{ props.obra?.artistDisplayName }}</h2>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { iItem } from '../interfaces/interfaces';
import copyright from '../assets/imgCopyright.jpg'


const props = defineProps({
  obra: {
      type: Object as () => iItem,
      required: true,
  },
});

const determineImageOrientationClass = () => {
  const imageUrl = props.obra.isPublicDomain ? props.obra.primaryImageSmall : copyright;
  const image = new Image();
  image.src = imageUrl;
  const aspectRatio = image.width / image.height;
  
  return aspectRatio > 1 ? 'horizontal-image' : 'vertical-image';
};

const getImageSource = () => {
  return props.obra.isPublicDomain ? props.obra.primaryImageSmall : copyright;
};

const truncateText = (text: string) => {
  const maxLength = 4 * 16; // 2 rem equivalent in characters assuming 1 rem = 16px (adjust accordingly)
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength - 3) + '...';
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>

.carditem{
  background-color: var(--color-fondoTarjeta);
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content:start ;
  align-items:baseline;

  text-align:left ;
}
.carditem_imgcontainer {
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

.carditem__title{
  align-self: start;
  font-weight: 700;
  font-size: 1em;
  line-height: 1em;
  margin-bottom: .5em;
  padding: 0 .5em;
}

.carditem__subtitle{
  align-self: start;
  font-size: .9em;
  line-height: .9em;
  margin-bottom: .5em;
  padding: 0 .5em;
}

</style>