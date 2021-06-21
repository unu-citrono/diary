<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './resize'
import { staticDiary } from '@/api/api'
export default {
  mixins: [resize],
  props: {
    xData: {
      type: Array,
      defaul: []
    },
    countArr: {
      type: Array,
      defaul: []
    },
    moodArr: {
      type: Array,
      defaul: []
    },
    month: {
      type: Number,
      default: 12
    },
    className: {
      type: String,
      default: 'pie'
    },
    id: {
      type: String,
      default: 'mood-chart'
    },
    width: {
      type: String,
      default: '900px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null,
      // xData: []
      // countArr: [],
      // month: 12,
    }
  },
  watch: {
    // countArr: {
    //   handler(newValue, oldValue) {
    //     this.countArr = newValue
    //     this.initChart()
    //   },
    //   deep: true,
    //   immediate: false
    // },
    // month: {
    //   handler(newValue, oldValue) {
    //     this.month = newValue
    //     console.log(this.month)
    //   this.initChart()
    //   },
    //   deep: true,
    //   immediate: false
    // }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    moodArr: {
      handler(newValue, oldValue) {
        this.moodArr = newValue
        this.initChart()
      },
      deep: true,
      immediate: false
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = this.xData
      // const xData = (function() {
      //   const data = []
      //   for (let i = 1; i < 6 + 1; i++) {
      //     data.push(i + '月')
      //   }
      //   return data
      // }())
      this.chart.setOption({
        // backgroundColor: '#344b58',
        backgroundColor: '#fff',
        title: {
          text: '日记数量统计折线图',
          x: '20',
          top: '20',
          textStyle: {
            // color: '#303133',
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              // color: '#fff'
              color: '#333'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            // color: '#fff'
              color: '#333'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          // data: ['female', 'male', 'average']
          data: ['心情指数']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            // color: '#fff' 
            color: '#909399'
          },
          borderColor: '#90979c'
        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
        {
          // name: 'average',
          name: '心情指数',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              // color: 'rgba(252,230,48,1)',
              color: '#409EFF',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.moodArr
        }
        ]
      })
    }
  }
}
</script>