<template>
  <div id="chart3" style="height: 180px"></div>
</template>
<script>
import { white } from "color-name";
export default {
  props: {
    chartdata: ""
  },
  watch: {
    chartdata(val, newval) {
      console.log(JSON.parse(JSON.stringify(val)));
      this.getchart();
    }
  },

  methods: {
    getchart() {
      let data = JSON.parse(JSON.stringify(this.chartdata));
      var myChart3 = echarts.init(document.getElementById("chart3"));
      var option3 = {
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
            if (params == "正常") {
              return params + "  " + data.mild;
            } else if (params == "低温") {
              return params + "  " + data.cold;
            } else {
              return params + "  " + data.hot;
            }
          }
        },
        series: [
          {
            name: "设备温度统计",
            type: "pie",
            radius: ["50%", "70%"],
            label: false,
            center: ["30%", "50%"],
            data: [
              {
                value: data.mild,
                name: "正常",
                itemStyle: { color: "green" }
              },
              {
                value: data.cold,
                name: "低温",
                itemStyle: { color: "blue" }
              },
              { value: data.hot, name: "高温", itemStyle: { color: "red" } }
            ]
          }
        ]
      };
      myChart3.setOption(option3);
      myChart3.resize();
    }
  }
};
</script>