<!--homepage左侧菜单栏-->
<template>
    <el-menu
      :router="true"
      default-active="home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="border:transparent; height: 100%"
      :default-openeds='["2"]'
      :unique-opened="true">
      <el-menu-item index="/homepage/home">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </template>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/homepage/device_list">设备列表</el-menu-item>
          <el-menu-item index="/homepage/history_detail">历史数据详情</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-bell"></i>
          <span slot="title">告警管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/homepage/warning_list">未处理</el-menu-item>
          <el-menu-item index="/homepage/warning_processing">处理中</el-menu-item>
          <el-menu-item index="/homepage/warning_history">已完成</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/homepage/user_list">用户列表</el-menu-item>
          <el-menu-item index="/homepage/user_info">用户信息</el-menu-item>
          <el-menu-item index="/homepage/user_auth">用户权限</el-menu-item>
          <el-menu-item index="/homepage/sensor_manage">传感器管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    name: "sidebar",
    data() {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created(){
      console.log('sidebar创建成功');
    },
    components:{
    }
  }
</script>

<style scoped>

</style>