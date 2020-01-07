<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <div class="el-card" style="padding-left: 2% ; width: 800px ; margin: 0 auto ; margin-top: 2%" v-if="level_1">
      <h3 style="margin-left: 1% ; margin-top: 3% ; text-align: center">设备添加</h3>
      <div style="margin-top: 5%">
        <el-row style="margin-bottom: 3%">
            <el-col :span="6" style="text-align: right ; padding-right: 5%">
                <h4 style="margin-top: 4%">设备编号：</h4>
            </el-col>
            <el-col :span="15">
                <el-input v-model="input_id" placeholder="请输入设备编号"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 3%">
          <el-col :span="6" style="text-align: right ; padding-right: 5%">
            <h4 style="margin-top: 4%">设备名称：</h4>
          </el-col>
          <el-col :span="15">
            <el-input v-model="input_name" placeholder="请输入设备名称"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 3%">
          <el-col :span="6" style="text-align: right ; padding-right: 5%">
            <h4 style="margin-top: 4%">设备位置：</h4>
          </el-col>
          <el-col :span="15">
            <el-input v-model="input_location" placeholder="请输入设备位置"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 3%">
          <el-col :span="6" style="text-align: right ; padding-right: 5%">
            <h4 style="margin-top: 4%">企业编号：</h4>
          </el-col>
          <el-col :span="15">
            <el-input v-model="input_enterprise" placeholder="请输入企业编号"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 3%">
          <el-col :span="6" style="text-align: right ; padding-right: 5%">
            <h4 style="margin-top: 4%">设备类型：</h4>
          </el-col>
          <el-col :span="15">
            <el-select v-model="value_type" placeholder="请选择设备类型">
              <el-option
                v-for="item in options_type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 5%" >
        <el-col :span="10" :offset="7">
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" @click="back" plain>返回</el-button> </el-col>
          <el-col :span="12" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="next_step">下一步</el-button> </el-col>
        </el-col>
      </div>
    </div>
      <div class="el-card" style="padding-left: 2% ; width:900px ; margin: 0 auto ; margin-top: 2%" v-if="level_2_1">
        <h3 style="margin-left: 1% ; margin-top: 3% ; text-align: center">电机参数</h3>
          <div style="margin-top: 5%">
            <el-row>
              <el-col :span="5" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">设备种类：</h4>
              </el-col>
              <el-col :span="5">
                <h4 style="margin-top: 3%">电机</h4>
              </el-col>
              <el-col :span="5" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">电机种类：</h4>
              </el-col>
              <el-col :span="6">
                <el-input v-model="input_motor_type" placeholder="请输入电机种类"></el-input>
              </el-col>
            </el-row>
              <el-divider></el-divider>
              <el-row>
                    <el-col :span="5" style="text-align: right ; padding-right: 3%">
                        <h4 style="margin-top: 4%">生产日期：</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="input_manufac_date" placeholder="例：1900-01-01"></el-input>
                    </el-col>
                    <el-col :span="4" style="text-align: right ; padding-right: 3%">
                        <h4 style="margin-top: 4%">安装日期：</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="input_deploy_date" placeholder="例：1900-01-01"></el-input>
                    </el-col>
                </el-row>
              <el-divider></el-divider>
            <el-row style="margin-bottom: 1%">
              <el-col :span="7" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">额定电压：</h4>
              </el-col>
              <el-col :span="4">
                <el-input v-model="input_rated_voltage"><h4 style="margin-top: 12px" slot="suffix">kV</h4></el-input>
              </el-col>
              <el-col :span="6" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">电机容量：</h4>
              </el-col>
              <el-col :span="4">
                <el-input v-model="input_capacity"><h4 style="margin-top: 12px" slot="suffix">MVA</h4></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 1%">
              <el-col :span="7" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">额定电流：</h4>
              </el-col>
              <el-col :span="4">
                <el-input v-model="input_rated_current"><h4 style="margin-top: 12px" slot="suffix">kA</h4></el-input>
              </el-col>
              <el-col :span="6" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">额定频率：</h4>
              </el-col>
              <el-col :span="4">
                <el-input v-model="input_rated_frequency"><h4 style="margin-top: 12px" slot="suffix">Hz</h4></el-input>
              </el-col>
            </el-row>
                <el-divider></el-divider>
                <el-row style="margin-bottom: 1%">
                  <el-col :span="7" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">极对数：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_num_of_poles_pairs"></el-input>
                  </el-col>
                  <el-col :span="6" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">轴承类型：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_type_of_bearings"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 1%">
                  <el-col :span="7" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">槽数：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_num_of_slots"></el-input>
                  </el-col>
                  <el-col :span="6" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">转子类型：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_type_of_rotor"></el-input>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-bottom: 1%">
                  <el-col :span="7" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">定子电抗（额定频率）：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_stator_reactance"></el-input>
                  </el-col>
                  <el-col :span="6" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">定子电阻（额定频率）：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_stator_resistance"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 1%">
                  <el-col :span="7" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">转子电抗（额定频率）：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_rotor_reactance"></el-input>
                  </el-col>
                  <el-col :span="6" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">转子电阻（额定频率）：</h4>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="input_rotor_resistance"></el-input>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                  <el-col :span="7" style="text-align: right ; padding-right: 3%">
                    <h4 style="margin-top: 4%">其他描述：</h4>
                  </el-col>
                  <el-col :span="14">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="description">
                    </el-input>
                  </el-col>
                </el-row>
            </div>
            <div style="margin-top: 5%">
              <el-col :span="12" :offset="6">
                <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" @click="back" plain>返回</el-button> </el-col>
                <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="motor_last_step">上一步</el-button> </el-col>
                <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" @click="motor_submit" plain>提交</el-button> </el-col>
                </el-col>
            </div>
        </div>
        <div class="el-card" style="padding-left: 2% ; width: 800px ; margin: 0 auto ; margin-top: 2%" v-if="level_2_2">
          <h3 style="margin-left: 1% ; margin-top: 3% ; text-align: center">泵参数</h3>
          <div style="margin-top: 5%">
            <el-row>
              <el-col :span="5" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">设备种类：</h4>
              </el-col>
              <el-col :span="5">
                <h4 style="margin-top: 3%">泵</h4>
              </el-col>
              <el-col :span="5" style="text-align: right ; padding-right: 3%">
                <h4 style="margin-top: 4%">泵种类：</h4>
              </el-col>
              <el-col :span="6">
                <el-input v-model="input_pump_type" placeholder="请输入泵的种类"></el-input>
              </el-col>
            </el-row>
              <el-divider></el-divider>
          </div>
          <div style="margin-top: 5%" >
            <el-col :span="12" :offset="6">
              <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="back">返回</el-button> </el-col>
              <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" plain @click="pump_last_step">上一步</el-button> </el-col>
              <el-col :span="8" style="text-align: center ; margin-bottom: 5%"><el-button type="primary" @click="pump_submit" plain>提交</el-button> </el-col>
            </el-col>
          </div>
        </div>
    </div>
