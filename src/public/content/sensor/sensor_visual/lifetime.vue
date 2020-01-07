<template>
  <div id="lifetime"></div>
</template>

<script>
  export default {
    name: "lifetime",
    props: ["lifetime_data"],
    data() {
      return {};
    },
    watch: {
      lifetime_data(val){
        this.getLifetime(val);
      }
    },
    methods: {
      getLifetime(lifetime_data) {
        // 基于准备好的dom，初始化charts实例
        var myChart = echarts.init(document.getElementById("lifetime"));
        // 指定图表的配置项和数据
        var dataLine = [40];
        var g_cellBar0_y =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC";
        var g_cellBarImg0_y = new Image();
        g_cellBarImg0_y.src = g_cellBar0_y;

        var option = {
          xAxis: [
            {
              show: false
            }
          ],
          yAxis: [
            {
              show: false,
              data: ["CCA"]
            },
            {
              // axisTick: "none",
              // axisLine: "none",
              type: "category",
              show: false,
              z: 3
            },
            {
              // axisTick: "none",
              // axisLine: "none",
              type: "category"
            }
          ],
          grid: [
            {
              show:true,
              left:'0%'
            }
          ],
          series: [
            {
              //间距
              type: "bar",
              barWidth: 60,
              stack: "b",
              legendHoverLink: true,
              z: 2
            },
            {
              name: "条",
              type: "bar",
              stack: "b",
              data: [lifetime_data],
              label: {
                normal: {
                  show: true,
                  position: "right",
                  distance: 10,
                  formatter: function(param) {
                    return param.value + "%";
                  },
                  textStyle: {
                    color: "#ffffff",
                    fontSize: "16"
                  }
                }
              },
              barWidth: 30,
              itemStyle: {
                color: {
                  image: g_cellBarImg0_y,
                  repeat: "repeat",

                }
                // color: '#81E7ED',
              },
              z: 1
            },
            {
              name: "外框",
              type: "bar",
              yAxisIndex: 2,
              data: [100],
              barWidth: 60,
              z: 0
            }
          ]
        };
        myChart.setOption(option);

      }
    }

  };
</script>

<style scoped>
</style>