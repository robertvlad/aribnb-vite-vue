<script>
import Header from './components/Header.vue';
import Jumbotron from './components/Jumbotron.vue';
import Footer from './components/Footer.vue';


  export default{
    components:{
      Header,
      Jumbotron,
      Footer,
    }
  }
</script>

<template>
  <Header></Header>
  <Jumbotron></Jumbotron>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss" scoped>

@use './styles/generals.scss' as *;

</style>
