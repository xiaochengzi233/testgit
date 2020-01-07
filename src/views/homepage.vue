<template>
  <el-container class="container">
    <el-header class="header" height='50px'>
      <topbar :username="username"></topbar>
    </el-header>
    <el-container class="body">
      <el-aside class="aside" width="200px">
        <sidebar></sidebar>
      </el-aside>
      <el-main class="main">
          <!-- <div style="width:200px"></div> -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import topbar from 'public/common/topbar'
  import sidebar from 'public/common/sidebar'
  export default {
    name: "homepage",
    data(){
      return{
        username:'',
      }
    },
    components: {
      sidebar,
      topbar,
    }
  }
</script>

<style scoped>
  .container{
    /* height: 100%; */
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    margin: auto;
    flex: 1
  }
  .header {
    background-color: #181f29;
    height: 50px;
    position: fixed;
    width:100%;
    z-index: 999;
  }
  .main{
    padding: 5px;
    flex: 1;
    /* display:flex; */
    margin-left: 200px;
    margin-top: 50px
  }
  .main::-webkit-scrollbar{
    width: 0;
  }
  .aside{
    position: fixed;
    top: 50px;
    height:100vh;
    /* margin-top: 50px */

  }
  .body{
    display: flex;
  }
</style>