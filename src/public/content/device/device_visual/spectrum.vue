<template>
	<div id="spectrum"></div>
</template>

<script>
	export default {
		name: "spectrum",
    props: ['feature_data'],
		data() {
			return {
			}
		},
    methods:{
		  init(){
        // 基于准备好的dom，初始化echarts实例
        console.log('前');
        var myChart = echarts.init(document.getElementById('spectrum'),'');
        console.log('后');
        var option = {
          backgroundColor:'#1B232F',
          'title': {},
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': []
          },
          'toolbox': {
            'show': 'true',
            'feature': {
              'dataView': {
                'show': true,
                'readOnly': false
              },
              'magicType': {
                'show': true,
                'type': ['line', 'bar']
              },
              'restore': {
                'show': true
              },
              'saveAsImage': {
                'show': true
              }
            }
          },
          'calculable': true,
          'xAxis': [{
            'type': 'category',
            'name': '频率/Hz',
            'data': ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
            'axisLine': {
              			lineStyle: {
							// 设置x轴颜色
							color: '#fff'
              			}
            		}
          }],
          'yAxis': [{
            'type': 'value',
            'name': '振幅',
            'data': ['0', '20', '40', '60', '80', '100'],
            'axisLine': {
              			lineStyle: {
							// 设置y轴颜色
							color: '#fff'
              			}
            		}
          }],
          'series': [{
            'name': '频谱1',
            'type': 'bar',
            'barWidth': 2,
            'data': [
              // 维度X   维度Y   其他维度 ...
              [0.4, 4.5],
              [2.4, 2.5],
              [1.4, 3.5],
            ],
            'markPoint': {
              data: [{
                'name': '最大值',
                'type': 'max',
                'value': '10.4',
                'xAxis': 5,
                'yAxis': 200
              },

              ]
            },
            color: '#C23531'
          },
            {
              'name': '频谱2',
              'type': 'bar',
              'barWidth': 2,
              'data': [
                // 维度X   维度Y   其他维度 ...
                [3.4, 4.5],
                [4.4, 2.5],
                [5.4, 3.5]
              ],
              'markPoint': {
                data: [{
                  'name': '最大值',
                  'type': 'max',
                  'value': '10.4',
                  'xAxis': 5,
                  'yAxis': 200
                },

                ]
              },
              color: '#C23531'
            },
            {
              'name': '频谱3',
              'type': 'bar',
              'barWidth': 2,
              'data': [
                // 维度X   维度Y   其他维度 ...
                [6.4, 6.5],
                [7.4, 3.5],
                [8.4, 8.5],
                [9.4, 1.5],
                [10.4, 6.5],
              ],
              'markPoint': {
                data: [{
                  'name': '最大值',
                  'type': 'max',
                  'value': '10.4',
                  'xAxis': 5,
                  'yAxis': 200
                },

                ]
              },
              color: '#C23531'
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    // watch:{
		//   change: function () {
    //     this.init();
    //   }
    // },
		mounted() {
		  console.log('频谱');
      this.init();
		}
	}
</script>

<style scoped>
	#spectrum {
		width: 100%;
    height: 600px;
	}
</style>
