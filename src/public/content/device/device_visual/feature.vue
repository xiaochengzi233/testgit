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
        @change="time_change"
      ></el-date-picker>
    </div>
    <div id="feature"></div>
  </div>
</template>

<script>
  import { request } from "network/request";
  export default {
    name: "feature",
    props: ["feature_data", "data_y"],
    data() {
      return {
        time: "",
        start_time: "",
        end_time: "",
        base_url: "",
        feature_y: [],
        feature_x: ""
      };
    },
    methods: {
      time_change() {
        this.$emit("time_change", this.start_time, this.end_time);
        console.log(this.start_time, this.end_time);
      },
      init() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("feature"));

        // 指定图表的配置项和数
        var option = {
          tooltip: {
            trigger: "axis"
          },
          legend: {
            orient: "vertical", //注意
            right:90,
            top:20,
            type: "scroll",
            textStyle: {
              color: "#fff"
            }
          },
          grid: {
            left: "3%",
            right: "17%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              this.feature_x[0],
              this.feature_x[1],
              this.feature_x[2],
              this.feature_x[3]
            ],
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff"
              }
            }
          },
          yAxis: {
            type: "value",
            data: ["0", "1", "2", "4"],
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                show: false,
                color: "#fff"
              }
            }
          },
          series: this.feature_y
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    watch: {
      time: function(new_time) {
        this.start_time = new_time[0];
        this.end_time = new_time[1];
      },
      data_y(val) {
        console.log(this.data_y[0].datetime);
        this.feature_x = this.data_y[0].datetime;
        for (let key in this.data_y[0]) {
          if (key != "datetime") {
            let item = JSON.parse(JSON.stringify(this.data_y[0][key]));
            let arr = [];
            // console.log(item);
            for (let i in item) {
              arr.push(item[i]);
            }
            // console.log(this.data_y[0][key])
            this.feature_y.push({ data: arr, type: "line", name: key });
          }
        }
        this.init();
      },
      feature_x() {
        this.init();
      }
    },
    mounted() {
      // this.init();
    }
  };
</script>

<style scoped>
  #feature {
    min-height: calc(85vh - 117px);
  }
  #main .block {
    height: 48px;
  }
  .el-date-editor--monthrange.el-input__inner {
    border: none;
  }
</style>