import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import AboutUs from './pages/AboutUs.vue';
import NotFound from './pages/NotFound.vue';
import SingleApartment from './pages/SingleApartment.vue';
// import ThankYou from './pages/ThankYou.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage,
        },
        {
            path: '/About-Us',
            name: 'about_us',
            component: AboutUs,
        },
        {
            path: '/homepage/:slug', //,il nome deve concidere con quello dato in api.php
            name: 'single_apartment',
            component: SingleApartment
        },
        // {
        //     path: '/Thank-You',
        //     name: 'ThankYou',
        //     component: ThankYou
        // },
        {
            path: '/*',
            name: 'not_found',
            component: NotFound
        },

    ]
});

export { router }