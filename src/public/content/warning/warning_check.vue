<template>
  <div class="main-table">
    <div>

    </div>
    <!-- 要处理的告警设备信息 -->
    <div class="top-table">
      <div class="top-table-content">
        <el-row >
          <el-col :span="24"><h4 style="text-align: left;"> <i @click="gobackWarninglist" class="el-icon-back" style="cursor: pointer;"></i> 返回列表</h4></el-col>
        </el-row>

        <el-row class="divborder">
          <el-col :span="8">
            <h5>故障设备</h5>
          </el-col>
          <el-col :span="3">
            <h5>发现时间</h5>
          </el-col>
          <el-col :span="2">
            <h5>报警类型</h5>
          </el-col>
          <el-col :span="3">
            <h5>来源</h5>
          </el-col>
          <el-col :span="2">
            <h5>故障处理情况</h5>
          </el-col>
          <el-col :span="6">
            <h5>处理时间</h5>
          </el-col>
        </el-row>

        <div style="overflow: auto">
          <el-row class="divborder3">
            <el-col :span="8" class="divborder3_min2">
              <el-row style="height:100%">
                <el-col :span="8" class="item-image">
                  <el-image :src="$store.state.base_url+report_data.device_image" fit="contain" style="height: 60px;"></el-image>
                </el-col>
                <el-col :span="16" class="item-devicemesssage">
                  <div>
                    <div>
                      <span>{{report_data.device_name}}</span>&nbsp;
                      <span>{{report_data.device_id}}</span>
                      </div>
                    <div>{{report_data.device_location}}</div>
                    <div><span>健康指标：</span><span class="item-device-health">{{report_data.device_health}}</span></div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3" class="divborder3_min3">
              <div>{{report_data.report_datetime}}</div>
            </el-col>
            <el-col :span="2" class="divborder3_min4">
              <div>{{report_data.report_title}}</div>
            </el-col>
            <el-col :span="3" class="divborder3_min5">
              <span>{{report_data.device_id}}</span>
            </el-col>
            <el-col :span="2" class="divborder3_min6">
              <div>已处理</div>
            </el-col>
            <el-col :span="6" class="divborder3_min7">
              <p>--------- ---</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 提交的表单 -->
    <div class="bottom-table">
      <div class="bottom-table-content">
        <h4>处理信息</h4>
        <div class="bottom-table-content-form">
          <el-form  label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="处理人：" label-width="100px">
                   <el-input v-model="report_data.handle_person" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抄送：" label-width="100px">
                   <el-input v-model="handle_CC" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="处理方式：" label-width="100px">
                   <el-input v-model="report_data.handle_method" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式：" label-width="100px">
                   <el-input v-model="handle_situation" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>          
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述：" label-width="100px">
                <el-input v-model="report_data.handle_method" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align:center">
              <!--<el-input v-model="handle_method"></el-input>-->
              <!-- <el-form-item>
                <el-button @click="onSubmit" style="background-color: #4DA1FF;">发送</el-button>
                <el-button @click="delete_onsubmit" style="background-color: #4DA1FF;">取消</el-button>
              </el-form-item> -->
            </el-col>
          </el-row>
        </el-form>
        </div>
      </div>
    </div>
  
  </div>
  
</template>
<script>

import {request} from "network/request";
  export default {
    name: "warning_handle",
    data() {
      return {
        id:'',
        handle_person: '',
        handle_CC:'',
        handle_situation:'',
        handle_method: '',
        handle_description: '',
        report_data:'',
        base_url: "http://117.78.37.249:8001/",
      }
    },
    // 通过未处理告警列表传来的report_id来接收告警详情
    created() {
      this.id=this.$route.params.id;
      console.log(this.id);
      let formdata = new FormData();
      formdata.append('report_id', this.id);
      request({
        url: 'warning/detail/',
        method: 'post',
        data: formdata
      }).then(res => {
        this.report_data = res.data.warning_detail;
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    methods: {
      gobackWarninglist(){
        this.$router.replace('warning_list');
      },
      // onSubmit(){
      //   console.log("成功");
      // }
      delete_onsubmit(){
        this.$router.replace('warning_list');
      },
      onSubmit() {
        let form_warning = new FormData();
        form_warning.append('report_id',this.id);
        form_warning.append('handle_person',this.handle_person);
        form_warning.append('handle_method',this.handle_method);
        form_warning.append('handle_description',this.handle_description);
        request({
          url: 'warning/handle/',
          method: 'post',
          data: form_warning,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          console.log(res,this.aaaa);
          if(res.data.message=='Fail'){
              this.$alert('处理操作失败，请重新创建！', {
              confirmButtonText: '确定',
            });
          }else if(res.data.message=='Normal'){
              this.$router.replace('warning_processing')
          }
        }).catch(err => {                                                                                                                                                 
          console.log(err);
        })
      }
     }
  }
</script>

<style scoped>
.main-table{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bottom-table,.top-table{
    border: 1px solid #324156;
    background-color: #1B232F;
    color: #DBE2ED;
  }
  .bottom-table{
    flex: 1
  }
  .top-table{
    margin-bottom: 5px;
  }
  .top-table-content,.bottom-table-content{
    margin: 2%;
  }
  h5{
    font-weight: lighter;
    font-size: 15px;
  }
  /* 表单 */
  .bottom-table-content-form{
    /* border: 1px solid #fff; */
    width: 80%;
    margin: 0px auto;
  }
  .divborder{ 
    border:1px solid #50565E;
    font-size: 15px;
    text-align: center;
  }
  .divborder3{ 
    border:1px solid #50565E ;
    border-top :0px ;
    font-size: 15px;
    height: 100px;
  }
  .divborder3_min3,.divborder3_min4,.divborder3_min5,.divborder3_min6,.divborder3_min7{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .divborder3_min2 {
  height: 100%;
  }
  .item-image {
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-devicemesssage {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .divborder3_min4,.divborder3_min6{
    font-weight: bolder;
    color: green;
    font-size: 18px;
  }
  /* .divborder3_min6{
    font-weight: bolder;
    color: #06E753;
    font-size: 18px;
  } */
  .divborder3_min5{
    font-size: 18px;
  }
  .item-device-health{
    border: 1px solid #FA2044;
    background-color: #E72042;
    padding:1px 3px;
    border-radius: 3px ;
  }
</style>