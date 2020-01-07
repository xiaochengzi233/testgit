<template>
  <el-row :gutter="10" class="device-el-row" style="margin-left:0;padding:0">


    <!-- 修改左侧页面 -->
    <el-col :span="12" class="health-left">
      <div class="health-left-all">
        <h3>
          设备健康状况
          <i class="el-icon-refresh-right" @click="device_refresh"></i>
        </h3>
        <!-- 左侧页面下方的内容引入tabbar组件 -->
        <div class="health-left-content">
          <tabbar
            :tabname="tabbar"
            :active="activeName"
            :total="total"
            @device_request="device_request"
          >
            <!-- 在tabbar组件中加入内容 -->
            <el-row class="health-left-content-s" v-for="(item,index) in device_list" :key="index">
              <el-col :span="4" class="health-left-content-one">
                <!-- 图片需要自适应要修改 -->
                <div class="aa">
                  <img style="width:50px;height:50px" :src="base_url+item.image" alt="无法显示图片" />
                </div>
              </el-col>
              <el-col class="health-left-content-two" :span="10">
                <div class="aa">
                  <h5 style="font-weight: bold">{{ item.device_name }}:{{ item.device_id }}</h5>
                  <h5 style="font-weight: lighter">
                    <small>{{ item.location }}</small>
                  </h5>
                  <h5>健康指标：{{ item.device_health }}</h5>
                </div>
              </el-col>
              <el-col :span="5" class="health-left-content-three">
                <div class="aa">
                  <h4>{{item.diagnosis}}</h4>
                  <h5>{{ item.diag_datetime }}</h5>
                </div>
              </el-col>
              <el-col :span="5" class="health-left-content-four">
                <div class="aa">
                  <h3 class="health-left-content-s-search" @click="more_detail(item.device_id, item.device_type)">查看</h3>
                </div>
              </el-col>
            </el-row>
          </tabbar>
        </div>
      </div>
    </el-col>

    <!--右侧 设备健康指数、报警信息和传感器、设备总览、设备温度统计、设备总体效率-->
    <el-col :span="12">
      <el-row :gutter="5">
        <!--设备健康指数-->
        <el-col :span="8" style="height: 230px">
          <el-card :body-style="{padding:0}" class="health-point">
            <h3 style="color: white">
              <small>设备健康指数</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider style="margin-top: 4px"></el-divider>
            <healthpoint :chartdata="chartdata1" ref="chart1"></healthpoint>
          </el-card>
        </el-col>
        <!--报警信息、传感器-->
        <el-col :span="16" style="height: 230px">
          <!-- 报警信息-报警数量 -->
          <el-card :body-style="{padding:0}" class="error-message">
            <h3 style="color: white">
              <small>报警信息</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="4" style="display:flex; justify-content:center">
                <el-image :src="bluefire" class="error-image" fit="'fit'"></el-image>
              </el-col>
              <el-col :span="8">
                <div style="border-right: 0.5px solid white">
                  <h3
                    style="font-weight: bold; text-align: center; margin-top: 10px"
                  >{{ warning.warning_num }}</h3>
                  <h4 style="font-weight: bold; text-align: center">报警总数</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="border-right: 0.5px solid white">
                  <h3
                    style="font-weight: bold; text-align: center; margin-top: 10px"
                  >{{ warning.handled}}</h3>
                  <h4 style="font-weight: bold; text-align: center">已处理</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="border-right: 0.5px solid white">
                  <h3
                    style="font-weight: bold; text-align: center; margin-top: 10px"
                  >{{ warning.not_handled }}</h3>
                  <h4 style="font-weight: bold; text-align: center">未处理</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <h3
                  style="font-weight: bold; text-align: center; margin-top: 10px"
                >{{ warning.handling }}</h3>
                <h4 style="font-weight: bold; text-align: center">处理中</h4>
              </el-col>
            </el-row>
          </el-card>
          <!-- 报警信息-传感器 -->
          <el-card :body-style="{padding:0}" class="error-message">
            <h3 style="color: white">
              <small>报警信息</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="4">
                <el-image :src="purplefire" class="error-image"></el-image>
              </el-col>
              <el-col :span="8">
                <div style="border-right: 0.5px solid white">
                  <h3 style="font-weight: bold; text-align: center; margin-top: 10px">{{ sensor }}</h3>
                  <h4 style="font-weight: bold; text-align: center">传感器</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="border-right: 0.5px solid white">
                  <h3 style="font-weight: bold; text-align: center; margin-top: 10px">{{ sensor }}</h3>
                  <h4 style="font-weight: bold; text-align: center">在线</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="border-right: 0.5px solid white">
                  <h3 style="font-weight: bold; text-align: center; margin-top: 10px">{{ sensor }}</h3>
                  <h4 style="font-weight: bold; text-align: center">离线</h4>
                </div>
              </el-col>
              <el-col :span="4">
                <h3 style="font-weight: bold; text-align: center; margin-top: 10px">{{ sensor }}</h3>
                <h4 style="font-weight: bold; text-align: center">异常</h4>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="12" style="margin-top:5px">
          <el-card :body-style="{padding:0}">
            <h3 style="color: white">
              <small>设备总览(设备总数{{ chartdata2.warning + chartdata2.normal + chartdata2.danger }})</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider style="margin-top:4px"></el-divider>
            <el-col :span="24">
              <!-- <div id="chart2" style="height: 180px"></div> -->
              <overview :chartdata="chartdata2" ref="chart2"></overview>

            </el-col>

          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top:5px">
          <el-card :body-style="{padding:0}">
            <h3 style="color: white">
              <small>设备温度统计</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider style="margin-top:4px"></el-divider>
            <el-col :span="24">
              <!-- <div id="chart3" style="height: 180px"></div> -->
              <temperature :chartdata="chartdata3" ref="chart3"></temperature>

            </el-col>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top:5px">
          <el-card :body-style="{padding:0}">
            <h3 style="color: white">
              <small>设备总体效率</small>
              <i
                class="el-icon-refresh-right"
                style="float: right;padding-top:4px;cursor: pointer"
                @click="device_refresh"
              ></i>
            </h3>
            <el-divider style="margin-top: 4px"></el-divider>
            <el-col :span="24">
              <efficiency ref="chart4"></efficiency>

              <!-- <div id="chart4" style="height: 180px"></div> -->
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import tabbar from "public/common/tabbar";
  import { request } from "network/request";

  import purplefire from "assets/img/purplefire.png";
  import bluefire from "assets/img/bluefire.png";
  import redsquare from "assets/img/redsquare.png";
  import orangesquare from "assets/img/orangesquare.png";
  import greensquare from "assets/img/greensquare.png";
  import bluesquare from "assets/img/bluesquare.png";

  import healthpoint from "public/content/device/device_visual/healthpoint";
  import overview from "public/content/device/device_visual/overview";
  import temperature from "public/content/device/device_visual/temperature"
  import efficiency from "public/content/device/device_visual/efficiency"

  export default {
    components: {
      tabbar,
      healthpoint,
      overview,
      temperature,
      efficiency
    },
    name: "home",
    data() {
      return {
        purplefire: purplefire,
        bluefire: bluefire,
        bluesquare: bluesquare,
        greensquare: greensquare,
        orangesquare: orangesquare,
        redsquare: redsquare,
        tabbar: {
          all: "全部",
          normal: "正常",
          planned_stop: "计划停机",
          warning: "告警",
          hang_up: "意外停机",
          sensor_offline: "传感器离线"
        },
        activeName: "all",
        device_list: [],
        total: 0,
        // base_url: "http://117.78.37.249:8001/",
        base_url:'',
        warning: "",
        sensor: 0,
        device: "",
        tempreture: "",
        power: "",
        chartdata1: Array,
        chartdata2: [],
        chartdata3: [],
        chartdata4: [],
        chartdata5: [],
        screenWidth: document.documentElement.clientWidth //屏幕宽度
      };
    },
    watch: {
      '$store.state.screenWidth':function(val) {
        // console.log(JSON.parse(JSON.stringify(val)));
        // this.getchart();
        console.log('调用子元素');
        console.log(this.$refs.chart1)
        this.$refs.chart1.getchart();
        this.$refs.chart2.getchart();
        this.$refs.chart3.getchart();
        this.$refs.chart4.getchart();
      }
    },

    mounted() {
      var _this=this;
      this.base_url=_this.$store.state.base_url;
      window.onresize = function() {
        // console.log(_this.$store.state.screenWidth);
        _this.$store.state.screenWidth=document.documentElement.clientWidth;
      };
    },
    methods: {
      device_request(status) {
        let formdata_device = new FormData();
        formdata_device.append("enterprise_id", "");
        formdata_device.append("device_status", status.activeName);
        formdata_device.append("search_field", "");
        formdata_device.append("paging", status.paging);
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
      device_refresh() {
        console.log("我要刷新");
      },

      more_detail(device_id, device_type) {
        this.$router.replace({
          path:'/homepage/device_detail',
          name:'device_detail',
          params:{
            id: device_id,
            type: device_type,
          }
        })
      }
    },
    created() {
      let formdata_device = new FormData();
      formdata_device.append("enterprise_id", "");
      formdata_device.append("device_status", this.activeName);
      formdata_device.append("search_field", "");
      formdata_device.append("paging", "1");
      request({
        url: "device/index/",
        method: "post",
        data: formdata_device
      })
        .then(res => {
          console.log(res);
          this.device_list = res.data.device_list;
          this.total = res.data.n_device;
        })
        .catch(err => {
          console.log(err);
        });
      request({
        url: "device/index/",
        method: "get"
      })
        .then(res => {
          this.device = res.data.context[0];
          this.tempreture = res.data.context[1];
          this.warning = res.data.context[3];
          // this.sensor = res.data.context[4];
          // this.power = res.data.context[5];
          // this.getchart(res.data.context);
          this.chartdata1 = res.data.context[2];
          this.chartdata2 = res.data.context[0];
          this.chartdata3 = res.data.context[1];
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  /*.el-card__header {*/
  /*padding: 0;*/
  /*}*/
  .el-divider {
    margin: 5px 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-top: 6px;
    font-weight: lighter;
  }
  .health-point {
    box-sizing: border-box;
  }
  .error-message {
    height: 113px;
    margin-bottom: 4px;
    box-sizing: border-box;
  }
  .error-image {
    height: 100%;
    padding: 8px;
    padding-top: 0px;
  }
  /* 修改左侧页面 */
  .health-left {
    /* 先固定高度之后再改 */
    /* height: 800px; */
    border: 1px solid #324156;
    border-radius: 1%;
    background-color: #1b232f;

  }
  .health-left-all {
    text-align: center;
    color: white;
    /* background-color: #128; */
  }
  /* 左侧顶栏刷新按钮 */
  .health-left-all i {
    float: right !important;
    cursor: pointer;
    line-height: 25px;
  }
  .health-left-content-s {
    height: 80px;
    background-color: #181f29;
    margin-top: 1%;
  }
  /*  */
  .health-left-content-s > .el-col {
    height: 100%;
    /* border: 1px solid #000; */
  }
  .health-left-content {
    /* height: 100vh; */
    background-color: #fff;
    /* position: relative; */
  }
  /* content中第二格部分 */
  .health-left-content-one,
  .health-left-content-three,
  .health-left-content-four {
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* content中第二格部分 */
  .health-left-content-two {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  /* content中第四格部分 */
  .health-left-content-s-search {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .device-el-row {
    height: 100%;
    margin: 0 5px;
  }
</style>