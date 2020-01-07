<template>
  <div>
    <el-row style="background-color: #1B232F;min-height: 5vh">
      <!--已选择设备的信息 设备id detail location-->
      <h4 style="float: left;margin-right: 20px; margin-top: 5px">已选择设备：{{ device_id }}---{{ device_name }}</h4>
      <el-select v-model="sensor_id" placeholder="请选择传感器" size="small">
        <el-option v-for="(item, index) in options" :key="item.value" :label="index + 1+'号传感器'" :value="item.sensor_id" @change="sensor_change">
          <!--可禁用、可清空、可搜索-->
        </el-option>
      </el-select>
      <el-button type="text" style="float: right;" @click="get_device_list">
        选择设备
        <i class="el-icon-right"></i>
      </el-button>
    </el-row>
    <el-row :gutter="4">
      <el-col :span="filelist_width">
        <file_list @date_change="date_change" @datetype_change="datatype_change" @data_switch="data_switch" :file_list="file_list"></file_list>
      </el-col>
      <el-col :span="visual_width">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" :stretch="true" style="border: 0px;margin-top: 5px;">
          <el-tab-pane label="频谱" name="fft">
            <spectrum v-if="activeName === 'fft'" :spectrum_data="data_list"></spectrum>
          </el-tab-pane>
          <el-tab-pane label="波形" name="wav">
            <wav v-if="activeName === 'wav'" :wav_data="data_list" :date="file_name.replace('.pickle')"></wav>
          </el-tab-pane>
          <el-tab-pane label="特征" name="feature">
            <feature v-if="activeName === 'feature'" :feature_data="data_list" @time_change="time_change" :data_y="featureData_y"></feature>
          </el-tab-pane>
          <el-tab-pane label="诊断" name="diagnosis">
            <diagnosis v-if="activeName === 'diagnosis'" :diagnosis_data="data_list" @time_change="time_change"></diagnosis>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {
    request
  } from "network/request";
  import file_list from './device_file/file_list';
  import wav from './device_visual/wav'
  import spectrum from './device_visual/spectrum'
  import feature from './device_visual/feature'
  import diagnosis from './device_visual/diagnosis'
  export default {
    name: "history_detail_homepage",
    data() {
      return {
        //宽度控制
        filelist_width: 6,
        visual_width: 18,
        options:[],
        //保存请求到的数据
        data_list: '',
        featureData_y: [],
        //选项卡状态
        activeName: 'fft',
        //设备信息
        sensor_id: '',
        device_id: '',
        device_name: '',
        // 起始时间
        dt_start:'',
        dt_end:'',
        enterprise_id:'',
        //频谱跟波形的高低频
        high_low: 'lf',
        //需要请求的文件名
        file_name: '',
        //请求到的文件列表
        file_list: '',
      }
    },
    watch:{
      sensor_id(val){
        console.log(val);
      }
    },
    methods: {
      //页面跳转到这页获取参数
      getdata() {
        this.device_id = this.$route.params.id;
        this.device_name = this.$route.params.name;

        let formdata_device = new FormData();
        formdata_device.append('device_id',this.device_id);
        console.log(formdata_device);
        request({
          url:'device/detail/sensor_list/',
          method:'post',
          data:formdata_device,
        }).then(res=>{
          this.options=res.data.sensor_list;
        }).catch(err=>{
          console.log(err)
        })

      },
      //选项卡为频谱、波形的时候 请求文件列表
      get_filelist() {
        let formdata_file = new FormData();
        formdata_file.append('sensor_id', this.sensor_id);
        formdata_file.append('data_type', this.activeName + '_' + this.high_low);
        formdata_file.append('dt_start',this.dt_start);
        formdata_file.append('dt_end',this.dt_end);
        request({
          url: 'device/history_file_list/',
          method: 'post',
          data: formdata_file
        }).then(res => {
          console.log(res);
          this.file_list = res.data.file_names;
        }).catch(err => {
          console.log(err);
        })
      },
      //请求波形、频谱
      get_datalist() {
        let formdata_data = new FormData();
        formdata_data.append('sensor_id', this.sensor_id);
        formdata_data.append('data_type', this.activeName + '_' + this.high_low);
        formdata_data.append('file_name', this.file_name);
        request({
          url: 'device/history_file_read/',
          method: 'post',
          data: formdata_data
        }).then(res => {
          console.log(res);
          this.data_list = res.data.data;
          // this.total = res.data.n_device;
        }).catch(err => {
          console.log(err);
        })
      },
      get_feature(){
        let formdata_device = new FormData();
        formdata_device.append('sensor_id', this.sensor_id);
        formdata_device.append('dt_end', this.dt_end);
        formdata_device.append('dt_start', this.dt_start);
        request({
          url: 'device/feature_file_read/',
          method: 'post',
          data: formdata_device
        }) .then(res => {
          // console.log(res);
          let data = JSON.parse(res.request.response).data;
          for (let key in data) {
            if (!data.hasOwnProperty(key)) {
              continue;
            }
            let item = {};
            item[key] = data[key];
            this.featureData_y.push(item);
          }
          this.featureData_y = data;
          // console.log(this.featureData_y);
        }).catch(err => {
          console.log(err);
        });
      },
      get_diagnosis(){
        let formdata_device = new FormData();
        formdata_device.append('sensor_id', this.sensor_id);
        formdata_device.append('dt_start', this.dt_start);
        formdata_device.append('dt_end', this.dt_end);
        request({
          url: 'device/diagnosis_file_read/',
          method: 'post',
          data: formdata_device
        }).then(res => {
          console.log(res);
          this.data_list = res.data.data[0];
          // this.total = res.data.n_device;
        }).catch(err => {
          console.log(err);
        })
      },
      //返回选择设备
      get_device_list() {
        this.$router.replace('history_detail_select');
      },
      //选项卡切换 调用接口
      handleClick() {
        if (this.activeName == 'feature' || this.activeName == 'diagnosis') {
          this.filelist_width = 0;
          this.visual_width = 24;
        } else {
          this.filelist_width = 6;
          this.visual_width = 18;
        }
      },
      //sensor_id 改变重新请求数据
      sensor_change() {
        this.get_filelist();
      },
      //文件列表下的日期发送请求
      date_change(dt_start, dt_end) {
        console.log(dt_start + dt_end);
        this.dt_start = dt_start;
        this.dt_end = dt_end;
        this.get_filelist();
      },
      //文件列表下的高频低频切换
      datatype_change(high_low) {
        this.high_low = high_low;
        if(this.dt_start == '' || this.dt_end == '')
          ;
        else
          this.get_filelist();
      },
      //文件列表下的查看文件
      data_switch(file_name) {
        this.file_name = file_name;
        this.get_datalist();
      },
      //诊断跟特征下的时间选择变化
      time_change(dt_start, dt_end) {
        this.dt_start = dt_start;
        this.dt_end = dt_end;
        console.log(dt_start, dt_end);
        if(this.activeName == 'feature')
          this.get_feature();
        else
          this.get_diagnosis();
      }
    },
    mounted() {
      this.getdata();
      if (this.device_id == undefined && this.device_name == undefined) {
        this.$alert('请选择设备后查看', '提示', {
          confirmButtonText: '确定',
        });
      };
      // this.get_filelist();
    },
    components: {
      file_list,
      wav,
      spectrum,
      feature,
      diagnosis
    }
  }
</script>

<style scoped>
  h4 {
    padding: 0;
    margin: 0;
    color: white;
    font-weight: lighter;
    position: relative;
    top: 6px;
    left: 12px;
  }

  .el-select {
    margin-top: 6px;
    margin-left: 30px;
  }

  .el-button {
    margin-right: 12px;
  }
</style>
