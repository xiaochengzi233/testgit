<template>
  <div id="main">
    <div class="el-card">
      <h4 style="margin-left: 1% ; margin-top: 3%">新增传感器</h4>
      <el-row style="margin: 1%">
        <el-col :span="8">
          <h4 style="margin-top: 3%">请输入传感器显示编号 </h4>
        </el-col>
        <el-col :span="10">
          <el-input v-model="sensor_id" placeholder="请输入传感器显示编号"></el-input>
        </el-col>
        <el-col :span="6"><h5 style="color: red ; margin-left: 5% ; margin-top: 5%">* 此项必填</h5></el-col>
      </el-row>
      <el-row style="margin: 1%">
        <el-col :span="8">
          <h4 style="margin-top: 3%">请输入传感器原厂编号 </h4>
        </el-col>
        <el-col :span="10">
          <el-input v-model="manufac_id" placeholder="请输入传感器原厂编号"></el-input>
        </el-col>
        <el-col :span="6"><h5 style="color: red ; margin-left: 5% ; margin-top: 5%">* 此项必填</h5></el-col>
      </el-row>
      <el-row style="margin: 1%">
        <el-col :span="8">
          <h4 style="margin-top: 3%">请输入传感器生产商 </h4>
        </el-col>
        <el-col :span="10">
          <el-input v-model="manufacturer" placeholder="请输入传感器生产商"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin: 1%">
        <el-col :span="8">
          <h4 style="margin-top: 3%">请选择传感器状态 </h4>
        </el-col>
        <el-col :span="10">
          <template>
            <el-select v-model="sensor_status" placeholder="请选择" name="sensorType" @change="choose">
              <el-option
                v-for="item in sensor_status_type"
                :key="item.sensor_status"
                :label="item.label"
                :value="item.sensor_status">
              </el-option>
            </el-select>
          </template>
        </el-col>
      </el-row>
      <div v-if="is_show">
        <el-row style="margin-left: 1% ; margin-top: 3%">
          <el-col :span="8"><h4 style="margin-top: 3%">请选择公司和设备</h4></el-col>
          <el-col :span="10">
            <el-cascader
              placeholder="可按关键字搜索"
              :options="options"
              filterable
              clearable></el-cascader>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center ; margin-top: 2% ; margin-bottom: 3%">
        <el-button
          type="primary"
          @click="addDialogVisible = true">确 认</el-button>
        <el-button
          type="primary"
          @click="backPrev">取 消</el-button>
      </div>
      <el-dialog
        center
        title="是否增加该传感器"
        :visible.sync="addDialogVisible"
        width="300px"
        style="">
        <el-input
          v-model="control_password"
          placeholder="请输入操作密码"
          show-password
          style="margin-bottom: 5%"></el-input>
        <div style="text-align: center">
          <el-button
            type="primary"
            size="mini"
            @click="addConfirm">确 认</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="addDialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../network/request";

  export default {
    name: "sensor_add",
    data() {
      return {
        sensor_id: '',
        manufac_id: '',
        manufacturer: '',
        sensor_status_type: [{
          sensor_status: 'on',
          label: 'ON'
        }, {
          sensor_status: 'off',
          label: 'OFF'
        }],
        sensor_status: '',
        options: [{
          value: '选项1',
          label: '联智科技',
          children: [{
            value: '1',
            label: '联智1号电机'
          }, {
            value: '2',
            label: '联智2号电机'
          }, {
            value: '3',
            label: '联智3号电机'
          }, {
            value: '4',
            label: '联智4号电机'
          }]
        }, {
          value: '选项2',
          label: '连智科技',
          children:[{
            value: '5',
            label: '连智1号电机'
          }, {
            value: '6',
            label: '连智2号电机'
          }, {
            value: '7',
            label: '连智3号电机'
          }, {
            value: '8',
            label: '连智4号电机'
          }]
        }, {
          value: '选项3',
          label: '联志科技',
          children:[{
            value: '9',
            label: '联志1号电机'
          }, {
            value: '10',
            label: '联志2号电机'
          }, {
            value: '11',
            label: '联志3号电机'
          }, {
            value: '12',
            label: '联志4号电机'
          }]
        }, {
          value: '选项4',
          label: '连志科技',
          children:[{
            value: '13',
            label: '连志1号电机'
          }, {
            value: '14',
            label: '连志2号电机'
          }, {
            value: '15',
            label: '连志3号电机'
          }, {
            value: '16',
            label: '连志4号电机'
          }]
        }],
        is_show: false,
        device_id: 'MOTOR0001',
        device_type: '',
        control_password: '',
        addDialogVisible: false,
      };
    },
    methods: {
      choose() {
        if(this.sensor_status == 'on'){
          this.is_show = true;
        }else{
          this.is_show = false;
        }
      },
      // 取消键后返回上一页
      backPrev() {
        // this.addDialogVisible = false;
        this.$router.replace('sensor_list');
      },
      // 增加传感器的验证
      addConfirm() {
        let formdata = new FormData();
        formdata.append('sensor_id ', this.sensor_id);
        formdata.append('manufac_id', this.manufac_id);
        formdata.append('manufacturer', this.manufacturer);
        formdata.append('sensor_status', this.sensor_status);
        console.log(this.sensor_status);
        formdata.append('device_id', this.device_id);
        formdata.append('device_type', this.device_type);
        formdata.append('control_password', this.control_password);
        request({
          url: 'sensor/addsensor/',
          method: 'post',
          data: formdata,
        }).then(res =>{
          console.log(res);
          if(res.data.message == 'added successfully'){
            this.$alert('传感器添加成功','提示',{
              confirmButtonText: '确定',
            });
            this.$router.replace('sensor_list');
          }
          else{
            this.$alert('传感器添加失败','提示',{
              confirmButtonText: '确定',
            })
          }
        }).catch(err =>{
          this.$alert('网络异常','提示',{
            confirmButtonText: '确定',
          });
          console.log(err);
        })
      },
    }
  };
</script>

<style scoped>
  /* 模式框 */
  .el-card{
    padding-left: 2%;
    width: 800px;
    margin: 0 auto;
    margin-top: 10%;
  }
</style>