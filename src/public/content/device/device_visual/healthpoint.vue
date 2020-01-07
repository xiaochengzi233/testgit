<template>
  <div id="chart1" style="height: 185px; width:100%"></div>
</template>
<script>
export default {
  name: "healthpoint",
  data() {
    return {};
  },
  props: {
    chartdata: ""
  },
  watch: {
    chartdata(val, newval) {
      // console.log(JSON.parse(JSON.stringify(val)));
      this.getchart();
    }
  },
  mounted(){
    
  },
  methods: {
    // refreshchart(){
    //   this.myChart1.resize();
    // },
    getchart() {
      let data = this.chartdata;
      console.log('我是健康指数中的');
      console.log(data);
      var myChart1 = echarts.init(document.getElementById("chart1"));
      var option1 = {
        series: {
          type: "pie",
          clockWise: false,
          radius: [50, 70],
          label: false,
          itemStyle: {
            normal: {
              color: function(params) {
                if (parseInt(data.health_index) >= 75) return "green";
                else if (parseInt(data.health_index) >= 60) return "orange";
                else return "red";
              }
              // shadowColor: 'blue',
            }
          },
          
          hoverAnimation: false,
          data: [
            {
              value: data.health_index,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + "%" + "\n" + data.health_status;
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "20",
                    fontWeight: "bold",
                    color: function(params) {
                      if (parseInt(data.health_index) >= 75) return "green";
                      else if (parseInt(data.health_index) >= 60) return "orange";
                      else return "red";
                    }
                  }
                }
              }
            },
            {
              value: 100 - data.health_index,
              itemStyle: { color: "#dfeaff" }
            }
          ]
        }
      };
      myChart1.setOption(option1);
      myChart1.resize();
    }
  }
};
</script>
