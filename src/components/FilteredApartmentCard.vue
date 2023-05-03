<script>
import {store} from '../store'

export default{
    name: "ApartmentCard",
    data() {
        return {
            store,
        }
    },
}
</script>

<template> 
  
    <div class="col-12 col-lg-6 col-xl-4 my-5 d-flex flex-wrap justify-content-center" v-for="apartment in store.filteredApartments" :key="apartment.id">
        <router-link :to="{ name: 'single_apartment', params: { slug: apartment.slug }}" class="link-apartment" target="_blank">
            <div class="cards" id="cards-search">
                <img class="cards-img" :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/400/300'" :alt="apartment.title">
                <span v-if="apartment.sponsorship_id"><i class="fas fa-medal spons-badge"></i></span>
                <div class="cards-list">
                    <ul class="list-unstyled d-flex flex-column">
                        <li class="me-4 pb-2"><i class="me-1 fas fa-door-closed"></i><span>{{apartment.room_n}} Local</span></li>
                        <li class="me-4 pb-2"><i class="me-1 fas fa-bed"></i><span>{{apartment.bed_n}} Bed</span></li>
                        <li class="me-4 pb-2"><i class="me-1 fas fa-shower"></i><span>{{apartment.bath_n}} Bath</span></li>
                        <li class="me-4 pb-2"><i class="me-1 fas fa-house-chimney"></i><span>{{apartment.square_meters}} Square Meters</span></li>
                    </ul> 
                </div>
                <div class="title d-flex my-3 mx-2 ellipsis ellipsis-cont">
                    <h3>{{ apartment.title }}</h3>
                </div>
            </div>
        </router-link>
    </div>

</template>

<style lang="scss" >
@use '../styles/generals.scss' as *;

.link-apartment{
    color: black;
    text-decoration: none;

    .cards{
        position: relative;
        cursor: pointer;
        width: 400px;
        height: 300px;

        .title{
            color: black;
        }

        .cards-img {
            object-fit: cover;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            transition: .5s ease;
            backface-visibility: hidden;
        }
    
        .cards-list {
            position: absolute;
            top: 15px;
            bottom: 0;
            left: 15px;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: .5s ease;
        }

        .ellipsis {
            text-overflow: ellipsis; /* enables ellipsis */
            white-space: nowrap; /* keeps the text in a single line */
            overflow: hidden; /* keeps the element from overflowing its parent */
        }

        .ellipsis-cont{
            overflow: hidden;
        }
    }

    .cards:hover .title{
            color: rgb(255, 56, 92);
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

.spons-badge{
 font-size: 50px;
 color: gold;

 border-radius: 50%;
 position: absolute;
 top: 0;
 right: 10px;
}

</style>