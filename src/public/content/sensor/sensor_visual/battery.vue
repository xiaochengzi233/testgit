<template>
  <div id="battery"></div>
</template>

<script>
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "battery",
  props: ["battery_data"],
  data() {
    return {};
  },
  watch: {
    battery_data(val) {
      console.log(val);
      this.getBattery(val);
    }
  },
  methods: {
    getBattery(battery_data) {
      console.log(battery_data);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("battery"));

      // 指定图表的配置项和数
      var option = {
        backgroundColor: "#1B232F",
        series: [
          {
            type: "liquidFill",
            radius: "76%",
            center: ["50%", "40%"],
            data: [battery_data * 0.01, battery_data * 0.01, battery_data * 0.01, battery_data * 0.01, battery_data * 0.01],
            backgroundStyle: {
              borderWidth: 5,
              borderColor: "#1daaeb",
              color: "#fff"
            },
            label: {
              normal: {
                formatter: battery_data + "%",
                textStyle: {
                  fontSize: 20
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>