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
    <div class="card my-3">
        <div class="card-body">
            <div class="card-img-top d-flex justify-content-center">
                <img :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/300/200'" :alt="apartment.title" class="img-fluid">
            </div>
            <div class="card-title py-1 d-flex flex-column">
                <h5>{{ apartment.title }}</h5>
                <em> 
                    <strong>Optionals: </strong> 
                    <span v-if="apartment.optionals.length > 0">
                        <span class="badge bg-primary mx-1" v-for="optional in apartment.optionals" :key="optional.id">{{ optional.name }}</span>
                    </span>
                    <span v-else>
                        No optionals
                    </span>
                </em>
            </div>
            <div class="card-text py-1">
                {{ apartment.description }}
            </div>
            <!-- <router-link :to="{ name: 'SingleProject', params: { slug: apartment.slug } }" class="btn btn-sm btn-success my-3">
                Continua a leggere
            </router-link> -->
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;

</style>