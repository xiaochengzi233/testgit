<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <div class="el-card" style="padding-left: 2% ; width:900px ; margin: 10px auto;" v-if="is_motor">
      <h3 style="margin-left: 1% ; margin-top: 3% ; text-align: center">电机参数</h3>
      <div style="margin-top: 5%">
        <el-row>
          <el-col :span="5" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">设备种类：</h4>
          </el-col>
          <el-col :span="5">
            <h4 style="margin-top: 3%">电机</h4>
          </el-col>
          <el-col :span="5" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">电机种类：</h4>
          </el-col>
          <el-col :span="6">
            <el-input v-model="motor_type" placeholder="请输入电机种类"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="5" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">生产日期：</h4>
          </el-col>
          <el-col :span="6">
            <el-input v-model="manufac_date" placeholder="例：1900-01-01"></el-input>
          </el-col>
          <el-col :span="4" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">安装日期：</h4>
          </el-col>
          <el-col :span="6">
            <el-input v-model="deploy_date" placeholder="例：1900-01-01"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">额定电压（kV）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="rated_voltage"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">电机容量（MVA）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="capacity"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">额定电流（kA）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="rated_current"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">额定频率：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="rated_frequency"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">极对数：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="num_of_poles_pairs"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">轴承类型：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="type_of_bearings"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">槽数：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="num_of_slots"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">转子类型：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="type_of_rotor"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">定子电抗（额定频率）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="stator_reactance"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">定子电阻（额定频率）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="stator_resistance"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 1%">
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">转子电抗（额定频率）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="rotor_reactance"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">转子电阻（额定频率）：</h4>
          </el-col>
          <el-col :span="4">
            <el-input v-model="rotor_resistance"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="7" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">其他描述：</h4>
          </el-col>
          <el-col :span="14">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="description">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 5%">
        <el-col :span="12" :offset="6">
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="back">返回</el-button> </el-col>
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain>提交</el-button> </el-col>
        </el-col>
      </div>
    </div>
    <div class="el-card" style="padding-left: 2% ; width: 800px ; margin: 10px auto ;" v-if="!is_motor">
      <h3 style="margin-left: 1% ; margin-top: 3% ; text-align: center">泵参数</h3>
      <div style="margin-top: 5%">
        <el-row>
          <el-col :span="5" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">设备种类：</h4>
          </el-col>
          <el-col :span="5">
            <h4 style="margin-top: 3%">泵</h4>
          </el-col>
          <el-col :span="5" style="text-align: right ; padding-right: 3%">
            <h4 style="margin-top: 4%">泵种类：</h4>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pump_type" placeholder="请输入泵的种类"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
      <div style="margin-top: 5%" >
        <el-col :span="12" :offset="6">
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="back">返回</el-button> </el-col>
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="submit">提交</el-button> </el-col>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
  import { request } from "network/request";
  export default {
    name: "device_edit",
    data(){
      return{
        description:'',
        device_id: '',
        device_type: '',
        motor_type:'',
        manufac_date:'',
        deploy_date:'',
        capacity:'',
        rated_voltage:'',
        rated_current:'',
        rated_frequency:'',
        num_of_poles_pairs:'',
        num_of_slots:'',
        type_of_bearings:'',
        type_of_rotor:'',
        stator_reactance:'',
        stator_resistance:'',
        rotor_reactance:'',
        rotor_resistance:'',
        description:'',
        pump_type:'',
        // 点击“上一步”、“下一步”切换页面
        is_motor: false,
      }
    },
    methods: {
      // 点击返回的事件
      back() {
        this.$router.replace({
          path: 'device_detail',
          name: 'device_detail',
          params:{
            id: this.device_id,
            type: this.device_type,
          }
        });
      },
      submit(){
        let formdata = new FormData();
        formdata.append('device_id',this.device_id);
        formdata.append('device_type',this.device_type);
        request({
          url: 'device/info/',
          method: 'post',
          data: formdata,
        }).then(res => {
          this.device_params = res.data;
          console.log(this.device_params);
          console.log(res);
        }).catch(err => {

        })
      },
      device_edit() {
        let formdata = new FormData();
        formdata.append('device_id',this.device_id);
        formdata.append('device_type',this.device_type);
        request({
          url: 'device/info/',
          method: 'post',
          data: formdata,
        }).then(res => {
          this.device_params = res.data;
          console.log(this.device_params);
          console.log(res);
        }).catch(err => {

        })
      }
    },
    created(){
      this.device_id = this.$route.params.id;
      this.device_type = this.$route.params.type;
      if(this.device_type == 0)
        this.is_motor = true;
      else
        this.is_motor = false;
    },
    mounted() {
      this.device_edit();
    }
  };
</script>

<style scoped>

</style>