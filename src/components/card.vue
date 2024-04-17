<template>
    <div class="cardGhibli" @click="$emit('click')">
        <div class="contentImg">
            <img :src=ghibli.image alt="image">
        </div>
            <div class="title">
                <h2>{{ ghibli.title }} ({{ghibli.release_date }})</h2>
            </div>
            <div class="contain">
                 <div class="texte">
                    <!-- <p class="synopsis">{{ description }}</p> -->
                    <p> {{ ghibli.director }}</p>
                    <!-- <p> {{ producer }}</p> -->
                </div> 
            </div>
            <div class="infos">
                    <p> {{ ghibli.running_time }} minutes</p>
            </div>
    </div>
</template>

<script>
export default {
    name: 'cardGhibli',
    props: {
        ghibli: { type:Object, required: true },
    }
    
}
</script>

<style scoped>

</style>