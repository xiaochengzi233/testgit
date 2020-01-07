<template>
  <device_lists>
    <template v-slot:add_device>
      <el-button type="warning" plain icon="el-icon-s-custom" @click="device_add">添加设备</el-button>
    </template>
    <template v-slot:default="slotProps">
      <div class="device-detail" @click="device_detail(slotProps.device_id, slotProps.device_type)">查看详情</div>
    </template>
  </device_lists>
</template>

<script>
  import device_lists from "public/content/device/device_file/device_lists";
  export default {
    name: "device_list",
    methods:{
      device_add() {
        this.$router.replace('device_add');
      },
      device_detail(device_id, device_type){
        console.log(device_type);
        this.$router.replace({
          path:'device_detail',
          name:'device_detail',
          params:{
            id: device_id,
            type: device_type
          }
        })
      }
    },
    components: {
      device_lists
    }
  };
</script>

<style scoped>
  /* 查看设备 */
  .device-detail {
    height: 80px;
    line-height: 80px;
    color: #6d6f72;
    margin: 0 20px;
    font-size: 18px;
    cursor: pointer;
    display: inline-block;
  }
</style>