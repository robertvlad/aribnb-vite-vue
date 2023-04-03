<script>
import {store} from '../store'

export default{
    name: "ApartmentCard",
    props:{
        apartment: Object,
    },
    data() {
        return {
            store,
        }
    },
}
</script>

<template> 
    <router-link :to="{ name: 'single_apartment', params: { slug: apartment.slug }}" class="link-apartment">
        <!-- <div class="card my-3 h-100">
            <div class="row g-0 h-100">
                <div class="col-md-6">
                    <img :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/400/300'" :alt="apartment.title" class="rounded-start">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">{{ apartment.title }}</h5>
                        <p class="card-text"><small class="text-body-secondary"><i class="fas fa-location-dot me-2"></i>{{ apartment.address }}</small></p>
                        <div class="card-text">
                            <ul class="list-unstyled d-flex flex-column">
                                <li class="me-4 pb-2"><i class="me-1 fas fa-door-closed"></i><span>{{apartment.room_n}} Local</span></li>
                                <li class="me-4 pb-2"><i class="me-1 fas fa-bed"></i><span>{{apartment.bed_n}} Bed</span></li>
                                <li class="me-4 pb-2"><i class="me-1 fas fa-shower"></i><span>{{apartment.bath_n}} Bath</span></li>
                                <li class="me-4 pb-2"><i class="me-1 fas fa-house-chimney"></i><span>{{apartment.square_meters}} Square Meters</span></li>
                            </ul>   
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="cards">
            <img class="cards-img" :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/400/300'" :alt="apartment.title">
            <div class="cards-list p-4">
                <h4>{{ apartment.title }}</h4>
                <ul class="list-unstyled d-flex flex-column">
                    <li class="me-4 pb-2"><i class="me-1 fas fa-door-closed"></i><span>{{apartment.room_n}} Local</span></li>
                    <li class="me-4 pb-2"><i class="me-1 fas fa-bed"></i><span>{{apartment.bed_n}} Bed</span></li>
                    <li class="me-4 pb-2"><i class="me-1 fas fa-shower"></i><span>{{apartment.bath_n}} Bath</span></li>
                    <li class="me-4 pb-2"><i class="me-1 fas fa-house-chimney"></i><span>{{apartment.square_meters}} Square Meters</span></li>
                </ul> 
                <div>
                    <p>CLICK TO SEE MORE  <i class="fas fa-arrow-right me-2"></i></p>
                </div>
            </div>
        </div>
    </router-link>




</template>

<style lang="scss">
@use '../styles/generals.scss' as *;

.link-apartment{
    color: black;
    text-decoration: none;

    // img{
    //     object-fit: cover;
    //     width: 100%;
    //     height: 100%;
    // }

    // &:hover .card-body{
    //     color: black;
    // }

    .cards{
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;

        .cards-img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            transition: .5s ease;
            backface-visibility: hidden;
        }
    
        .cards-list {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: .5s ease;
        }
    }
    .cards:hover .cards-img {
        opacity: 0.4;
    }
    .cards:hover .cards-list {
        opacity: 1;
        color: black;
        text-decoration: none;
    }
}

</style>