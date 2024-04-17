<script setup>
/*import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'*/
</script>

<template>
  <header>
    <div class="firsthead">
      <img src="../assets/logo-ghibli.png" alt="Logo Ghiblimac">
      <div class="titlehead">
        <h1> Ghiblimac </h1>
        <h2> Le site officiel des IMAC</h2>
      </div>
    </div>
    <div class="wave">
      <img src="../assets/trait6.webp" alt="vague trait">
    </div>
  </header>
  <main>
    <div class="page">
      <div class = "listgallery">
        <List/>
      </div>
    </div>
  </main>

  <footer>
    <div class="IMAC">
      <img src="../assets/logo_imac.png" alt="logo IMAC" class="logoIMAC">
      <p>Un site IMAC</p>
    </div>
  </footer>
  
</template>


<script>
 
import List from './components/list.vue'; 

  export default {
    name : 'App.vue',
    components : {List}
  
}; 
</script>

