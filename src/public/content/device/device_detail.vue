<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-row :gutter="5">
      <el-col :span="18">
        <el-card style="height: 800px ; margin-bottom: 0.5%">
          <el-row>
            <el-col :span="4" style="padding-left: 2%">
              <h3 style="margin: 0; margin-top: 10%">设备详情</h3>
            </el-col>
            <el-col :span="20" style="text-align: right ; padding-right: 2% ; padding-top: 1%">
              <el-button type="info" @click="back_devicelist" plain>返回设备列表</el-button>
            </el-col>
          </el-row>
          <el-tabs type="border-card" v-model="activeName" style="margin: 2%" :stretch="true">
            <el-tab-pane label="模型预览" name="model">
              <model></model>
            </el-tab-pane>
            <el-tab-pane label="波形" name="wav">
              <wav v-if="activeName === 'wav'"></wav>
            </el-tab-pane>
            <el-tab-pane label="频谱" name="spectrum">
              <spectrum v-if="activeName === 'spectrum'"></spectrum>
            </el-tab-pane>
            <el-tab-pane label="特征" name="feature">
              <feature v-if="activeName === 'feature'"></feature>
            </el-tab-pane>
            <el-tab-pane label="诊断" name="diagnosis">
              <diagnosis v-if="activeName === 'diagnosis'"></diagnosis>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-col :span="12">
          <el-card>
            <h4 style="margin-left: 2%">设备健康指数</h4>
            <healthpoint ref="chart1" :chartdata="chartdata"></healthpoint>
          </el-card>
        </el-col>
        <el-col :span="12" style="padding-left: 0.25%">
          <el-card class="box-card" :body-style="{padding: '10px' }" style=" height: 300px">
            <h4>详细数据</h4>
            <el-row style="margin: 3% 0;">
              <el-col :span="4">
                <div style="text-align: center">轴向</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">编号</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">特征1</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">特征2</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">特征3</div>
              </el-col>
            </el-row>
            <el-row style="margin: 3% 0">
              <el-col :span="4">
                <div style="text-align: center">X</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">1</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">2</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">3</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">4</div>
              </el-col>
            </el-row>
            <el-row style="margin: 3% 0">
              <el-col :span="4">
                <div style="text-align: center">Y</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">1</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">2</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">3</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">4</div>
              </el-col>
            </el-row>
            <el-row style="margin: 3% 0">
              <el-col :span="4">
                <div style="text-align: center">Z</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">1</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">2</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">3</div>
              </el-col>
              <el-col :span="5">
                <div style="text-align: center">4</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="6" style="padding: 0.1%">
        <el-card style="height: 96vh">
          <el-row>
            <el-col :span="6">
              <h4>设备参数</h4>
            </el-col>
            <el-col :span="6">
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-top: 13%"
                @click="device_edit"
              >编辑</el-button>
            </el-col>
            <el-col :span="12" style="text-align: right ; padding-right: 5% ; padding-top: 3%">
              <el-button type="primary" plain @click="delete_device">删除</el-button>
            </el-col>
          </el-row>
          <div style="height: 30vh; text-align: center">
            <el-image :src="image" fill="fit" style="height: 30vh;width: 15vw"></el-image>
          </div>
          <h4 style="text-align: center ; margin-bottom: 1%">{{ device_params.device_name }}</h4>
          <h5 style="text-align: center ; margin-top: 1%">{{ device_params.location }}</h5>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">电机种类</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.motor_type }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">电机容量</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.capacity }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">生产日期</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.manufac_date }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">安装日期</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.deploy_date }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">额定电压</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.rated_voltage }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">额定电流</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.rated_current }}</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">额定频率</h4>
            </el-col>
            <el-col :span="18" style="text-align: right">
              <h4 style="margin-top: 3% ; margin-bottom: 3%">{{ device_params.rated_frequency }}</h4>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import healthpoint from "public/content/device/device_visual/healthpoint";
  import model from "public/content/device/device_visual/model";
  import wav from "public/content/device/device_visual/wav";
  import spectrum from "public/content/device/device_visual/spectrum";
  import feature from "public/content/device/device_visual/feature";
  import diagnosis from "public/content/device/device_visual/diagnosis";
  import { request } from "network/request";

  export default {
    name: "device_detail",
    data() {
      return {
        activeName: "model",
        chartdata: {
          'health_index': '',
          'health_status': '',
        },
        device_id: '',
        device_type: 0,
        base_url: '',
        image: '',
        device_params: '',
        screenWidth: document.documentElement.clientWidth //屏幕宽度
      };
    },
    methods: {
      back_devicelist() {
        this.$router.replace("device_list");
      },
      device_edit() {
        this.$router.replace({
          path:'device_edit',
          name:'device_edit',
          params:{
            id: this.device_id,
            type: this.device_type,
          }
        })
      },
      delete_device(){
        this.$confirm('即将删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          console.log(this.device_id);
          let formdata = new FormData();
          formdata.append('device_id', this.device_id);
          request({
            url: 'device/delete/',
            method: 'post',
            data: formdata
          }).then(res => {
            if (res.data.message == 'Device Delete Successfully!') {
              this.$alert('设备删除成功', '提示', {
                confirmButtonText: '确定',
              });
              this.$router.replace('device_list');
            }
            else {
              this.$alert('设备删除失败，请验证权限后再次尝试', '提示', {
                confirmButtonText: '确定',
              });
            }
          }).catch(err => {
            this.$alert('服务器异常', '提示', {
              confirmButtonText: '确定',
            });
          });
        }).catch(err => {

        })
      },
      device_detail(){
        let formdata = new FormData();
        formdata.append('device_id', this.device_id);
        formdata.append('device_type', this.device_type);
        request({
          url: 'device/info/',
          method: 'post',
          data: formdata
        }).then(res => {
          this.device_params = res.data;
          this.image = this.base_url + res.data.image;
          console.log(this.image);
          if(res.data.device_health >= 75)
            this.chartdata.health_status= '状态良好';
          else if(res.data.device_health < 60)
            this.chartdata.health_status = '状态危急';
          else
            this.chartdata.health_status = '状态异常';
          this.chartdata.health_index = res.data.device_health;

          console.log(this.chartdata);
          console.log(res.data);
          console.log(this.chartdata);
        }).catch(err => {

        })
      }
    },
    watch: {
      "$store.state.screenWidth": function(val) {
        this.$refs.chart1.getchart();
      }
    },
    components: {
      healthpoint,
      wav,
      spectrum,
      feature,
      diagnosis,
      model
    },
    mounted() {
      var _this = this;
      window.onresize = function() {
        // console.log(_this.$store.state.screenWidth);
        _this.$store.state.screenWidth = document.documentElement.clientWidth;
      };
      // this.$refs.chart1.getchart();
    },
    created() {
      this.device_id = this.$route.params.id;
      this.device_type = this.$route.params.type;
      this.device_detail();
      this.base_url = this.$store.state.base_url;
    }
  };
</script>

<style scoped>
</style>