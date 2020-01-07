<template>
  <div>
    <!--warningtablecard-->
    <div class="el-card-all">
      <div class="table">
        <el-row>
          <el-col :span="24">
            <h3 style="text-align: left;">处理中列表</h3>
          </el-col>
        </el-row>
        <el-row class="divborder">
          <el-col :span="2">
            <h5>编号</h5>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="2">
            <h5>处理时间</h5>
          </el-col>
          <el-col :span="4">
            <h5>操作</h5>
          </el-col>
        </el-row>
        <div class="table-body">
          <el-row class="divborder3" v-for="(item,index) of warning_list" :key="index">
            <el-col :span="2" class="divborder3_min1">
              <p>{{item.report_id}}</p>
            </el-col>
            <el-col :span="6" class="divborder3_min2">
              <el-row style="height:100%">
                <el-col :span="8" class="item-image">
                  <el-image :src="$store.state.base_url+item.device_image" fit="contain" style="height: 60px;"></el-image>
                </el-col>
                <el-col :span="16" class="item-devicemesssage">
                  <div>
                    <div>
                      <span>{{item.device_name}}</span>&nbsp;
                      <span>{{item.device_id}}</span>
                      </div>
                    <div>{{item.device_location}}</div>
                    <div><span>健康指标：</span><span class="item-device-health">{{item.device_health}}</span></div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3" class="divborder3_min3">
              <div>{{item.report_datetime}}</div>
            </el-col>
            <el-col :span="2" class="divborder3_min4">
              <div>{{item.report_title}}</div>
            </el-col>
            <el-col :span="3" class="divborder3_min5">
              <span>{{item.device_id}}</span>
            </el-col>
            <el-col :span="2" class="divborder3_min6">
              <div>处理中</div>
            </el-col>
            <el-col :span="2" class="divborder3_min7">
              <p>{{ item.handle_datetime }}</p>
            </el-col>
            <el-col :span="4" class="divborder3_min8">
              <el-row style="line-height:27px;width:100%">
                <el-col :span="12" @click.native="confirm(item.report_id)">
                  确认完成
                </el-col>
                <el-col :span="12" @click.native="warning_detail(item.report_id)">
                  查看
                </el-col>
              </el-row>
              <!-- <h4 style="cursor: pointer" @click="warning_detail(item.report_id)">查看详情</h4> -->
              <!-- <h4 style="cursor: pointer" @click="warning_handle(item.report_id)">点击处理</h4> -->
            </el-col>
          </el-row>
          <div class="bottom_pagenav">
            <pagenav
              class="pagenavs"
              :total="total"
              style="text-align: center"
              @page_change="page_change"
            ></pagenav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "network/request";
import pagenav from "public/common/pagenav";

export default {
  name: "warning_list",
  data() {
    return {
      warning_list: [],
      warningList: [],
      total: 0,
      page: 1,
      input: "",
      base_url: "http://117.78.37.249:8001/",
      options_period: [
        {
          value_period: 0,
          label: "全部"
        },
        {
          value_period: 1,
          label: "本日"
        },
        {
          value_period: 2,
          label: "本月"
        },
        {
          value_period: 3,
          label: "本年"
        }
      ],
      value_period: "",
      multipleSelection: []
    };
  },
  methods: {
    // warning_detail(){
    //   this.$router.replace({name:'warning_detail'});
    // },
    get_warning_list(){
      let formdata = new FormData();
      formdata.append("is_handled", "2");
      formdata.append("report_level", "-1");
      formdata.append("enterprise_id", "");
      formdata.append("paging", this.page);
      request({
        url: "warning/index/",
        method: "post",
        data: formdata
      })
      .then(res => {
        this.warning_list =res.data.warning_list;
        this.total = this.warning_list.length;
      })
      .catch(err => {
        console.log(err);
      });
    },
    page_change(page) {
      this.page = page;
      this.get_warning_list();
    },
    confirm(report_id){
      console.log('我是确认完成');
      this.$confirm('该条处理信息即将确认完成, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let formdata = new FormData();
        formdata.append('report_id', report_id);
        request({
          url: "warning/handled/",
          method: "post",
          data: formdata
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
        this.get_warning_list()
      }).catch(() => {
      });
    },
    warning_detail(id){
      this.$router.replace({
        name: "warning_check",
        params: { id: id }
      });
      console.log(id);
    }
  },
  created() {
    this.get_warning_list();
  },
  // 该组件是分页导航
  components: {
    pagenav
  }
};
</script>
<style scoped>
  .el-card-all{
    background-color: #1B232F;
    color: #DBE2ED;
    height: 100vh;
  }
  h5 {
    font-weight: lighter;
    font-size: 15px;
  }
  .table{
      margin-right:2%;margin-left:2%;
    display: flex;
    flex-direction: column;
    height: 85%;
    }
  .table-body{
  overflow-y: hidden; flex:1;border: 1px solid #50565e;border-top:none
    }
  .divborder {
    border: 1px solid #50565e;
    font-size: 15px;
    text-align: center;
  }
.divborder3 {
  border: 1px solid #50565e;
  border-top: 0px;
  font-size: 15px;
  height: 100px;
}
.divborder3_min1,
.divborder3_min3,
.divborder3_min4,
.divborder3_min5,
.divborder3_min6,
.divborder3_min7,
.divborder3_min8 {
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
}
.item-devicemesssage {
  height: 100%;
  display: flex;
  align-items: center;
}
.divborder3_min4 {
  font-weight: bolder;
  color: #ec2042;
  font-size: 17px;
}
.divborder3_min6{
  font-weight: bolder;
  color: #FF9E2F;
  font-size: 17px;
}
.divborder3_min5 {
  font-size: 16px;
  font-weight: 600;
}
.divborder3_min8 .el-col:first-child {
  color: #0de6ff;
  font-size: 17px;
  font-weight: bolder;
  cursor: pointer;
}
.divborder3_min8 .el-col:last-child {
  text-decoration: underline;
  cursor: pointer;
}
.item-device-health{
  border: 1px solid #FA2044;
    background-color: #E72042;
    padding:1px 3px;
    border-radius: 3px ;
}
.bottom_pagenav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom_pagenav > .pagenavs {
  position: fixed;
  bottom: 2%;
}
</style>