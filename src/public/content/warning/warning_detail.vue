<template>
  <div style="padding: 1%" class="el-card">
    <el-row>
      <h3 style="float:left;">告警详情</h3>
      <el-button class="button_back" type="button" icon="el-icon-back" @click="back_warninglist">返回告警列表</el-button>
    </el-row>
    <!-- <h3 style="margin-bottom: 3%;">告警详情</h3> -->
    <el-divider content-position="center"><h3>设备信息</h3></el-divider>
    <el-row>
      <el-col :span="12" style="text-align: center ; margin-top: 1%">
        <el-image style="width:150px;height:150px;" :src="base_url + report.device_image" fit="fill"></el-image>
        <el-col style="text-align: center">{{ report.device_name }}</el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="6" style="padding: 1%" ><span>设备名</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{ report.device_name }}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>设备型号</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{ report.device_id }}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>地理位置</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{ report.device_location}}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>设备状态</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span style="color:red">{{ report.device_health }}</span></el-col>
      </el-col>
    </el-row>
   

    <el-divider content-position="center"><h3>报警信息</h3></el-divider>
    <el-row>
      <el-col :span="12">
        <el-col :span="6" style="padding: 1%" ><span>报警编号</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{report.report_id}}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>报警类型</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span style="color:red">{{ report.report_title }}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>报警时间</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{ report.report_datetime}}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>报警等级</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span style="color:red">{{ report.report_level}}</span></el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="6" style="padding: 1%"><span style="font-size:1.2rem;font-weight:bold">故障说明</span></el-col>

        <el-input
          style="margin-top:2%"
          type="textarea"
          :rows="3"
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="report.report_detail"
          v-model="textarea2">
        </el-input>
      </el-col>
    </el-row>

    <el-divider content-position="center"><h3>处理详情</h3></el-divider>
    <el-row>
      <el-col :span="12">
        <el-col :span="6" style="padding: 1%" ><span>处理状态</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span style="color: forestgreen">{{ report.is_handled}}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>处理人员</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{report.handle_person }}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>处理时间</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span>{{ report.handle_datetime}}</span></el-col>
        <el-col :span="6" style="padding: 1%;"><span>处理方式</span></el-col>
        <el-col :span="18" style="padding: 1%;"><span style="color:red">{{report.handle_method }}</span></el-col>
      </el-col>
      <el-col :span="12"  style="margin-top: 1%">
        <el-col :span="6" style="padding: 1%;">
          <span style="font-size:1.2rem;font-weight:bold">处理说明</span></el-col>
        <el-input
          style="margin-top:2%"
          type="textarea"
          :rows="3"
          :autosize="{ minRows: 2, maxRows: 5}"
          :placeholder="report.handle_description"
          v-model="textarea2">
        </el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {request} from "network/request";

  export default {
    name: "warning_detail",
    data(){
      return {
        base_url: 'http://117.78.37.249:8001/',
        report_id: '',
        report: [],
        textarea2:''
      }
    },
    methods: {
      back_warninglist(){
        this.$router.replace('warning_list');
      }
    },

    mounted(){
      this.report_id=this.$route.params.id;
      let formdata = new FormData();
      formdata.append('report_id', this.report_id);
      request({
        url: 'warning/detail/',
        method: 'post',
        data: formdata
      }).then(res => {
        this.report = res.data.warning_detail;
        console.log(res.data)
        console.log(typeof(this.report));
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  .button_back{
    float: right;
    margin-top: 1%;
  }
  .el-card{
    height: 100vh;
  }
</style>
