<template>
  <router-view></router-view>
</template>

<script>
  import login from './login';
  import homepage from './homepage'
  export default {
    name: "app",
    components:{
      login,
      homepage,
    }
  }
</script>

<style scoped>

</style>