<template>
  <div>
    <div id="pieReport" style="width: 400px;height: 300px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    pieMood: {
      type: Object,
      default: {
        bad: 5,
        normal: 10,
        good: 4,
        great: 9
      }
    }
  },
  data() {
    return {
      charts: "",
      opinion: ["心情差", "心情一般", "心情较好", '心情极好'],
      opinionData: [
        { value: this.pieMood.bad, name: "心情差", itemStyle: "#c1bfb3" },
        { value: this.pieMood.normal, name: "心情一般", itemStyle: "#409eff" },
        { value: this.pieMood.good, name: "心情较好", itemStyle: "#67C23A" },
        { value: this.pieMood.great, name: "心情极好", itemStyle: "#f56c6c" }
      ]
    };
  },
  watch: {
    pieMood: {
      handler(newValue, oldValue) {
        this.pieMood = newValue
        this.drawPie("pieReport")
        
      },
      deep: true,
      immediate: false
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("pieReport")
    });
  },
  methods: {
    drawPie(id) {
      console.log('draw')
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.opinion
        },
        series: [
          {
            name: "状态",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              color: function(params) {
                //自定义颜色
                // var colorList = ["#1ab394", "#79d2c0"];
                var colorList = ['#c1bfb3', '#409eff', '#67C23A', '#f56c6c']
                return colorList[params.dataIndex];
              }
            },
            data: this.opinionData
          }
        ]
      });
    }
  }
}
</script>