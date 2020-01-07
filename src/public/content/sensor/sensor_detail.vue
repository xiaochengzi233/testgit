<template>
  <div>
    <el-col :span="18" style="margin-right: 5px">
      <div class="el-card">
        <el-col :span="8">
          <div style="padding-left: 10% ; margin: 2%">
            <el-col style="margin-bottom: 50%">
              <h3 style="margin-top: 5%">
                <i class="el-icon-back"></i>
                <span class="back-list" @click="back">返回列表</span>
              </h3>
            </el-col>
            <h4 style="margin-top: 10%">原厂编号：{{detail.sensor_id}}</h4>
            <h4 style="margin-top: 10% ; margin-bottom: 40%">生产厂家：{{detail.manufacturer}}</h4>
            <el-row>
              <el-col :span="8">
                <h4 style="margin-top: 10%">显示编号：</h4>
              </el-col>
              <el-col :span="12">
                <h4 style="margin-top: 7%">{{detail.enterprise_id}}</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <h4 style="margin-top: 10%">状态：</h4>
              </el-col>
              <el-col v-if="show_change" :span="12">
                <el-select v-model="value" placeholder="请选择传感器状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col v-if="!show_change" :span="12">
                <h4 style="margin-top: 7%">{{detail.sensor_status}}</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <h4 style="margin-top: 10%">企业编号：</h4>
              </el-col>
              <el-col v-if="show_change" :span="12">
                <el-input v-model="input_enterprise_id" placeholder="请输入企业编号："></el-input>
              </el-col>
              <el-col v-if="!show_change" :span="12">
                <h4 style="margin-top: 7%">{{detail.enterprise_id}}</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <h4 style="margin-top: 10%">设备编号：</h4>
              </el-col>
              <el-col v-if="show_change" :span="12">
                <el-input v-model="input_device_id" placeholder="请输入设备编号："></el-input>
              </el-col>
              <el-col v-if="!show_change" :span="12">
                <h4 style="margin-top: 7%">{{detail.device_id}}</h4>
              </el-col>
            </el-row>
          </div>
          <div v-if="show_change" style="text-align: center ; margin-top: 10% ; margin-bottom: 10%">
            <el-button type="primary" plain @click="addSensor">确认</el-button>
          </div>
          <div
            v-if="!show_change"
            style="text-align: center ; margin-top: 10% ; margin-bottom: 10%"
          >
            <el-button @click="addSensor" type="primary" plain>修改</el-button>
          </div>
        </el-col>
        <el-col :span="16" style="height:850px">
          <img :src="base_url+detail.image" class="pic" />
        </el-col>
      </div>
    </el-col>
    <el-col :span="5" style="width:24.5%">
      <div class="el-card">
        <h4 style="margin: 10%;">电量</h4>
        <battery :battery_data="detail.electric_quantity" class="battery-style"></battery>
      </div>
      <div class="el-card" style="margin-top: 5px">
        <h4 style="margin: 8%;">温度</h4>
        <temperature :temperature_data="detail.temperature" class="temperature-style"></temperature>
      </div>
      <div class="el-card" style="margin-top: 5px;position:relative">
        <h4 style="margin: 8%;">信号强度</h4>
        <signal :signal_data="detail.signal_intensity" class="signal-style"></signal>
        <h4 style="margin: 8%;padding-top:10px;">剩余寿命</h4>
        <lifetime :lifetime_data="detail.remaining_endurance" class="lifetime-style"></lifetime>
      </div>
    </el-col>
  </div>
</template>

<script>
import battery from "./sensor_visual/battery";
import temperature from "./sensor_visual/sensor_temperature";
import signal from "./sensor_visual/signal";
import lifetime from "./sensor_visual/lifetime";
import {request} from "network/request";

export default {
  name: "sensor_detail_edit",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "ON"
        },
        {
          value: "选项2",
          label: "OFF"
        }
      ],
      value: "",
      input_enterprise_id: "",
      input_device_id: "",
      show_change: false,
      detail: [],
      base_url: "http://117.78.37.249:8001/",
    };
  },
  components: {
    battery,
    temperature,
    signal,
    lifetime
  },
  methods: {
    addSensor() {
      this.show_change = !this.show_change;
    },
    back() {
      this.$router.replace("sensor_list");
    },
    getDetail() {
      this.detail = sessionStorage.getItem("sensorDetail");
      console.log(this.detail);
      let formdata_detail = new FormData();
      formdata_detail.append("sensor_id",this.detail);
      request({
        url: "sensor/detail/",
        method: "post",
        data: formdata_detail
      })
        .then(res => {
          console.log(res, 1111);
          this.detail = res.data.sensor_info[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped>
.back-list {
  color: #fff;
  font-size: 20px;
}
.back-list:hover {
  cursor: pointer;
  text-decoration: underline;
}
h4 {
  color: #ccc;
  font-weight: lighter;
}
.el-card > h4 {
  font-size: 21px;
  color: #fff;
  height: 25px;
}
.pic {
  display: flex;
  align-items: center;
}
.battery-style {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  position: relative;
  top: -10px;
}
.temperature-style {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  position: relative;
  top: -25px;
}
.signal-style {
  width: 25%;
  height: 45px;
  position: absolute;
  left: 140px;
  top: 8px;
}
.lifetime-style {
  width: 80%;
  height: 80px;
  position: relative;
  top: -15px;
  left: 5px;
}
</style>