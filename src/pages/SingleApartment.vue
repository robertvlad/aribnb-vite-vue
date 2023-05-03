<script>
import { store } from '../store';
import axios from 'axios';
import Map from '../components/Map.vue';

export default {
    name: 'SingleApartment',
    components: {
        Map,
    },
    data(){
        return{
            store,
            apartment: null,
            optionals: [],
            loading: true,
            success: false,
            errors: false,
            user_mail: '',
            message: '',
            errorEmail: '',
            errorMessage: '',

            
        }
    },
    mounted() {
        this.store.loading = true
        axios.get(`${this.store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((response) => {
            if(response.data.success){
                this.apartment = response.data.results,
                this.optional = response.data.results,
                this.loading = false
            }
            else{
                // redirect 404
                this.$router.push({ 'name': 'not_found' })
            }
        })
    },
    methods: {
        submitMessage(apartment_id) {
            
            this.success = false;
            this.errorEmail = "";
            this.errorMessage = "";

            if (!this.user_mail || !this.message) {
                this.errorEmail = "Email is required";
                this.errorMessage = "Message is required";
                return;
            }
            // invio il form
            this.loading = true;
            const formData = {
                user_mail: this.user_mail,
                message: this.message,
                apartment_id: apartment_id,
            };
            axios.post(`${store.baseUrl}/api/messages`, formData).then((response) => {
                this.success = response.data.success;
                //  se è andata bene invia il messaggio
                if (this.success) {
                    this.user_mail = '';
                    this.message = '';
                    // altrimenti mostra gli errori
                }
                this.loading = false;
            });
            
        },
        

        

    }
}
</script>

<template lang="">
    <div class="bg-pink">

        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-center mt-5" v-if="loading">
                    <div class="loader"></div>
                </div>
                <div class="col-12" v-else>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="float-end">
                                    <router-link :to="{ name: 'homepage' }" class="btn btn-sm btn-pink my-2">
                                        Back to apartment
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mt-2">
                                <h2>{{ apartment.title }}</h2>
                            </div>
                            <div class="col-12 mt-3">
                                <h6 class="text-secondary">{{ apartment.address }}</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex justify-content-center">
                                    <img class="img-fluid rounded-4 my-2" :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/400/200'">
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-between my-3">
                            <div class="col-sm-6 col-md-6 col-lg-7">
                                <div>
                                    <h3 class="mb-4">Description</h3>
                                </div>
                                <div>
                                    <p class="mb-3 text-secondary">{{ apartment.description }}</p>
                                </div>
                                <div>
                                    <ul class="list-unstyled d-flex responsive-md">
                                        <li class="me-4 text-secondary"><i class="me-1 fas fa-door-closed"></i><span>{{apartment.room_n}} Local</span></li>
                                        <li class="me-4 text-secondary"><i class="me-1 fas fa-bed"></i><span>{{apartment.bed_n}} Bed</span></li>
                                        <li class="me-4 text-secondary"><i class="me-1 fas fa-shower"></i><span>{{apartment.bath_n}} Bath</span></li>
                                        <li class="me-4 text-secondary"><i class="me-1 fas fa-house-chimney"></i><span>{{apartment.square_meters}} Square Meters</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="my-4">Optionals</h3>
                                </div>
                                <div>
                                    <ul class="list-unstyled d-flex responsive-md">
                                        <li  v-for="optional in apartment.optionals" :key="optional.id" class="me-4 text-secondary"><i :class="optional.icon" class="me-1"></i><span class="me-3">{{ optional.name }}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-4">
                                <div>
                                    <h3 class="mb-4">Contact host</h3>
                                </div>
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label text-secondary">Email address</label>
                                        <input v-model="user_mail" type="email" name="user_mail" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                                        <p class="text-danger">{{errorEmail}}</p>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label text-secondary">Example textarea</label>
                                        <textarea v-model="message" class="form-control" name="message" id="exampleFormControlTextarea1" rows="8" placeholder="Text"></textarea>
                                        <p class="text-danger">{{errorMessage}}</p>
                                    </div>
                                    <button type="submit" class="btn btn-pink" @click.prevent="submitMessage(apartment.id)" value="Send">Send</button>
                                </form>
                            </div>
                        </div>      
                        <div class="row">
                            <Map :address="apartment.address"></Map>
                        </div>
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

    .btn-pink{
        background-color:rgb(255, 56, 92);
        color: white;

        &:hover{
            background-color: rgb(255, 11, 56);
        }
    }
    .cover-img{
        width: 300px;
    }

    @media screen and (max-width:992px){
        .responsive-md {
            display: flex;
            flex-direction: column;
        }
    }
</style>