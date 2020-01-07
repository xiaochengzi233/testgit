<template>
  <div id="temperature"></div>
</template>

<script>
export default {
  name: "sensor_temperature",
  props: ["temperature_data"],
  data() {
    return {};
  },
  watch: {
    temperature_data(val) {
      this.getTemperature(val);
    }
  },
  methods: {
    getTemperature(temperature_data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("temperature"));

      // 指定图表的配置项和数
      var option = {
        series: [
          {
            type: "gauge",
            name: "外层辅助",
            radius: "86%",
            startAngle: "225",
            endAngle: "-45",
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "rgb(0,191,255)"]],
                width: 8,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          {
            name: "内层数据刻度",
            type: "gauge",
            radius: "76%",
            center: ["50%", "50%"],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgb(0,191,255)"
                      },
                      {
                        offset: 1,
                        color: "rgb(255,0,0)"
                      }
                    ])
                  ]
                ]
              }
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 5,
                color: "#ffffff"
              }
            },
            axisTick: {
              lineStyle: {
                width: 2,
                color: "#ffffff"
              }
            },
            axisLabel: {
              color: "rgb(0,191,255)",
              distance: 30,
              fontSize: 10
            },
            detail: {
              show: true,
              offsetCenter: ["0", "80%"],
              fontSize: 35,
              color: "rgb(0,191,255)"
            },
            itemStyle: {
              normal: {
                color: "rgb(0,191,255)"
              }
            },

            data: [
              {
                value: temperature_data
              }
            ],
            silent: false
          },
          {
            name: "最内层线",
            type: "gauge",
            radius: "26%",
            center: ["50%", "50%"],
            startAngle: 360,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                opacity: 0
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              length: 2,
              lineStyle: {
                color: "#00b3ff",
                width: 3,
                type: "solid"
              }
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
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
#temperature {
  width: 100%;
}
</style>