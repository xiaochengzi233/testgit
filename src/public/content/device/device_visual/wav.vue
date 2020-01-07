<template>
  <div id="wav"></div>
</template>

<script>
  export default {
    name: "wav",
    props: ["wav_data",'date'],
    data() {
      return {
        wav_y:''
      };
    },
    methods: {
      init() {
        var myChart = echarts.init(document.getElementById("wav"));
        var option = {
          tooltip: {
            trigger: "item"
          },
          xAxis: {
            name:this.date,
            type: "category",
            // data: ['3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30'],
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "white",
                backgroundColor: "rgba(0,0,0,0.7)"
              }
            }
          },
          yAxis: {
            type: "value",
            data: this.wav_y,
            axisLine: {
              lineStyle: {
                show: false,
                // 设置y轴颜色
                color: "white"
              }
            }
          },
          series: [
            {
              data: this.wav_y,
              type: "line",
              smooth: true,
              color: "#a4e2c6"
            }
          ]
        };
        myChart.setOption(option);
        myChart.resize();
      }
    },
    mounted() {
      // this.init();
    },
    watch: {
      wav_data(val) {
        this.wav_y=this.wav_data.slice(0,1000);
        this.init();
      }
    }
  };
</script>

<style scoped>
  #wav {
    width: 100%;
    height: 600px;
  }
</style>

<body>

</body>