<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

  export default{
    components:{
      Header,
      Footer,
    }
  }
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss" scoped>

@use './styles/generals.scss' as *;

</style>
