<script setup lang="ts">
import { iItem } from '../interfaces/interfaces';
import copyright from  '../assets/imgCopyright.jpg'
// const obra = ref<iItem>() ;

const props = defineProps({
  obra: {
    type: Object as () => iItem,
    required: true,
  },
});

</script>

<template>
    <div>
        <img v-if="props.obra?.isPublicDomain" :src="props.obra.primaryImage" alt="">
        <img v-else :src="copyright" alt="">
        <h1>{{ props.obra?.title }}</h1>
        <h2>{{ props.obra?.artistDisplayName }}</h2>
        <h3>{{ props.obra?.period }}</h3>
    </div>
</template>

<style scoped>
</style>