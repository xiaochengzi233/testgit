<template>
  <div id="chart4" style="height: 180px"></div>
</template>
<script>
export default {
  props: {
    chartdata: ""
  },
  //   watch: {
  //     chartdata(val, newval) {
  //       console.log(JSON.parse(JSON.stringify(val)));
  //       this.getchart();
  //     }
  //   },
  mounted() {
    this.getchart();
  },
  methods: {
    getchart() {
      //   let data=JSON.parse(JSON.stringify(this.chartdata));
      var myChart4 = echarts.init(document.getElementById("chart4"));
      var option4 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          // right:'50%',
          x: "60%",
          top: "middle",
          itemGap:20,
          textStyle: {
            color: "white"
          },
                    formatter: params => {
            console.log(params);
            if (params == "额定功率") {
              return params + "  " 
            } else if (params == "低负载") {
              return params + "  " 
            } else {
              return params + "  "
            }
          }
        },
        series: [
          {
            name: "设备功率统计",
            type: "pie",
            radius: ["50%", "70%"],
            label: false,
            center:['30%','50%'],
            data: [
              { value: 335, name: "额定功效", itemStyle: { color: "green" } },
              { value: 234, name: "低负载", itemStyle: { color: "orange" } },
              { value: 135, name: "高温高负载", itemStyle: { color: "red" } }
            ]
          }
        ]
      };
      myChart4.setOption(option4);
      myChart4.resize();

    }
  }
};
</script>