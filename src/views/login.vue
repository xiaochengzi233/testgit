<template>
  <div class="login" style="100%">
    <div class="login-form">
      <div class="logo-wrap">
        <el-image style="width: 200px; height: 142px;margin-top:8px" :src="logo"></el-image>
      </div>
      <!--<p class="p1">设备监控系统</p>-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="enterpriseId">
          <el-input v-model="ruleForm.enterpriseId" placeholder="请输入企业编号" autocomplete="on" prefix-icon="el-icon-tickets"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"  prefix-icon="el-icon-edit" show-password></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记住我">
              <el-checkbox v-model="rememberme" style="float: left"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-link class="el-icon-lock" style="float: right;margin-top: 14px">忘记密码?</el-link>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="login('ruleForm')" style="width: 100%;margin-bottom: 20px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {request} from "network/request";
  import logo from "assets/img/logo-icon-lzkj.png"

  export default {
    name: "login",
    data() {
      var check_username = (rule, value, callback) => {
        const reg = /^[_a-zA-Z0-9]+$/; /*字母、数字、下划线法*/
        if (!value) {
          callback(new Error('用户名不能为空'));
        }
        else if(!reg.test(value)){
          callback(new Error('仅由英文字母，数字以及下划线组成'));
        }
        else
        {
          // .....
          callback();
        }
      };
      var check_password = (rule, value, callback) => {
        console.log('密码校验');
        if (!value) {
          callback(new Error('请输入密码'));
        }
        else if(value.length < 6){
          callback(new Error('密码不少于6位'));
        }
        else{
          callback();
        }
      };
      var check_enterpriseid = (rule, value, callback) => {
        const reg = /^[0-9]{3}$/; /*三位数字*/
        if (value === '') {
          callback(new Error('企业编号不能空'));
        }
        else if(value.length != 3 || !reg.test(value)){
          callback(new Error('企业编号为三位的数字'));
        }
        else{
          // ...
          callback();
        }
      };
      return {
        logo: logo,
        rememberme: false,
        ruleForm: {
          username: '',
          password: '',
          enterpriseId: '',
        },
        rules: {
          username: [
            { validator: check_username, trigger: 'blur' }
          ],
          password: [
            { validator: check_password, trigger: 'blur' }
          ],
          enterpriseId: [
            { validator: check_enterpriseid, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          // 输入合法发送登录请求
          if (valid) {
            let formdata_user = new FormData();
            formdata_user.append('username', this.ruleForm.username);
            formdata_user.append('enterprise_id', this.ruleForm.enterpriseId);
            formdata_user.append('password', this.ruleForm.password);
            formdata_user.append('remember_me', this.rememberme);
            console.log(this.rememberme);
            request({
              url: 'user/login/',
              method: 'post',
              data: formdata_user
            }).then(res => {
              if(res.data.message == 'Normal')
              {
                this.$router.push('/homepage');
                let user={
                  'username':this.ruleForm.username,
                  'enterprise_id':this.ruleForm.enterpriseId,
                  'password':this.ruleForm.password,
                  'remember_me':this.rememberme
                }
                sessionStorage.setItem('USER_MESSAGE',JSON.stringify(user));
              }
              else
              {
                this.$alert('登录失败，请检查用户信息', '提示', {
                  confirmButtonText: '确定',
                });
              }

            }).catch(err => {
              this.$alert('请检查网络设置', '提示', {
                confirmButtonText: '确定',
              });
              console.log(err);
            })
          } else {
            ;
          }
          // this.$router.replace('/homepage');
        });
      }
    }
  }
</script>

<style scoped>
  .login{
    width:100%;
    height: 100%;
    padding:0px;
    margin:0px;
    position:absolute;
    top:0px;
    left:0px;
    border:hidden;
    background: url(../assets/img/background.jpg);
    background-size:cover;
  }
  .login-form {
    margin: 0 auto;
    margin-top: 10%;
    text-align: center;
    width: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: white;
    opacity: 0.7;
  }
  .logo-wrap {
    width: 200px;
    margin-left: 100px;
  }
  .el-form {
    margin: 0 20px;
  }
  .p1 {
    font-size: 20px;
    font-weight: bold;;
    text-align: center;
  }
  /*.wrap {*/
  /*min-height: 100vh;*/
  /*background: url(../assets/img/logo-login-bg.jpg) no-repeat center;*/
  /*overflow: hidden;*/
  /*}*/
  /*.content {*/
  /*width: 400px;*/
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  /*background-color: white;*/
  /*}*/
  /*.login {*/
  /*margin-top: 10%;*/
  /*!*background-color: red;*!*/
  /*}*/
  /*.el-input {*/
  /*width: 350px;*/
  /*}*/
</style>