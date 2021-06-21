<template>
  <div id="admin">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo menu"
      @select="handleSelect"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">违规言论处理</span>
      </el-menu-item>
    </el-menu>
    <div class="container">
      <!-- <chart height="70%" width="50%" class="admin-chart"/> -->
      <mix-chart></mix-chart>
    </div>

  </div>
</template>

<script>
import Chart from '@/components/charts/MixChart'
import MixChart from '@/views/mix-chart.vue'
export default {
  components: { Chart, MixChart },
  methods: {
   handleSelect(key, keyPath) {
      console.log(key, keyPath)
      
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
// #admin {
//   height: 600px;
// }
// #admin .menu{
//   text-align: left;
//   float: left;
//   width: 250px;
//   height: 100%;
// }
// #admin .container {
//   // width: 600px;
//   // height: 500px;
//   // display: inline-block;
//   // height: calc(100vh - 84px);
// }
// #admin .admin-chart {

// }
</style>
