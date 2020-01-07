<template>
  <div id="signal"></div>
</template>

<script>
  export default {
    name: "signal",
    props: ["signal_data"],
    data() {
      return {
        signal_bars: [0,0,0,0,0]
      };
    },
    mounted() {
      if( this.signal_data < -115){
        this.signal_bars = [1,0,0,0,0];
      }else if(this.signal_data < -105){
        this.signal_bars = [1,2,0,0,0];
      }else if(this.signal_data < -95){
        this.signal_bars = [1,2,3,0,0];
      }else if(this.signal_data < -85){
        this.signal_bars = [1,2,3,4,0];
      }else{
        this.signal_bars = [1,2,3,4,5];
      }
      // 基于准备好的dom，初始化charts实例
      var myChart = echarts.init(document.getElementById("signal"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
          show: false
        },
        color: ["#0794C7"],
        // tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        // },
        grid: {
          left: "1%",
          right: "1%",
          top: "",
          bottom: "3%",
          // containLabel: true
          show: false
        },
        xAxis: [
          {
            // type : 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            show: false
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false,
            min: 0,
            max: 5,
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: this.signal_bars,
          }
        ]
      };
      myChart.setOption(option);
    }
  };
</script>

<style scoped>

</style>