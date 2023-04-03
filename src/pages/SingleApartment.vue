<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'SingleApartment',
    data(){
        return{
            store,
            apartment: null,
            optionals: [],
            loading: true,
            success: false,
            user_mail: '',
            message: ''
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
                    this.user_mail = "";
                    this.message = "";
                    // altrimenti mostra gli errori
                }
                this.loading = false;
            })
        },

    }
}
</script>

<template lang="">
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
                                <router-link :to="{ name: 'homepage' }" class="btn btn-sm btn-success my-2">
                                    Back to apartment
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h2>{{ apartment.title }}</h2>
                        </div>
                        <div class="col-12">
                            <h5>{{ apartment.address }}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div>
                                <img class="img-fluid rounded-4 my-2" :src="apartment.cover_img != null ? `${store.baseUrl}/storage/${apartment.cover_img}` : 'https://picsum.photos/400/200'">
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-between my-2">
                        <div class="col-7">
                            <div>
                                <h5>Description</h5>
                            </div>
                            <div>
                                <p>{{ apartment.description }}</p>
                            </div>
                            <div>
                                <ul class="list-unstyled d-flex">
                                    <li class="me-4"><i class="me-1 fas fa-door-closed"></i><span>{{apartment.room_n}} Local</span></li>
                                    <li class="me-4"><i class="me-1 fas fa-bed"></i><span>{{apartment.bed_n}} Bed</span></li>
                                    <li class="me-4"><i class="me-1 fas fa-shower"></i><span>{{apartment.bath_n}} Bath</span></li>
                                    <li class="me-4"><i class="me-1 fas fa-house-chimney"></i><span>{{apartment.square_meters}} Square Meters</span></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Optionals</h5>
                            </div>
                            <div>
                                <ul class="list-unstyled d-flex">
                                    <li  v-for="optional in apartment.optionals" :key="optional.id" class="me-4"><i :class="optional.icon" class="me-1"></i><span class="me-3">{{ optional.name }}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-4">
                            <div>
                                <h5>Contact host</h5>
                            </div>
                            <form>
                                <div class="mb-3">

                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input v-model="user_mail" type="email" name="user_mail" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                                    <textarea v-model="message" class="form-control" name="message" id="exampleFormControlTextarea1" rows="8"></textarea>

                                </div>
                                <button type="submit" class="btn btn-primary" @click.prevent="submitMessage(apartment.id)">Send</button>
                            </form>
                        </div>
                    </div>      
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cover-img{
        width: 300px;
    }
</style>