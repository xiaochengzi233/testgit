<template>
  <device_lists>
    <template v-slot:default="slotProps">
      <div class="device-detail" @click="device_select(slotProps)">选择设备</div>
    </template>
  </device_lists>
</template>

<script>
  import device_lists from 'public/content/device/device_file/device_lists'
  export default {
    name: "history_detail_select",
    methods:{
      device_select(device_object){
        this.$router.replace({
          path: '/detail',
          name: 'detail',
          params: {
            id: device_object.device_id,
            name: device_object.device_name,
          }
        })
      }
    },
    components: {
      device_lists,
    }
  }
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