<template>
    <div id="listGhibli">
        <div v-if="test">
            <div class="detail" v-if="showDetails">
                <div class="back">
                    <button @click="showList()">Revenir à la liste</button>
                </div>
                <Detail :ghibli="selectedGhibli" />
            </div>
            <div class="list" v-else>
                <div class="filters">
                    <form @submit.prevent="searchMovies">
                        <input type="text" v-model="searchQuery" placeholder="Rechercher un film">
                        <button type="submit">Rechercher</button>
                    </form>
                    <div class="sort">
                        <button @click="sortByTitle()" :class="{ 'active': sortCriteria === 'title' }" >Trier par titre</button>
                        <button @click="sortByDate()" :class="{ 'active': sortCriteria === 'date' }">Trier par date de sortie</button>
                        <button @click="sortByDirector()" :class="{ 'active': sortCriteria === 'director' }">Trier par directeur</button>
                        <button @click="sortByTime()" :class="{ 'active': sortCriteria === 'time' }">Trier par durée du film</button>
                    </div>
                </div>
                <div class="allCards">
                    <div v-for="ghibli in ghibliData" class="CardContent">
                        <cardGhibli
                        :ghibli="ghibli"
                        @click="showDetail(ghibli)"
                        />
                    </div>
                </div>
            </div>
        </div>
            <p v-else>Chargement...</p>
    </div>

</template>


<script>
import { getGhibliData } from '@/api/ghibliAPI.js';
import cardGhibli from './card.vue';
import Detail from './detail.vue';

export default {
    name: 'listGhibli',
    data() {
        return {
            ghibliData: [],
            allGhibliData : [],
            test: false,
            searchQuery: '',
            sortCriteria: null,
            sortOrder: 'asc',
            showDetails: false,
            selectedGhibli: null,

        }
    },
    methods: {
        async retrieveGhibliData() {
            this.ghibliData = await getGhibliData();
            this.allGhibliData = this.ghibliData; 
            
            this.searchMovies();
            if(localStorage.sort){
                switch (localStorage.sort) {
                    case 'title':
                        this.sortByTitle();
                        break;
                    case 'director':
                        this.sortByDirector();
                        break;
                    case 'time':
                        this.sortByTime();
                        break
                    default:
                        this.sortByDate();
                        break;
                    }
            } else{
                this.sortByDate();
            }
            this.test = true;

        },

        //Filtrage
        searchMovies() {
            const query = this.searchQuery.trim().toLowerCase();
            this.ghibliData = this.allGhibliData.filter(ghibli =>
                ghibli.title.toLowerCase().includes(query) ||
                // ghibli.description.toLowerCase().includes(query) ||
                ghibli.director.toLowerCase().includes(query) ||
                ghibli.producer.toLowerCase().includes(query)
            );

            localStorage.searchQuery = this.searchQuery;

            //Trie par le filtre choisi
            switch (this.sortCriteria) {
                    case 'title':
                        this.sortByTitle();
                        break;
                    case 'director':
                        this.sortByDirector();
                        break;
                    case 'time':
                        this.sortByTime();
                        break
                    default:
                        this.sortByDate();
                        break;
                    }
        },

        //Tris

        sortByTitle(){
            this.ghibliData.sort((a, b) => {
                    if (this.sortOrder === 'asc') {
                        return a['title'].localeCompare(b['title']);
                    } else {
                        return b['title'].localeCompare(a['title']);
                    }
                });

                this.sortCriteria = 'title';
                localStorage.sort = 'title';
        },
        sortByDirector(){
            this.ghibliData.sort((a, b) => {
                if (a.director && b.director) {
                    return a.director.localeCompare(b.director);
                } else {
                    return 0;
                }
                });
                
                
                this.sortCriteria = 'director';
                localStorage.sort = 'director';

        },
        sortByDate(){
            this.ghibliData.sort((a, b) => {
                if (a.release_date && b.release_date) {
                    return new Date(a.release_date) - new Date(b.release_date);
                } else {
                    return 0;
                }
                });
                
                this.sortCriteria = 'date';
                localStorage.sort = 'date';
        },
        sortByTime(){
            this.ghibliData.sort((a, b) => {
                    if (a.running_time && b.running_time) {
                    const runningTimeA = a.running_time.includes('min') ? parseInt(a.running_time) : parseInt(a.running_time) * 60;
                    const runningTimeB = b.running_time.includes('min') ? parseInt(b.running_time) : parseInt(b.running_time) * 60;
                    return runningTimeA - runningTimeB;
                } else {
                    return 0;
                }
                });

            this.sortCriteria = 'time';
            localStorage.sort = 'time';
        },

        //Detail
        showDetail(ghibli) {
        this.selectedGhibli = ghibli;
        this.showDetails = true;
        },
        showList(){
            this.showDetails = false;
        }
    },
    
    mounted() {
        this.retrieveGhibliData();
        if(localStorage.searchQuery){
            this.searchQuery = localStorage.searchQuery;
        }
    },
    components : {cardGhibli, Detail}
}


</script>



