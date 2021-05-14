<template>
  <div class="about">
      <div class="content">
        <!--标题-->
        <p class="titleP">日记记录</p>
        <p class="cardsp">
          <i class="el-icon-time"></i>
          <span class="spantwo">今天是</span>
          <span class="strong-tip">{{Today}} </span>
          <!-- <span class="spantwo">本月写日记</span>
          <span class="strong-tip">{{cardsnum}}次</span> -->
          <!-- <el-button type="primary" style="margin-left: 15px;" @click="SupplyPunchFn">写日记</el-button> -->
        </p>
        <!--日历-->
        <Calendar
          ref="Calendar"
          :markDate="markDate"
          v-on:changeMonth="changeDate"
        ></Calendar>
      </div>
  </div>
</template>

<script>
import {dateFormat} from '@/untils/untils.js'
import Calendar from 'vue-calendar-component'
import { getDiary } from '@/api/api.js'
export default {
  components: {
    Calendar
  },
  data() {
    return {
      hasYearNot:['2021-05-05'],
      hasYear: [],
      markDate: ['2021/05/03', '2021/5/7'],

      Today: dateFormat('YYYY年mm月dd日', new Date()),//当前日期
      cardsnum: 0,//当前打卡次数
      cardsradio: '2'
    }
  },
  mounted() {
    var that = this
    // 获取当前用户日记
    getDiary().then(function(res) {
      that.diaryList = res.data.result.diaryList
      that.markDate = []
      that.diaryList.forEach((item) => {
        that.markDate.push(item.createTime.substr(0, 10))
      })
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleSelected(day) {
      let flag = "1" //默认显示为0
      // 没有交易年度 2深色有 3浅色无
      this.hasYearNot.forEach((item) => {
        if (item == day) {
          //判断显示数据
          flag = "3";
          return;
        }
      });
      this.hasYear.forEach((item) => {
        if (item == day) {
          //判断显示数据
          flag = "2";
          return;
        }
      });
      return flag;
    },
    
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }

  }
}
</script>

<style scoped>
  /* .is-selected {
    color: #1989FA;
  }
  .cal ::v-deep.el-calendar-day .calendar_circle1 {
  margin: 0 auto;
  padding: 2px;
  text-align: center;
}
.cal ::v-deep.el-calendar-day .calendar_circle2 {
  border: 1px solid #DE4747;
  border-radius: 50%;
  margin: 0 auto;
  padding: 2px;
  text-align: center;
} */

.content{
  /* padding: 15px; */
  text-align: left;
}

.cardsp{
  height: 28px;
  line-height: 28px;
  position: relative;
  padding-left: 15px;
  margin-bottom: 15px;
}
.cardsp img{
  position: absolute;
  top: 7px;
}
.cardsp .spantwo{
  margin-left: 5px;
}
.cardsp .spanthere{
  margin-left: 15px;
}
.circular{
  display: inline-block;
  /*width: 12px;*/
  /*height: 12px;*/
  border: 5px solid #136aa7;
  border-radius: 50%;
}

.strong-tip {
  font-weight: bold;
  color: #409EFF;
}
.titleP{
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  font-weight: bold;
  border-left: 3px solid #136aa7;
  padding-left: 12px;
  position: relative;
  margin-bottom: 15px;
}
.title{
  /* background-color: #2fd85e; */
  font-size: 16px;
}
.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: red;
  color: black;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}


/*.wh_container >>> .mark1 {*/
  /*background-color: orange;*/
/*}*/
/*.wh_container >>> .mark2 {*/
  /*background-color: blue;*/
/*}*/
.calendar-box {
  width: 400px;
}
.wh_container >>> .wh_content_all{
  background-color: #ffffff!important;
  border: 1px solid #dfe0e6;
  width: 300px;
  height: 100%;
  border-radius: 6px;
}
.wh_container{
  margin: 0px!important;
}

.wh_container >>> .wh_item_date{
  color:#211d48;

}
.wh_container >>> .wh_item_date:hover{
  /* color:#ffffff;
  background: #136aa7;
  border-radius: 50%; */
  background-color: #ffffff;
  color: black;
}
.wh_container >>>  .wh_other_dayhide{
  color:#cccccc;
}

.wh_container >>> .wh_content_item{
  margin-bottom: 5px;
  margin-top: 5px;
}

.wh_container >>> .wh_content{
  color:black;
}

.wh_container >>> .wh_top_tag{
  color:black;
}
.wh_container >>> .wh_content_li{
  color:#162947;
  font-weight: bold;
}
.wh_container >>> .wh_jiantou1{
  border-top: 2px solid #162947;
  border-left: 2px solid #162947;
}
.wh_container >>> .wh_jiantou2{
  border-top: 2px solid #162947;
  border-right: 2px solid #162947;
}



.wh_container >>> .wh_content_item .wh_isToday{
  /* background-color: rgba(19,105,167,1); */
  background-color: #ffffff;
  /*border-radius: 0px;*/
  color: #409EFF;
}
.wh_container >>> .wh_content_item>.wh_isMark{
  /* background-color: rgba(19,105,167,0.15); */
  color: #ffffff;
  background-color: #F56C6C;
  /*border-radius: 0px;*/
}
.wh_container >>> .wh_content_item .wh_chose_day{
  /* background-color: rgba(19,105,167,1); */
  background-color: #ffffff;
  /*border-radius: 0px;*/
  /* color: #ffffff; */
}
</style>