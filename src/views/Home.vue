<script setup lang="ts">

</script>

<template>
  <div class="home">
    <h1 class="home__title">The Met Explorer</h1>
    <p class="home__subtitle">Find your favorite piece of art from The Met museum</p>
    <a href="/Explorer" class="home__button">List of pieces</a>
  </div>
</template>

<style>
  .home{
    position: relative;
    
    padding: 10% 10%;
    background: linear-gradient(rgba(5, 7, 12, 0.75),rgba(5, 7, 12, 0.75)), url(https://cdn.sanity.io/images/cctd4ker/production/73a42b4ea1644b2085acaad2896bfa4699687664-2320x920.jpg?rect=405,0,1490,920&w=1080&q=75&fit=clip&auto=format) no-repeat center center fixed;
    background-size: cover;
    height: 100dvh;
    color: var(--blanco);
    hyphens: none;
    line-height: 2.7em;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }

  .home__title{
    margin-top: 9em;
    font-size: 3em;
    font-weight: bold;
  }

  .home__subtitle{
    font-size: 2em;
    font-weight:500;
  }

  .home__button{
    padding: 1em 2em;
    background-color: var(--color-fondoRojo);
    border: .1em solid var(--color-fondoRojo);
    border-radius: .5rem;
    font-size: 1em;
    font-weight: bold;
  }

  .home__button:hover{
    background-color: var(--color-fondoRojoHover);
    border: .1em solid var(--blanco);
  }

  @media (max-height: 618px) {
    .home__title{
      margin-top: 3em;
    }
  } 

  @media (max-height: 824px) {
    .home__title{
      margin-top: 4em;
    }
  } 
</style>