</template>

<script>
  import {request} from "../../../network/request";

  export default {
      name: "device_add",
      data(){
        return{
          input_id:'',
          input_name:'',
          input_location:'',
          options_type: [{
            value: 0,
            label: '电机'
          }, {
            value: 1,
            label: '泵'
          }],
          value_type: '',
          input_enterprise:'',
          input_manufac_date:'',
          input_deploy_date:'',
          input_capacity:'',
          input_rated_voltage:'',
          input_rated_current:'',
          input_rated_frequency:'',
          input_num_of_poles_pairs:'',
          input_num_of_slots:'',
          input_type_of_bearings:'',
          input_type_of_rotor:'',
          input_stator_reactance:'',
          input_stator_resistance:'',
          input_rotor_reactance:'',
          input_rotor_resistance:'',
          description:'',
          input_pump_type:'',
          // 点击“上一步”、“下一步”切换页面
          level_1: true,
          level_2_1: false,
          level_2_2: false,
        }
      },
      methods: {
        // 点击下一步的事件
        next_step() {
          if(this.value_type == 0) {
            this.level_1 = false;
            this.level_2_1 = true;
          }else if(this.value_type == 1) {
            this.level_1 = false;
            this.level_2_2 = true;
          }else{
            this.$alert('请选择设备类型', '提示', {
              confirmButtonText: '确定',
            })
          }
        },
        // 点击上一步的事件
        motor_last_step() {
          this.level_2_1 = false;
          this.level_1 = true;
        },
        pump_last_step() {
          this.level_2_2 = false;
          this.level_1 = true;
        },
        motor_submit(){
          let formdata = new FormData();
          formdata.append('device_id', this.input_id);
          formdata.append('device_name', this.input_name);
          formdata.append('location', this.input_location);
          formdata.append('device_type', this.value_type);
          formdata.append('enterprise_id', this.input_enterprise);
          formdata.append('motor_type', this.input_motor_type);
          formdata.append('manufac_date', this.input_manufac_date);
          formdata.append('capacity', this.input_capacity);
          formdata.append('rated_voltage', this.input_rated_voltage);
          formdata.append('rated_current', this.input_rated_current);
          formdata.append('rated_frequency', this.input_rated_frequency);
          formdata.append('num_of_poles_pairs', this.input_num_of_poles_pairs);
          formdata.append('num_of_slots', this.input_num_of_slots);
          formdata.append('type_of_bearings', this.input_type_of_bearings);
          formdata.append('type_of_rotor', this.input_type_of_rotor);
          formdata.append('stator_reactance', this.input_stator_reactance);
          formdata.append('stator_resistance', this.input_stator_resistance);
          formdata.append('rotor_reactance', this.input_rotor_reactance);
          formdata.append('rotor_resistance', this.input_rotor_resistance);
          formdata.append('description', this.description);
          request({
            url: 'device/add/',
            method: 'post',
            data: formdata
          }).then(res => {
            if(res.data.message == 'Motor Created Successfully!')
            {
              this.$alert('设备创建成功', '提示', {
                confirmButtonText: '确定',
              });
            }
            else
            {
              this.$alert('设备创建失败，请验证权限后再次尝试', '提示', {
                confirmButtonText: '确定',
              });
            }
          }).catch(err => {
            this.$alert('网络异常', '提示', {
              confirmButtonText: '确定',
            });
          });
        },
        pump_submit(){
          let formdata = new FormData();
          formdata.append('device_id', this.input_id);
          formdata.append('device_name', this.input_name);
          formdata.append('location', this.input_location);
          formdata.append('device_type', this.value_type);
          formdata.append('enterprise_id', this.input_enterprise);
          formdata.append('pump_type', this.input_pump_type);
          request({
            url: 'device/add/',
            method: 'post',
            data: formdata
          }).then(res => {
            if(res.data.message == 'Pump Created Successfully!')
            {
              this.$alert('设备创建成功', '提示', {
                confirmButtonText: '确定',
              });
            }
            else
            {
              this.$alert('设备创建失败，请验证权限后再次尝试', '提示', {
                confirmButtonText: '确定',
              });
            }
          }).catch(err => {
            this.$alert('网络异常', '提示', {
              confirmButtonText: '确定',
            });
          });
        },
        //返回设备列表
        back(){
          this.$router.replace('device_list');
        }
      }
    }
</script>

<style scoped>

</style>