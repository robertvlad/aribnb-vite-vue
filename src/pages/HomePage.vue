<script>
    import axios from 'axios';
    import {store} from '../store.js';
    import ApartmentCard from '../components/ApartmentCard.vue';
    import Jumbotron from '../components/Jumbotron.vue';

    export default {
        name: 'HomePage',
        components:{
            ApartmentCard,
            Jumbotron
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
    <div>
        <Jumbotron :jumbotron="jumbotron"></Jumbotron>
    </div>
    <div class="container">
        <div class="row">
            <div v-if="loading" class="col-12 d-flex justify-content-center">
                <div class="my-5 loader"></div> 
            </div>
            <div v-else class="col-12 d-flex justify-content-center flex-wrap">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4" v-for="apartment in apartments" :key="apartment.id">
                        <ApartmentCard :apartment="apartment"></ApartmentCard>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
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

</template>

<style lang="scss" scoped>

    .card-img-top{
        img{
            max-width: 300px;
        }
    }

</style>