<template>
  <div id="chart2" style="height: 180px"></div>
</template>
<script>
import { get } from "http";
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
  mounted() {},
  methods: {
    getchart() {
      let data = JSON.parse(JSON.stringify(this.chartdata));
      var myChart2 = echarts.init(document.getElementById("chart2"));
      var option2 = {
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
          formatter: (params)=>{
            console.log(params);
            if(params=='正常')
                 { return params+'  '+data.normal}
            else if(params=='预警')
                 { return params+'  '+data.warning}
            else
                 { return params+'  '+data.danger}
          }
        },
        series: [
          {
            name: "设备总览",
            type: "pie",
            radius: ["50%", "70%"],
            label: false,
            center: ["30%", "50%"],
            data: [
              {
                value: data.normal,
                name: "正常",
                itemStyle: { color: "green" }
              },
              {
                value: data.warning,
                name: "预警",
                itemStyle: { color: "orange" }
              },
              {
                value: data.danger,
                name: "危险",
                itemStyle: { color: "red" }
              }
            ]
          }
        ]
      };
      myChart2.setOption(option2);
      myChart2.resize();

    }
  }
};
</script>