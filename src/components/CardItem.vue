<template>
  <div class="carditem">
      <div class="carditem_imgcontainer">
          <img :class="[determineImageOrientationClass(), 'carditem__img']" :src="getImageSource()" alt="">
      </div>
      <h2 class="carditem__title">{{ truncateText(props.obra?.title) }}</h2>
      <!-- <h1 class="carditem__title">{{ props.obra?.title }}</h1> -->
      <h2 class="carditem__subtitle">{{ props.obra?.artistDisplayName }}</h2>
      <h3 class="carditem__period">{{ props.obra?.period }}</h3>
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
  const imageUrl = props.obra.isPublicDomain ? props.obra.primaryImage : copyright;
  const image = new Image();
  image.src = imageUrl;
  const aspectRatio = image.width / image.height;
  console.log(aspectRatio)
  return aspectRatio > 1 ? 'horizontal-image' : 'vertical-image';
};

const getImageSource = () => {
  return props.obra.isPublicDomain ? props.obra.primaryImage : copyright;
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

<style scoped>

.carditem{
  background-color: var(--color-fondoTarjeta);
  display: flex;
  flex-direction: column;
  justify-content:center ;
  align-items:baseline;

  text-align:left ;
}
.carditem_imgcontainer {
  width: 20em;
  height: 16em;
  overflow: hidden;
  margin-bottom: .5em;

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
}

.carditem__subtitle{
  align-self: start;
  font-size: .9em;
  line-height: .9em;
  margin-bottom: .5em;
}

.carditem__period{
  align-self: start;
  font-weight:lighter;
  font-size: .5em;
}
</style>
