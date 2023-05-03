<script>
export default {
    name: 'Footer',
}
</script>

<template>
        <footer>
            <div class="container py-2">
                <div class="row d-flex align-items-center media">
                    <div class="col-4 d-none d-lg-block d-flex text-center">
                        <router-link class="navbar-brand" :to="{ name: 'homepage'}">
                            <img src="../../public/img/airbnb-removebg.png" width="50" alt="log-sm">
                        </router-link>
                    </div>
                    <div class="col-4 d-none d-lg-block">
                        <h6 class="text-white">Copyright © 2023 BoolBnB Inc. All rights reserved</h6>
                    </div>
                    <div class="col-lg-4 col-sm-12 d-block d-flex justify-content-center">
                        <div class="d-flex flex-column">
                            <div>
                                <h5 class="text-white">Find us on:</h5>
                            </div>
                            <div>
                                <ul class="list-unstyled d-flex gap-3">
                                    <li><a href="https://www.facebook.com/AirbnbItalia"><i class="fab fa-facebook"></i></a></li>
                                    <li><a href="https://www.instagram.com/airbnb/"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="https://twitter.com/Airbnb"><i class="fab fa-twitter-square"></i></a></li>
                                    <li><a href="https://www.linkedin.com/company/airbnb/"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
</template>

<style lang="scss">
    footer{
        width: 100%;
        background-color: rgb(237,130,172);

        li{
            i{
                font-size: 30px;
            }

            a{
                color: white;
                &:hover{
                color: rgb(255, 56, 92);
                }
            }
        }

        @media screen and (min-width: 400px) and (max-width: 992px){
            .media{
                display: flex;
                justify-content: center;
                text-align: center;
            }
        }
    }

</style>