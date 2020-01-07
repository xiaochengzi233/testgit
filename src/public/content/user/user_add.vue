<template>
  <el-card>
    <div slot="header">
    <span>新增用户</span>
  </div>
    <div>
      <el-form :model="form" status-icon :rules="rules" ref="form" label-position="right" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="el-icon-user" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" autocomplete="off"  prefix-icon="el-icon-edit" show-password></el-input>
        </el-form-item>
        <el-form-item prop="password_again" label="确认密码">
          <el-input type="password" v-model="form.password_again" placeholder="请再次输入密码" autocomplete="off"  prefix-icon="el-icon-edit" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.character" placeholder="请选择">
            <el-option
              v-for="item in character_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级">
          <el-select v-model="form.authority_level" placeholder="请选择">
            <el-option
              v-for="item in level_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同意协议">
          <el-checkbox v-model="form.agree_to_terms"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</el-card>
</template>

<script>
  import {request} from "network/request";

  export default {
    name: "user_add",
    data(){
      var check_username = (rule, value, callback) => {
        const reg = /^[_a-zA-Z0-9]+$/; /*字母、数字、下划线法*/
        console.log('用户名校验');
        if (!value) {
            callback(new Error('用户名不能为空'));
        }
        else if(!reg.test(value)){
            callback(new Error('用户名由数字以及下划线组成'));
        }
        else
        {
            this.check_username_available();
            if (!this.is_available) {
                callback(new Error('用户名已被占用'));
            }
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

      var check_password_again = (rule, value, callback) => {
        console.log('密码校验');
        if (!value) {
            callback(new Error('请再次输入密码'));
        }
        else if(value !== this.form.password){
            callback(new Error('两次输入的密码不一致'));
        }
        else{
            callback();
        }
      };
      return {
        is_available: false,
        form:{
            username: '',
            password: '',
            password_again: '',
            character: '',
            agree_to_terms: false,
            authority_level: ''
        },

        character_options: [{
          value: 1,
          label: '维修工人'
        }, {
          value: 2,
          label: '主管'
        }, {
          value: 3,
          label: '总经理'
        }],

        level_options: [{
          value: 2,
          label: '管理员'
        }, {
          value: 3,
          label: '普通用户'
        }],
        rules: {
          username: [
            { validator: check_username, trigger: 'blur' }
          ],
          password: [
            { validator: check_password, trigger: 'blur' }
          ],
          password_again: [
            { validator: check_password_again, trigger: 'blur' }
          ],

        }
      }
    },
    methods: {
      check_username_available(username) {
        let formdata_username_checker = new FormData();
        formdata_username_checker.append('username', username);
        request({
          url: 'user/manage/add/user_name_available_checker/',
          method: 'post',
          data: formdata_username_checker,
        }).then(response => {
          this.is_available = response.data.is_available;
        });
      },
      onLogin() {
        let formdata_user = new FormData();
        formdata_user.append('username', 'testl2');
        formdata_user.append('enterprise_id', '001');
        formdata_user.append('password', '123456');
        formdata_user.append('remember_me', true);
        request({
          url: 'user/login/',
          method: 'post',
          data: formdata_user,
        })
      },
      onSubmit(form) {
        this.onLogin();
        this.$refs[form].validate((valid) => {
          if (valid) {
            let formdata_adduser = new FormData();
            formdata_adduser.append('username', this.form.username);
            formdata_adduser.append('password', this.form.password);
            formdata_adduser.append('character', this.form.character);
            formdata_adduser.append('authority_level', this.form.authority_level);
            formdata_adduser.append('agree_to_terms', this.form.agree_to_terms);
            request({
              url: 'user/manage/add/add_user/',
              method: 'post',
              data: formdata_adduser,
            }).then(res => {
              console.log(res);
              this.$alert('创建成功', '提示', {
                confirmButtonText: '确定',
              });
            }).catch(err => {
                console.log(err);
              this.$alert('创建失败', '提示', {
                confirmButtonText: '确定',
              });
            });
          }
        })
      },
      cancel(){
        this.$router.replace('user_list');
      }
    }
  }
</script>

<style scoped>

</style>