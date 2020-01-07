<!--选项卡-->
<template>
  <el-tabs type="border-card" v-model="request_object.activeName" @tab-click="handleClick" :stretch="true" style="border: 0px;">
    <el-tab-pane v-for="(value, name, index) in tabname" :label="value" :name="name" :key="index" class="tabbar-pane-sty">
      <slot></slot>
      <div class="pagenav-bor">
        <pagenav class="tabbar-pagenav clearfix" :total="total" :page="init_page" :pageSize="pagesize" :name="name"  @page_change="page_change"></pagenav>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import pagenav from 'public/common/pagenav'
  import {request} from "network/request";

  export default {
    name: "tabbar",
    props:{
      tabname:{
        type:Object,
        default: {}
      },
      active: String,
      total: 0,
    },
    data(){
      return {
        request_object:{
          activeName: 'all',
          paging: 1,
        },
        pagesize: 6,
        init_page: 1
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log('选项卡切换，发送请求'+ tab);
        this.request_object.paging = 1;
        this.$emit('device_request',this.request_object);
      },
      page_change(page){
        console.log('页码改变，发送请求' + page);
        this.request_object.paging = page;
        this.$emit('device_request',this.request_object);
      }
    },
    created(){
      this.request_object.activeName = this.active;
      console.log('tabbar创建成功');
    },
    components:{
      pagenav
    }
  }
</script>

<style scoped>
  /* 在标签页组件tabbar那边设置居中属性 */
  .tabbar-pane-sty{
    text-align: center;
    height: 90vh;
    /* background-color: red; */
    position: relative;
    overflow-y: scroll;
  }
  .tabbar-pagenav{
    margin-top: 2%;
    position: fixed;
    bottom: 25px;
  }
  .pagenav-bor {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* 清除浮动 */
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  /* 去除滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
</style>