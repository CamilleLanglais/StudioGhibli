<template>
    <div class="detailInfos">
        <div class="title">
                <h2>{{ ghibli.title }} ({{ghibli.release_date }})</h2>
                <p> {{ ghibli.original_title }}</p>
                <p>{{ ghibli.original_title_romanised }}</p>
        </div>
        <div class="contain">
                <img :src=ghibli.image alt="image">
                <div class="texte">
                  <p class="description">{{ ghibli.description }}</p>
                </div> 
        </div>
        <div class="autors">
          <p> Director : {{ ghibli.director }}</p>
          <p> Producer : {{ ghibli.producer }}</p>
          <p class="time"> {{ ghibli.running_time }} minutes</p>
        </div>
        

       
    </div>
  </template>
  
  <script>
  export default {
    name: 'Detail',
    props: {
      ghibli: { type:Object, required: true },
    }
  };
  </script>
  
  <style scoped>
  </style>