<template>
  <!-- 导航 -->
  <tabbar :tabname="tabbar" :total="total" :active="activeName" @device_request="device_request">
    <!-- 添加设备 输入框 -->
    <el-row>
      <div class="input-search">
        <slot name="add_device"></slot>
        <el-input placeholder="请输入位置/编号/设备名" v-model="search_field" suffix-icon="el-icon-search" @change="search"></el-input>
      </div>
    </el-row>
    <!-- 标题 -->
    <el-row style="text-align: center" class="device-title">
      <el-col :span="8">设备</el-col>
      <el-col :span="2">振幅</el-col>
      <el-col :span="2">温度</el-col>
      <el-col :span="2">RMS</el-col>
      <el-col :span="2">频谱</el-col>
      <el-col :span="2">AI指标</el-col>
      <el-col :span="6">设备状况</el-col>
    </el-row>
    <!-- 内容 -->
    <div class="device-content">
      <el-row class="el-row" v-for="(item,index) in device_list" :key="index">
        <el-col :span="8">
          <div class="grid-content" style="display:flex">
            <!-- 图片 -->
            <div style="width:70px;padding:5px;">
              <img :src="base_url + item.image" alt="无法显示图片" class="img-wrapper" style="width：100%"/>
            </div>
            <!-- 设备信息 -->
            <div class="info" style="flex:1">
              <div class="info-name">
                <span>{{item.device_name}}</span>
                <span>{{item.device_id}}</span>
              </div>
              <div class="info-location">{{item.location}}</div>
              <div class="info-health">
                健康指标：
                <span class="color-red">{{item.device_health}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 振幅 -->
        <el-col :span="2">
          <div class="grid-content">
            <div class="color-red item-align">{{item.amplitude}}</div>
          </div>
        </el-col>
        <!-- 温度 -->
        <el-col :span="2">
          <div class="grid-content">
            <div class="color-orange item-align">{{item.temperature}}</div>
          </div>
        </el-col>
        <!-- RMS -->
        <el-col :span="2">
          <div class="grid-content">
            <div class="color-red item-align">{{item.rms}}</div>
          </div>
        </el-col>
        <!-- 频谱 -->
        <el-col :span="2">
          <div class="grid-content">
            <div class="color-green item-align">{{item.fft}}</div>
          </div>
        </el-col>
        <!-- AI指标 -->
        <el-col :span="2">
          <div class="grid-content">
            <div class="color-red item-align">{{item.ai_index}}</div>
          </div>
        </el-col>
        <!-- 设备状况 -->
        <el-col :span="6">
          <div class="grid-content">
            <div class="device-condition">
              <div class="color-red">{{item.diagnosis}}</div>
              <div class="info-time">{{item.diag_datetime}}</div>
            </div>
            <slot :device_id="item.device_id" :device_type="item.device_type" :device_name="item.device_name"></slot>
          </div>
        </el-col>
      </el-row>
    </div>
  </tabbar>
</template>

<script>
  import { request } from "network/request";
  import tabbar from "public/common/tabbar";
  export default {
    name: "device_lists",
    data() {
      return {
        tabbar: {
          all: "全部",
          normal: "正常",
          planned_stop: "计划停机",
          warning: "告警",
          hang_up: "意外停机",
          sensor_offline: "传感器离线"
        },
        base_url:'',
        activeName: "all",
        total: 0,
        page: 1,
        device_list: "",
        search_field: "",
      };
    },
    methods: {
      get_devicelist() {
        let formdata_device = new FormData();
        formdata_device.append("enterprise_id", "");
        formdata_device.append("device_status", this.activeName);
        formdata_device.append("search_field", this.search_field);
        formdata_device.append("paging", this.page);
        console.log('列表请求');
        console.log(formdata_device);
        request({
          url: "device/index/",
          method: "post",
          data: formdata_device
        })
          .then(res => {
            console.log(res);
            this.device_list = res.data.device_list;
            this.total = res.data.n_device;
            console.log(this.total);
          })
          .catch(err => {
            console.log(err);
          });
      },
      device_request(request_object) {
        this.activeName = request_object.activeName;
        this.page = request_object.paging;
        this.search_field = '';
        // console.log(this.search_field);
        this.get_devicelist();
      },
      device_add() {
        this.$router.replace('device_add');
      },
      search(){
        this.get_devicelist();
      },
    },
    created() {
      var _this = this;
      this.base_url = _this.$store.state.base_url;
      this.get_devicelist();
    },
    components: {
      tabbar
    }
  };
</script>

<style scoped>
  /* 添加设备 搜索框 */
  .input-search {
    width: 400px;
    float: right;
    margin-bottom: 15px;
  }
  /* 搜索框 */
  .el-input--suffix {
    width: 200px;
    float: right;
  }
  /* 标题 */
  .device-title {
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .device-title > .el-col {
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
  /* 内容 */
  .device-content {
    width: calc(100% - 2px);
    min-height: 400px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .grid-content {
    width: 100%;
    height: 80px;
    background-color: #181f29;
  }
  .grid-content:first-child {
    margin-top: 0;
  }
  /* 设备 */
  .el-col-8 {
    text-align: left;
  }
  /* 图片 */
  .img-wrapper {
    width:100%;
    /* padding:3px; */
    /* position: relative;
    left: 10px;
    top: 12px; */
  }
  /* 设备信息 */
  .info {
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
    /* margin-top: -28px; */
  }
  /* 设备姓名 */
  .info-name {
    color: #eef2f8;
  }
  .info-name > span:first-child {
    width: 140px;
    display: inline-block;
    margin-right: 10px;
  }
  .info-location {
    font-size: 14px;
  }
  /* 设备时间 */
  .info-location,
  .info-time {
    color: rgb(214, 218, 218);
  }
  /* 设备健康指标 */
  .info-health {
    color: #6d6f72;
    margin-top: -4px;
  }
  /* 红色 */
  .color-red {
    color: rgb(160, 20, 20);
    font-size: 20px;
  }
  /* 橘色 */
  .color-orange {
    color: orange;
    font-size: 20px;
  }
  /* 绿色 */
  .color-green {
    color: rgb(161, 228, 54);
    font-size: 20px;
  }
  .item-align {
    height: 80px;
    line-height: 80px;
  }
  /* 设备状况 */
  .device-condition {
    display: inline-block;
    vertical-align: middle;
  }
</style>