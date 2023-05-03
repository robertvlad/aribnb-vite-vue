import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';


createApp(App).use(router).mount('#app')

// function showFilteredData(data) {
//     const container = document.querySelector('.filtered-data-container');
//     container.innerHTML = '';

//     if (data.length != 0) {
//         const card = document.querySelector('.cards');
//         data.forEach(item => {
//             const listItem = document.innerHTML = card;
//             container.appendChild(listItem);
//         });
//     } else {
//         const message = document.createElement('p');
//         message.innerText = 'Nessun risultato trovato';
//         container.appendChild(message);
//     }
// }

// async submitData() {
//     try {
//     // gestione della risposta
//     const { data } = await axios.get(${store.baseUrl}/api/search, {
//     params: {
//     address: this.filterData.address,
//     distance: this.filterData.distance,
//     bed_n: this.filterData.bed_n,
//     room_n: this.filterData.room_n,
//     optionals: this.filterData.optionals,
//     },
//     });
    
//         this.apartments = data.apartments;
//         const resultEl = document.querySelector('#result');
//         resultEl.innerHTML = JSON.stringify(data);
//       } catch (error) {
//         // gestione dell'errore
//         console.error(error);
//       }
//     },