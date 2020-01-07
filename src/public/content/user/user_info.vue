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
    <el-row>
      <el-col :span="11" :offset="2"><p>工号：{{user_profile.employee_id}}</p><p>公司：{{user_profile.enterprise_name}} No.{{user_profile.enterprise_id}}</p><p>办公电话：{{user_profile.official_tel}}</p><p>职能描述：CTO</p></el-col>
      <el-col :span="11"><br/><br/><p>部门：{{user_profile.department}}</p><p>办公邮箱：{{user_profile.official_email}}</p></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><h3 style="text-align: center">账号设置</h3></el-col>
      <el-col :span="21" style="padding-top: 0.5%"><el-divider></el-divider></el-col>
      <el-col :span="1" style="text-align: left;padding-top: 1%"><el-link icon="el-icon-edit" @click="user_info_edit">编辑</el-link></el-col>
    </el-row>
    <el-row style="margin-bottom: 6%">
      <el-col :span="11" :offset="2">
        <el-row>
          <el-col :span="2">
            <i class="el-icon-mobile-phone" style="font-size: 60px;margin-top: 25%"></i>
          </el-col>
          <el-col :span="14"><p><strong>修改绑定手机号</strong></p><p>已绑定：{{user_profile.phone}}</p></el-col>
          <el-col :span="8"><el-button type="primary" style="margin-top: 10%" plain @click="user_info_edit">点击修改</el-button></el-col>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="2">
            <i class="el-icon-lock" style="font-size: 60px;margin-top: 25%"></i>
          </el-col>
          <el-col :span="14"><p><strong>修改密码</strong></p><p>建议定期修改密码，保障账号安全</p></el-col>
          <el-col :span="8"><el-button type="primary" style="margin-top: 10%" plain @click="show_changepsd_dialog = true">点击修改</el-button></el-col>
          <el-dialog
            :visible.sync="show_changepsd_dialog"
            title="修改密码"
            width="30%"
            :modal="false"
            :close-on-click-modal="false"
            :center="true"
          >
            <el-form>
              <el-form-item label="原始密码">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="show_changepsd_dialog = false">取消</el-button>
      </span>
          </el-dialog>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {request} from "network/request";

  export default {
    name: "user_info",
    data() {
      return {
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
          authority_level: 2,
          character: 1
        },
        show_changepsd_dialog: false,
      }

    },
    methods:{
      user_info_edit(){
        this.$router.replace('/homepage/user_info_edit')
      }
    },
    mounted(){
      request({
        url: 'user/profile/detail/',
        method: 'post'
      }).then(response => {
        this.user_profile = response.data.user_profile
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

</style>