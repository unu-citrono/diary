<template>
  <div id="user-static">
    <el-card class="box-card">
    <!-- <div> -->
      <div class="chart-container">
        <!-- 统计图 -->
        <!-- <h3>日记统计</h3> -->
        <div style="display:inline-block">
          <h2>日记统计</h2>
          <ul v-if="showText" class="text-list">
            <li v-for='i in month' :key="i">
              <p>{{i}}月：{{countArr[i-1]}}</p>
            </li>
          </ul>
        </div>
        <chart height="70%" width="80%" class="chart" :countArr='countArr' :month='month' :xData='xData1'/>
      </div>
      <div class="pie-container">
        <h2>心情统计</h2>
        <mood-chart  :moodArr='moodArr' :xData='xData2'></mood-chart>
        <pie-report height="70%" width="80%" class="pie" :pieMood='pieMood'></pie-report>
      </div>
    <!-- </div> -->
    </el-card>
  </div>
</template>

<script>
import Chart from '@/components/charts/MixChart'
import MoodChart from '@/components/charts/MoodChart'
import PieReport from '@/components/charts/PieReport'
import {staticDiary, getDiary} from '@/api/api'

export default {
  components: { Chart, PieReport, MoodChart },
  data() {
    return {
      countArr: [],
      moodArr: [],
      month: 12, 
      pieMood: {},
      xData1: [],
      xData2: [],
      showText: false
    }
  },
  mounted() {
    let param = {
      userId: localStorage.getItem('userId'),
      year: '2021'
    }
    // console.log(param)
    staticDiary(param).then(res => {
      console.log(res.data.result)
      this.countArr = res.data.result.countArr
      this.month = res.data.result.month
      this.showText = true
      for (let i = 1; i < this.month + 1; i++) {
        this.xData1.push(i + '月')
      }
    })
    getDiary({timeSort: '1'}).then(res => {
      console.log(res.data)
      let list = res.data.result.diaryList
      // let moodArr = []
      this.pieMood = {
        bad: 0,
        normal: 0,
        good: 0,
        great: 0
      }
      list.forEach(item => {
        this.xData2.push(item.createTime.substr(6, 4))
        if(item.mood == 1 || item.mood == 2) this.pieMood.bad ++
        else if(item.mood == 3) this.pieMood.normal ++
        else if(item.mood == 4) this.pieMood.good ++
        else if(item.mood == 5) this.pieMood.great ++
        this. moodArr.push(item.mood)
      })
      console.log(this.xData2)
      console.log(this.pieMood)
      console.log(this.moodArr)
    })
  }
}
</script>

<style lang="less">
#user-static li{
  list-style: none;
  // display: flex;
}
#user-static .box-card {
  width: 60%;
  margin: 0 auto;
}
#user-static .chart-container {
  display: flex;
  // flex: 1 1 60%;
  height: 600px;
}
#user-static .chart-container div:first-child{
  flex: 1 1 10%;
}
#user-static div:nth-child(2) {
  // flex: 1 1 40%;
  // width: 100%;
}
#user-static .chart {
  display: inline-block;
  flex: 1 1 80%;
  margin-top: 30px;
  // margin: 0 auto;
}
#user-static .text-list{
  text-align: left;
  margin-top: 130px;
  font-size: 14px;
  color: #999;
}
.pie-container {
  // margin-top: 800px;
  width: 100%;
}
.pie {
  // margin: 0 auto;
  // margin-left: 300px;
  width: 500px;
  height: 500px;
}
</style>
