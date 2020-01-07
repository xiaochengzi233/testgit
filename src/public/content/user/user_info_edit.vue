<template>
  <el-card shadow="hover">
    <div slot="header">
      用户信息编辑
    </div>
    <el-form ref="user_profile" :rules="user_profile_rule" :model="user_profile" label-width="80px" class="user_profile_form">
      <el-form-item label="姓氏" prop="last_name">
        <el-input v-model="user_profile.last_name"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="first_name">
        <el-input v-model="user_profile.first_name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="user_profile.gender" placeholder="您的性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth_date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="出生日期" v-model="user_profile.birth_date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="user_profile.phone"></el-input>
      </el-form-item>
      <el-form-item label="个人邮箱" prop="personal_email">
        <el-input v-model="user_profile.personal_email"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="enterprise_name">
        <el-input v-model="user_profile.enterprise_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="user_profile.department"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="employee_id">
        <el-input v-model="user_profile.employee_id"></el-input>
      </el-form-item>
      <el-form-item label="工作邮箱" prop="official_email">
        <el-input v-model="user_profile.official_email"></el-input>
      </el-form-item>
      <el-form-item label="工作电话" prop="official_tel">
        <el-input v-model="user_profile.official_tel"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="user_profile.description" type="textarea" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="character">
        <el-select v-model="user_profile.character" placeholder="请选择">
          <el-option
            v-for="item in character_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('user_profile')">提交修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {request} from "network/request";

  export default {
    name: "user_info_edit",
    data () {
      return {
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
        user_profile_rule:{
          first_name: { required: true, message: '该字段必填', trigger: 'blur' },
          last_name: { required: true, message: '该字段必填', trigger: 'blur' },
          gender: { required: true, message: '该字段必填', trigger: 'blur' },
          birth_date: { required: true, message: '该字段必填', trigger: 'blur' },
          phone: { required: true, message: '该字段必填', trigger: 'blur' },
          personal_email: { required: true, message: '该字段必填', trigger: 'blur' },
          department: { required: true, message: '该字段必填', trigger: 'blur' },
          employee_id: { required: true, message: '该字段必填', trigger: 'blur' },
          official_email: { required: true, message: '该字段必填', trigger: 'blur' },
          official_tel: { required: true, message: '该字段必填', trigger: 'blur' },
          description: { required: true, message: '该字段必填', trigger: 'blur' },
          character: { required: true, message: '该字段必填', trigger: 'blur' },
        }
      }
    },
    methods:{
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let fd = new FormData();
            fd.append('username', this.user_profile.username);
            fd.append('first_name', this.user_profile.first_name);
            fd.append('last_name', this.user_profile.last_name);
            fd.append('gender', this.user_profile.gender);
            fd.append('birth_date', this.user_profile.birth_date);
            fd.append('phone', this.user_profile.phone);
            fd.append('personal_email', this.user_profile.personal_email);
            fd.append('department', this.user_profile.department);
            fd.append('employee_id', this.user_profile.employee_id);
            fd.append('official_email', this.user_profile.official_email);
            fd.append('official_tel', this.user_profile.official_tel);
            fd.append('description', this.user_profile.description);
            fd.append('character', this.user_profile.character);
            request({
              url: 'user/profile/edit/',
              method: 'post',
              data: fd
            }).then(response => {
              console.log(response);
            })
          }
        })
      },
      cancel(){
        this.$router.replace('user_info');
      }
    },
    mounted(){
      request({
        url: 'user/profile/detail/',
        method: 'post'
      }).then(response => {
        this.user_profile = response.data.user_profile;
      })
    }

  }
</script>

<style scoped>
  .user_profile_form{
    padding-left: 10%;
    padding-right: 10%;
  }

</style>