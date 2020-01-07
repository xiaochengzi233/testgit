<!--homepage-topbar-->
<template>
  <div>
    <el-row class="topbar">
      <el-col :span="3">
        <el-image fit="contain" :src="logo"></el-image>
      </el-col>
      <el-col :span="4">
        <h4>工业设备云检测平台</h4>
      </el-col>
      <el-col :span="9" :offset="8">
        <p style="float:right" class="loginout" @click="loginout">
          <el-divider direction="vertical"></el-divider>退出
          <i class="el-icon-switch-button"></i>
        </p>
        <p style="float:right" class="change-password" @click="change_password">修改密码</p>
        <p prefix-icon="el-icon-user" style="float:right">
          <i class="el-icon-user"></i>
          您好！{{ username }}
          <el-divider direction="vertical"></el-divider>
        </p>
      </el-col>
    </el-row>
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
        <el-button type="primary" @click="confirm_changepsd">确定</el-button>
        <el-button @click="cancel_changepsd">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import logo from "assets/img/logo-lzkj-x.png";
  export default {
    name: "topbar",
    // props:{
    //   username: '',
    //   // UserMessage:''
    // },
    data() {
      return {
        username: "",
        logo: logo,
        show_changepsd_dialog: false
      };
    },
    mounted() {
      if (sessionStorage.getItem("USER_MESSAGE")) {
        let UserMessage = JSON.parse(sessionStorage.getItem("USER_MESSAGE"));
        this.username = UserMessage.username;
      } else {
        this.$router.replace("/login");
      }
    },
    created() {
      console.log("topbar创建成功");
    },
    methods: {
      loginout() {
        sessionStorage.removeItem("USER_MESSAGE");
        this.$router.replace("/login");
      },
      change_password() {
        this.show_changepsd_dialog = true;
        // console.log(document.querySelector('.v-modal'))
        // .classList.add('zzz');
      },
      confirm_changepsd() {
        this.show_changepsd_dialog = false;
      },
      cancel_changepsd() {
        this.show_changepsd_dialog = false;
      }
    }
  };
</script>

<style scoped>
  .topbar {
    padding: 0;
    margin: 0;
    min-height: 5vh;
  }
  h4,
  p {
    margin: 0;
    padding: 0;
    vertical-align: center;
    height: 5vh;
    line-height: 5vh;
    color: white;
  }
  .loginout {
    cursor: pointer;
  }
  .change-password {
    cursor: pointer;
  }
  .zzz {
    z-index: 0;
  }
</style>