<!--用户详细信息-->
<template>
  <div class="el-card" style="padding-left: 1%; border-width: 0">
    <el-row>
      <el-col :span="3" :offset="2">
        <el-row class="user_name">
          <el-col :span="11"><h2>{{user_profile.last_name}} {{user_profile.first_name}}</h2></el-col>
          <el-col :span="13" style="margin-top:13%"><el-link icon="el-icon-edit" @click="user_info_edit">修改昵称</el-link></el-col>
        </el-row>
        <div>用户ID：{{user_profile.username}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><h3 style="text-align: center">权限编辑</h3></el-col>
      <el-col :span="21" style="padding-top: 0.5%"><el-divider></el-divider></el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-form ref="authority_detail" :model="authority_detail" label-width="150px">
          <el-col :span="6">
            <el-form-item label="读取设备参数">
              <el-switch v-model="authority_detail.read_device_parameters"></el-switch>
            </el-form-item>
            <el-form-item label="写入设备参数">
              <el-switch v-model="authority_detail.write_device_parameters"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="查看诊断数据">
              <el-switch v-model="authority_detail.read_diagnosis_data"></el-switch>
            </el-form-item>
            <el-form-item label="写入诊断数据">
              <el-switch v-model="authority_detail.write_diagnosis_data"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="查看历史诊断数据">
              <el-switch v-model="authority_detail.read_history_diagnosis_data"></el-switch>
            </el-form-item>
            <el-form-item label="写入历史诊断数据">
              <el-switch v-model="authority_detail.write_history_diagnosis_data"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="查看原始数据">
              <el-switch v-model="authority_detail.read_raw_data"></el-switch>
            </el-form-item>
            <el-form-item label="写入原始数据">
              <el-switch v-model="authority_detail.write_raw_data"></el-switch>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>


      <el-col :span="22" :offset="2">
        <p v-if="user_profile.authority_level==1">权限等级：超级管理员</p>
        <p v-if="user_profile.authority_level==2">权限等级：管理员</p>
        <p v-if="user_profile.authority_level>=3">权限等级：普通用户</p>
        <h3>已有权限：</h3>
        <div style="width: 80%;float: left;">
          <el-tag class="authority-detail" type="success" v-if="authority_detail.read_device_parameters"> 查看设备参数 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.write_device_parameters"> 写入设备参数 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.read_diagnosis_data"> 查看诊断数据 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.write_diagnosis_data"> 写入诊断数据 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.read_history_diagnosis_data"> 查看历史诊断数据 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.write_history_diagnosis_data"> 写入历史诊断数据 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.read_raw_data"> 查看原始数据 </el-tag>
          <el-tag class="authority-detail" type="success" v-if="authority_detail.write_raw_data"> 写入原始数据 </el-tag>
        </div>
        <div style="width: 20%;float: right;">
          <el-button type="success" plain @click="authority_submit">权限提交</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><h3 style="text-align: center">基础信息</h3></el-col>
      <el-col :span="21" style="padding-top: 0.5%"><el-divider></el-divider></el-col>
      <el-col :span="1" style="padding-top: 1%"><el-link icon="el-icon-edit" @click="user_info_edit">编辑</el-link></el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="2"><p>姓名：{{user_profile.last_name}} {{user_profile.first_name}}</p><p>性别：{{user_profile.gender}}</p><p>手机号：{{user_profile.phone}}</p></el-col>
      <el-col :span="11"><br/><br/><p>出生日期：{{user_profile.birth_date}}</p><p>个人邮箱：{{user_profile.personal_email}}</p></el-col>
    </el-row>

    <el-row>
      <el-col :span="2"><h3 style="text-align: center">员工信息</h3></el-col>
      <el-col :span="21" style="padding-top: 0.5%"><el-divider></el-divider></el-col>
      <el-col :span="1" style="text-align: left;padding-top: 1%"><el-link icon="el-icon-edit" @click="user_info_edit">编辑</el-link></el-col>
    </el-row>
    <el-row style="margin-bottom: 6%;">
      <el-col :span="11" :offset="2"><p>工号：{{user_profile.employee_id}}</p><p>公司：{{user_profile.enterprise_name}} No.{{user_profile.enterprise_id}}</p><p>办公电话：{{user_profile.official_tel}}</p><p>职能描述：CTO</p></el-col>
      <el-col :span="11"><br/><br/><p>部门：{{user_profile.department}}</p><p>办公邮箱：{{user_profile.official_email}}</p></el-col>
    </el-row>
  </div>
</template>
<script>
  import {request} from "network/request";
  import qs from 'qs'
  export default {
    name: "user_info",
    data() {
      return {
        authority_level_name: '',
        user_profile: {
          username: 'guest',
          first_name: '游客',
          last_name: '',
          gender: '男',
          birth_date: '2000-1-1',
          phone: '13000001111',
          personal_email: 'UAI@outlook.com',
          enterprise_id: '000',
          enterprise_name: '联智科技',
          department: '技术部',
          employee_id: '000',
          official_email: 'UAI@outlook.com',
          official_tel: '13000001111',
          description: '未输入',
          authority_level: 3,
          character: 1,
        },
        authority_detail: {
          read_device_parameters: true,
          read_diagnosis_data: true,
          read_history_diagnosis_data: false,
          read_raw_data: false,
          write_device_parameters: false,
          write_diagnosis_data: false,
          write_history_diagnosis_data: false,
          write_raw_data: false
        }
      }
    },
    methods:{
      user_info_edit(){
        this.$router.replace('/homepage/user_info_edit');
      },
      authority_submit(){
        console.log('权限提交');
        let formdata = this.authority_detail;
        let UserMessage=JSON.parse(sessionStorage.getItem('USER_MESSAGE'));
        let full_username = UserMessage.enterprise_id + '_' + UserMessage.username;
        formdata['user'] = full_username;
        console.log(formdata);
        request({
          url: 'user/authority/edit/',
          method: 'post',
          data: qs.stringify(formdata)
        }).then(res => {
          console.log(res);
          this.$alert('权限修改成功', '提示', {
            confirmButtonText: '确定',
          });
        }).catch(res => {
          this.$alert('权限修改失败，请与管理员联系', '提示', {
            confirmButtonText: '确定',
          });
        })
      }
    },
    mounted(){
      request({
        url: 'user/profile/detail/',
        method: 'post'
      }).then(response => {
        this.user_profile = response.data.user_profile;
        // console.log(this.user_profile);
        this.authority_detail = response.data.authority_detail;
        console.log('从服务器请求：');
        console.log(this.authority_detail);
      })
    }

  }
</script>
<style scoped>
  .avatar{
    alignment: center;
    margin: 20%

  }
  .user_name{
    margin-top: 20%;
  }
  .authority-detail{
    margin-right: 10px;
  }

</style>