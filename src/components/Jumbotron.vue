<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
  name: 'Jumbotron',
  props: {
    jumbotron: Object,
  },
  data() {
    return {
        store,
        apartments: [],
        searchQuery: '',
        addresses: [],
        filterData: {
            address: '',
            distance: 20000,
            bed_n: 0,
            room_n: 0,
            optionals: [],
        },
    };
  },
  methods: {
    async submitData() {
      try {
        // gestione della risposta
        const { data } = await axios.get(`${store.baseUrl}/api/search`, {
            params: {
                address: this.filterData.address,
                distance: this.filterData.distance,
                bed_n: this.filterData.bed_n,
                room_n: this.filterData.room_n,
                optionals: this.filterData.optionals,
            },
        });
        
        this.apartments = data;
        store.filteredApartments = data;
        store.filterFlag = true;
        console.log(store.filteredApartments)
        
        console.log(data);
        
      } catch (error) {
        // gestione dell'errore
        console.error(error);
      }
    },
    async autoComplete() {
        if (this.filterData.address.length > 1) {
          try {
            const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.filterData.address}.json?key=${'186r2iPLXxGSFMemhylqjC36urDbgOV2'}`);
            this.addresses = response.data.results;
          } catch (error) {
            console.error(error);
          }
        } else {
          this.addresses = [];
        }
      },
      selectAddress(address) {
        this.filterData.address = address.address.freeformAddress;
        this.addresses = [];
      },
    
  },
};
</script>


<template>
    <div class="container-jumbo">
        <div class="jumbo-title">
            <div class="col d-flex align-items-center">
            </div>
            <div class="col d-flex justify-content-center align-items-center flex-column">
                <div>
                    <img class="logo" src="../../public/img/BOOLBNB-removebg-ok.png" width="450" alt="logo">
                </div>
                <div class="my-3">
                    <h3 class="text-center">Travel with emotion & experience</h3>
                </div>
                <div class="offcanvas-container">
                    <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <button class="btn-boolBnB">
                            <span>SEARCH</span>
                        </button>
                    </a>
                    <div class="offcanvas offcanvas-start" style="width: 450px;" tabindex="3" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <div class="d-flex">
                                <a href="#">
                                    <img src="../../public/img/BOOLBNB-removebg-ok.png" alt="logo" width="200">
                                </a>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <form @submit.prevent="submitData">
                                <div class="form-group">
                                    <label for="filterAddress">
                                        <h3 class="mb-3">Search your apartament</h3>
                                    </label>
                                    <div class="container-input mb-3">
                                        <input type="text" class="form-control input" id="filterAddress" v-model="filterData.address" placeholder="Write adress" @keyup="autoComplete">
                                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                                        </svg>
                                        <div v-if="addresses.length > 0">
                                            <ul class="list-group">
                                                <li class="list-group-item" v-for="(address, index) in addresses" :key="index" @click="selectAddress(address)"> 
                                                    {{ address.address.freeformAddress }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>  
                                </div>
                                <hr class="my-4">
                                <div>
                                    <div class="d-flex align-items-center mb-3">
                                        <i class="fas fa-sliders"></i>
                                        <h3 class="mb-0">Filter</h3>
                                    </div>
                                    <div class="d-flex my-4">
                                        <div class="me-4">
                                            <h5 class="mb-3">Room Number</h5>
                                            <select name="" id="" v-model="filterData.room_n">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6+</option>
                                            </select>
                                        </div>
                                        <div>
                                            <h5 class="mb-3">Bed Number</h5>
                                            <select name="" id="" v-model="filterData.bed_n">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6+</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Kilometers</h5>
                                        <div id="form-wrapper">
                                            <form action="/p/quote.php" method="GET">
                                                <div id="debt-amount-slider">
                                                    <input type="radio" v-model="filterData.distance" name="debt-amount" id="1" value="5000" required>
                                                    <label for="1" data-debt-amount="5km"></label>
                                                    <input type="radio" v-model="filterData.distance" name="debt-amount" id="2" value="10000" required>
                                                    <label for="2" data-debt-amount="10km"></label>
                                                    <input type="radio" v-model="filterData.distance" name="debt-amount" id="3" value="20000" required>
                                                    <label for="3" data-debt-amount="20km"></label>
                                                    <input type="radio" v-model="filterData.distance" name="debt-amount" id="4" value="30000" required>
                                                    <label for="4" data-debt-amount="30km"></label>
                                                    <input type="radio" v-model="filterData.distance" name="debt-amount" id="5" value="40000" required>
                                                    <label for="5" data-debt-amount="40km"></label>
                                                    <div id="debt-amount-pos"></div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-3">Optionals</h5>
                                        <label class="container-check text-secondary fs-5">Garden
                                            <input type="checkbox" v-model="filterData.optionals" checked="checked" value="Garden">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-check text-secondary fs-5">Wifi
                                            <input type="checkbox" v-model="filterData.optionals" value="WiFi">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-check text-secondary fs-5">Car Space
                                            <input type="checkbox" v-model="filterData.optionals" value="Car Space">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-check text-secondary fs-5">Kitchen
                                            <input type="checkbox" v-model="filterData.optionals" value="Kitchen">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-check text-secondary fs-5">Sea View
                                            <input type="checkbox" v-model="filterData.optionals" value="Sea View">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container-check text-secondary fs-5">Pool
                                            <input type="checkbox" v-model="filterData.optionals" value="Pool">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <button class="cssbuttons-io-button" type="button" @click="this.submitData" data-bs-dismiss="offcanvas" aria-label="Close">Search
                                        <div class="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='footer-navmenu'>
            <svg class='wave-animation' preserveAspectRatio='none' viewBox='0 24 150 28' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
                <defs>
                    <path d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' id='gentle-wave'/>
                </defs>
                <g class='wave-bg'>
                    <use fill='rgba(242,193,78,.5)' x='50' xlink:href='#gentle-wave' y='0'/>
                    <use fill='rgba(242,193,78,.7)' x='50' xlink:href='#gentle-wave' y='3'/>
                    <use fill='#fff' x='50' xlink:href='#gentle-wave' y='6'/>
                </g>
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;

// JUMBOTRON

.container-jumbo{
    width: 100%;
    margin: 0 auto;
    height: 400px;
    position: relative;
    z-index: 1;

    .jumbo-title{
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 80px;
    }

    .offcanvas-container{
        z-index: 3;
        
        // OPTIONALS

        .container-check {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        }

        /* Hide the browser's default checkbox */
        .container-check input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        }

        /* On mouse-over, add a grey background color */
        .container-check:hover input ~ .checkmark {
        background-color: #ccc;
        }

        /* When the checkbox is checked, add a blue background */
        .container-check input:checked ~ .checkmark {
        background-color: rgb(255, 56, 92);
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        }

        /* Show the checkmark when checked */
        .container-check input:checked ~ .checkmark:after {
        display: block;
        }

        /* Style the checkmark/indicator */
        .container-check .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        }

        // DISTANCE

        $number-of-options: 5;
        html, body {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Nunito', sans-serif;
            color: #000;
            user-select: none;
        }

        #form-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 3rem;
        }

        form {
            width: 90%;
            max-width: 500px;

            #form-title {
                margin-top: 0;
                font-weight: 400;
                text-align: center;
            }

            #debt-amount-slider {
                display: flex;
                flex-direction: row;
                align-content: stretch;
                position: relative;
                width: 100%;
                height: 50px;
                user-select: none;

                &::before {
                    content: " ";
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    width: calc(100% * (#{$number-of-options - 1} / #{$number-of-options}));
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #000;
                }

                input, label {
                    box-sizing: border-box;
                    flex: 1;
                    user-select: none;
                    cursor: pointer;
                }

                label {
                    display: inline-block;
                    position: relative;
                    width: 20%;
                    height: 100%;
                    user-select: none;

                    &::before {
                        content: attr(data-debt-amount);
                        position: absolute;
                        left: 50%;
                        padding-top: 10px;
                        transform: translate(-50%, 45px);
                        font-size: 14px;
                        letter-spacing: 0.4px;
                        font-weight: 400;
                        white-space: nowrap;
                        opacity: 0.85;
                        transition: all 0.15s ease-in-out;
                    }

                    &::after {
                        content: " ";
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 30px;
                        height: 30px;
                        border: 2px solid #000;
                        background: #fff;
                        border-radius: 50%;
                        pointer-events: none;
                        user-select: none;
                        z-index: 1;
                        cursor: pointer;
                        transition: all 0.15s ease-in-out;
                    }

                    &:hover::after {
                        transform: translate(-50%, -50%) scale(1.25);
                    }
                }

                input {
                    display: none;
                    &:checked {
                        + label::before {
                            font-weight: 800;
                            opacity: 1;
                        }

                        + label::after {
                            border-width: 4px;
                            transform: translate(-50%, -50%) scale(0.75);
                        }

                        ~ #debt-amount-pos {
                            opacity: 1;
                        }

                        @for $i from 1 through $number-of-options {
                            &:nth-child(#{$i * 2 - 1}) ~ #debt-amount-pos {
                                left: #{($i * 20%) - 10%};
                            }
                        }
                    }
                }

                #debt-amount-pos {
                    display: block;
                    position: absolute;
                    top: 50%;
                    width: 12px;
                    height: 12px;
                    background: #000;
                    border-radius: 50%;
                    transition: all 0.15s ease-in-out;
                    transform: translate(-50%, -50%);
                    border: 2px solid #fff;
                    opacity: 0;
                    z-index: 2;
                }
            }

            &:valid {
                #debt-amount-slider {
                    input {
                        + label::before {
                            transform: translate(-50%, 45px) scale(0.9);
                            transition: all 0.15s linear;
                        }
                        &:checked + label::before {
                            transform: translate(-50%, 45px) scale(1.1);
                            transition: all 0.15s linear;
                        }
                    }
                }
            }

            & + button {
                display: block;
                position: relative;
                margin: 56px auto 0;
                padding: 10px 20px;
                appearance: none;
                transition: all 0.15s ease-in-out;
                font-family: inherit;
                font-size: 24px;
                font-weight: 600;
                background: #fff;
                border: 2px solid #000;
                border-radius: 8px;
                outline: 0;
                user-select: none;
                cursor: pointer;
                &:hover {
                    // transform: scale(1.1);
                    background: #000;
                    color: #fff;
                    &:active {
                        transform: scale(0.9);
                    }
                }
                &:focus {
                    background: #4caf50;
                    border-color: #4caf50;
                    color: #fff;
                    pointer-events: none;
                    &::before {
                        animation: spin 1s linear infinite;
                    }
                }
                &::before {
                    display: inline-block;
                    width: 0;
                    opacity: 0;
                    content: "\f3f4";
                    font-family: "Font Awesome 5 Pro";
                    font-weight: 900;
                    margin-right: 0;
                    transform: rotate(0deg);
                }
            }
            &:invalid + button {
                pointer-events: none;
                opacity: 0.25;
            }
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
                width: 24px;
                opacity: 1;
                margin-right: 12px;
            }
            to {
                transform: rotate(360deg);
                width: 24px;
                opacity: 1;
                margin-right: 12px;
            }
        }      
    }

    // OFFCANVAS-INPUT

    .container-input {
        position: relative;
    }

    .input {
        width: 300px;
        padding: 10px 0px 10px 40px;
        border-radius: 9999px;
        border: solid 1px #333;
        transition: all .2s ease-in-out;
        outline: none;
        opacity: 0.8;
    }

    .container-input svg {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
    }

    .input:focus {
        opacity: 1;
        width: 360px;
    }

    // WAVES

    #footer-navmenu .wave-animation{
        -webkit-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        transform:rotate(180deg);
        bottom:initial;
        top:0;
        height:20em
    }

    #footer-navmenu{
        padding-top:50px;
        background:linear-gradient(to right, #654ea3, #eaafc8);
        position:relative
    }

    #footer-navmenu-container{
        max-width:1000px;
        margin:0 auto;
        text-align:center
    }

    #footer-navmenu ul{
        list-style:none;
        margin:0
    }

    #footer-navmenu ul li{
        display:inline-block;
        margin:6px 0
    }

    #footer-navmenu ul li:last-child::after{
        content:""
    }

    #footer-container {
        background:linear-gradient(to right, #654ea3, #eaafc8);
    }
    
    .wave-animation{
        display:block;
        width:100%;
        height:8em;
        max-height:100vh;
        margin:0;
        position:absolute;
        bottom:-10px
    }

    .wave-bg > use{
        -webkit-animation:move-forever 20s linear infinite;
        animation:move-forever 20s linear infinite
    }

    .wave-bg > use:nth-child(1){
        animation-delay:-2s;
        fill:rgba(232, 174, 199, 0.58);
    }

    .wave-bg > use:nth-child(2){
        animation-delay:-2s;
        animation-duration:10s;
        fill:rgba(232, 174, 199, 0.85);
    }

    .wave-bg > use:nth-child(3){
        animation-delay:-4s;
        animation-duration:8s
    }

    @-webkit-keyframes move-forever{
        0%{transform:translate(-90px,0%)}
        100%{transform:translate(85px,0%)}
    }

    @keyframes move-forever{
        0%{transform:translate(-90px,0%)}
        100%{transform:translate(85px,0%)}
    }

    .wave-animation{
        height:3em
    }

    .wave-animation{
        height:4em
    }

    .fa-sliders{
        margin-right: 10px;
    }
  
}
@media screen and (max-width: 576px){
    .logo {
        width: 350px;
    }    
}
</style>