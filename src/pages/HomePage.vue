<script>
    import axios from 'axios';
    import {store} from '../store.js';
    import ApartmentCard from '../components/ApartmentCard.vue';
    import Jumbotron from '../components/Jumbotron.vue';
    import FilteredApartmentCard from '../components/FilteredApartmentCard.vue';

    export default {
        name: 'HomePage',
        components:{
            ApartmentCard,
            Jumbotron,
            FilteredApartmentCard
        },
        data(){
            return{
                store,
                apartments: [],
                currentPage: 1,
                lastPage: null,
                loading: true,
            }
        },
        methods:{
            getApartments(apartment_page){
                this.loading = true;
                axios.get(`${this.store.baseUrl}/api/apartments`, { params: {page: apartment_page}}).then((response) => {
                    if(response.data.success){
                        this.apartments = response.data.results.data;
                        this.currentPage = response.data.results.current_page;
                        this.lastPage = response.data.results.last_page;
                        this.loading = false;
                        store.filterFlag = false;
                    }else{
                        alert('La chiamata non è andata a buon fine')
                    }
                });
            }
        },
        mounted(){
            this.getApartments(this.currentPage);
        }
    }
</script>

<template>
     <div class="bg-pink">
         <div>
             <Jumbotron :jumbotron="jumbotron"></Jumbotron>
         </div>
         <div class="container">
             <div class="row">
                 <div v-if="loading" class="col-12 ">
                     <div class="my-5 loader"></div> 
                 </div>
                 <div v-else class="col-12">
                    <div class="row filtered-data-container">
                        <div v-if="!store.filterFlag" class="d-flex flex-wrap" >
                            <div class="col-12 col-lg-6 col-xl-4 my-5 d-flex flex-wrap justify-content-center" v-for="apartment in apartments" :key="apartment.id">
                                <ApartmentCard :apartment="apartment"></ApartmentCard>
                            </div>
                        </div>
                         <FilteredApartmentCard v-if="store.filterFlag"></FilteredApartmentCard>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col-lg-12 col-sm-12 d-flex justify-content-center my-5">
                         <nav>
                             <ul class="pagination">
                                 <li :class="currentPage == 1 ? 'disabled' : 'page-item'">
                                     <button class="page-link" @click="getApartments(currentPage - 1)">Prev</button>
                                 </li>
                                 <li :class="currentPage == i ? 'disabled' : 'page-item'" v-for="i in lastPage" :key="i">
                                     <button class="page-link" @click="getApartments(i)">{{ i }}</button>
                                 </li>
                                 <li :class="currentPage == lastPage ? 'disabled' : 'page-item'">
                                     <button class="page-link" @click="getApartments(currentPage + 1)">Next</button>
                                 </li>
                             </ul>
                         </nav>
                     </div>
                 </div>
             </div>
         </div>
     </div>
</template>

<style lang="scss" scoped>
    .bg-pink{
        background: rgb(237,130,172);
        background: linear-gradient(0deg, rgba(237,130,172,1) 15%, rgba(255,255,255,1) 50%);
    }
    
</style>