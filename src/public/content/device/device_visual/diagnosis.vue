<template>
  <div id="main">
    <div class="block">
      <el-date-picker
        type="monthrange"
        v-model="time"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="yyyy-MM"
        size="small"
        @change="time_change">
      </el-date-picker>
    </div>
    <div id="diagnosis"></div>
  </div>
</template>

<script>
  import { request } from "network/request";
  export default {
    name: "diagnosis",
    props: ["diagnosis_data"],
    data() {
      return {
        time: "",
        start_time: "",
        end_time: ""
      };
    },
    watch: {
      time: function(new_time) {
        this.start_time = new_time[0];
        this.end_time = new_time[1];
      },
      diagnosis_data(val) {
        this.getDiagnosis(val);
      }
    },
    methods: {
      time_change() {
        this.$emit("time_change", this.start_time, this.end_time);
      },
      getDiagnosis(diagnosis_data) {
        let diagnosis_a = [];
        let diagnosis_b = [];
        let diagnosis_c = [];

        // x轴时间点
        let diagnosis_x = [];
        for (let i in diagnosis_data.datetime) {
          diagnosis_x.push(diagnosis_data.datetime[i]);
        }

        // 第一组数据
        let diagnosis_1 = [];
        for (let i in diagnosis_data.diagnosis_1) {
          diagnosis_1.push(diagnosis_data.diagnosis_1[i]);
        }
        diagnosis_x.forEach((item,index) => {
          diagnosis_a.push([item , diagnosis_1[index]]);
        });

        // 第二组数据
        let diagnosis_2 = [];
        for (let i in diagnosis_data.diagnosis_2) {
          diagnosis_2.push(diagnosis_data.diagnosis_2[i]);
        }
        diagnosis_x.forEach((item,index) => {
          diagnosis_b.push([item , diagnosis_2[index]]);
        });

        // 第三组数据
        let diagnosis_3 = [];
        for (let i in diagnosis_data.diagnosis_3) {
          diagnosis_3.push(diagnosis_data.diagnosis_3[i]);
        }
        diagnosis_x.forEach((item,index) => {
          diagnosis_c.push([item , diagnosis_3[index]]);
        });

        var myChart = echarts.init(document.getElementById("diagnosis"));

        var option = {
          xAxis: {
            data: diagnosis_x,
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff"
              }
            }
          },
          yAxis: {
            data: ["正常运行", "危险", "警告"],
            axisLine: {
              lineStyle: {
                // 设置y轴颜色
                color: "#fff"
              }
            }
          },
          series: [
            {
              symbolSize: 18,
              data: diagnosis_a,
              type: "scatter",
              color: "#a4e2c6"
            },
            {
              symbolSize: 18,
              data: diagnosis_b,
              type: "scatter",
              color: "blue"
            },
            {
              symbolSize: 18,
              data: diagnosis_c,
              type: "scatter",
              color: "red"
            }
          ],
          backgroundColor: "#1B232F"
        };

        myChart.setOption(option);
      }
    }
  };
</script>

<style scoped>
  #diagnosis {
    min-height: calc(85vh - 117px);
  }
  #main .block {
    height: 48px;
  }
  .el-date-editor--monthrange.el-input__inner {
    border: none;
  }
</style>
