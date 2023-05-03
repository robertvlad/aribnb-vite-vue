<script>
export default {
  data() {
    return {
      people: [
        {
          name: "Alessandro",
          surname: "Barile",
          description: "Alessandro Barile è un talentuoso sviluppatore Full Stack si è occupato della parte estetica del nostro sito web, fornendo il suo contributo nella progettazione del Front End e, in parte, del Back End. Grazie al suo forte senso estetico, ha aiutato a definire l'immagine del nostro marchio e a rendere il nostro sito visivamente accattivante per i nostri visitatori.",
          image: "AlessandroBarile.jpeg",
        },
        {
          name: "Robert",
          surname: "Vlad",
          description: "Robert Vlad è un Full Stack Developer con esperienza sia nella parte frontend che in quella backend. Si è occupato di sviluppare e implementare le funzionalità necessarie per il nostro sito, assicurandosi che tutto funzioni in modo efficiente e senza problemi. Grazie alla sua attenzione ai dettagli, il nostro sito è in grado di offrire un'esperienza utente fluida e intuitiva.",
          image: "RobertVlad.png",
        },
        {
          name: "Luigi",
          surname: "Manolio",
          description: "Luigi Manolio è un full-stack developer con una grande esperienza nella creazione di applicazioni web scalabili e performanti. Si è occupato principalmente della parte backend del nostro sito, implementando filtraggi e funzionalità avanzate. Tuttavia, grazie alla sua conoscenza approfondita di molte tecnologie web, ha anche contribuito alla parte front-end del sito. La sua passione per il codice pulito e ben strutturato si riflette in ogni aspetto del nostro sito, e ci ha permesso di fornire un'esperienza utente fluida e senza intoppi.",
          image: "LuigiManolio.png",
        },
        {
          name: "Filippo",
          surname: "Sabaiz",
          description: "Filippo Sbaiz è un talentuoso sviluppatore Full Stack con una grande passione per il design. Si è occupato principalmente della parte front-end del nostro sito, curando in particolare l'aspetto estetico e la user experience. Grazie alla sua attenzione per i dettagli e alla sua creatività, Filippo ha contribuito a rendere il nostro sito un'esperienza piacevole e coinvolgente per gli utenti.",
          image: "FilippoSbaiz.jpg",
        },
        {
          name: "Cyprian",
          surname: "Budzaj",
          description: "Cyprian Budzaj è un Full Stack Developer che ha contribuito principalmente alla parte back end del nostro sito. Ha dimostrato capacità di problem solving e ha aiutato il nostro team a risolvere molti bug anche nella parte front/back end del sito. Grazie alla sua attenzione ai dettagli e alla sua determinazione nel risolvere i problemi, ha aiutato nel mantenere il nostro sito in funzione in modo efficiente.",
          image: "CyprianBudzaj.jpg",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="bg-pink">
    <div class="card-group">
        <div class="card m-2 d-flex justify-content-center bg-dark text-white" v-for="(person, index) in people" :key="index">
            <div class="my-card">
                <img :src="`/img/${person.image}`" class="card-img-top img-fit" :alt="person.name">
            </div>
            <div class="card-body p-2">
                <h5 class="card-title my-2">{{ person.name }} {{ person.surname }}</h5>
                <p class="card-text">{{ person.description }}</p>
            </div>
        </div>
    </div>
  </div>
</template>  

<style lang="scss" scoped>
    @use '../styles/generals.scss' as *;
    .bg-pink{
        background: rgb(237,130,172);
        background: linear-gradient(0deg, rgba(237,130,172,1) 15%, rgba(255,255,255,1) 50%);
    }
    .my-card{
        height: 300px;
        border-radius: 15px;
        margin: 10px auto;

        .img-fit{
            object-fit: cover;
            width: 100%;
            height: 100%;
            object-position: top;
        }
    }
</style>