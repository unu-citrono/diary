<template>
  <div id="admin">
    <!-- 菜单 -->
     <el-menu
      default-active="1"
      class="el-menu-vertical-demo menu"
      @select="handleSelect"
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
    <!-- 统计图部分 -->
    <div class="chart-container" v-if="menuActive == '1'">
      <!-- 统计图说明 -->
      <div>
        <h3>日记统计折线图</h3>
        <span>年份  </span>
        <el-select v-model="year" style="margin-top:20px;margin-left:10px;width:160px">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <ul v-if="showText" class="text-list">
          <li v-for='i in month' :key="i">
            <p>{{i}}月：{{countArr[i-1]}}</p>
          </li>
        </ul>
        
      </div>
      <!-- 统计图 -->
      <chart height="70%" width="50%" class="chart" :countArr='countArr' :month="month" :xData='xData'/>
    </div>
    <!-- 违规言论处理部分 -->
    <div  v-if="menuActive == '2'">
      <el-table
        :data="tableData"
        stripe
        border
        class="inform-table"
        >
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户Id"
          width="220">
        </el-table-column>
        <el-table-column
          prop="count"
          label="被举报次数"
          width="110">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="getDiaryDetail(scope.$index, scope.row)">日记详情</el-button>
            <el-button
              size="mini"
              @click="getInformDetail(scope.$index, scope.row)">举报详情</el-button>
            <el-popconfirm title="确定删除吗？" @confirm='deleteDiary(scope.$index, scope.row)'>
              <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除日记</el-button>
            </el-popconfirm>
            <el-popconfirm title="确定删除吗？" @confirm='deleteUser(scope.$index, scope.row)'>
              <el-button slot="reference" type="danger" size="mini" style="margin-left:10px">删除用户</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 举报详情弹窗 -->
      <el-dialog
        title="举报详情"
        :visible.sync="showInformation"
        width="30%"
        class="detail-dialog">
        <div style="margin-left: 50px">
          <p>被举报违法信息：<span>{{illegalCount}}</span>次</p>
          <p>被举报人身攻击：<span>{{personalArrackCount}}</span>次</p>
          <p>被举报色情：<span>{{pornographicCount}}</span>次</p>
          <p>被举报垃圾广告：<span>{{ADCount}}</span>次</p>
          <p>其他举报：<span>{{otherCount}}</span>次</p>
          <p style="font-weight:bold;margin-top: 10px">举报内容</p>
          <li v-for="(detail, index) in informDetail" :key="detail._id" class="detail-list">
            <p>{{index+1}}. {{detail}}</p>
          </li>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="showInformation = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 日记预览弹窗 -->
      <el-dialog
        title="日记详情"
        :visible.sync="showPreview"
        width="50%"
        center>
        <div class="preview" v-html="diaryItem.content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showPreview = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/charts/MixChart'
import {staticDiary, getAllDiary, deleteDiary, deleteUser} from '@/api/api'
import { htmlToText } from '@/untils/untils'
export default {
  name: 'MixChart',
  components: { Chart },
  data () {
    return {
      showText: false,
      showInformation: false,
      showPreview: false,
      menuActive: '1',
      xData: [],
      year: '2021',
      years: ['2021'],
      countArr: [],
      month: 12,
      diaryItem: {},
      tableData: [],
      illegalCount: 0,
      personalArrackCount: 0,
      pornographicCount: 0,
      ADCount: 0,
      otherCount: 0,
      informDetail: []
    }
  },
  mounted() {
    staticDiary({year: '2021'}).then(res => {
      // console.log(res.data.result)
      this.countArr = res.data.result.countArr
      this.month = res.data.result.month
      this.showText = true
      for (let i = 1; i < this.month + 1; i++) {
        this.xData.push(i + '月')
      }
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      this.menuActive = key
      if(key == '2') {
        getAllDiary({isInform: '1'}).then(res => {
          console.log(res)
          var list = htmlToText(res.data.result.diaryList)
          list.forEach((item, index) => {
            list[index].count = item.information.length
          })
          this.tableData = list
        })
      }
    },
    // 获取举报详情
    getInformDetail(index, row) {
      this.showInformation = true
      this.illegalCount = 0
      this.personalArrackCount = 0
      this.pornographicCount = 0
      this.ADCount = 0
      this.otherCount = 0
      this.informDetail = []
      let list = row.information
      list.forEach((item, index) => {
        if(item.type == 'illegal') this.illegalCount += 1
        else if(item.type == 'personalArrack') this.personalArrackCount += 1
        else if(item.type == 'pornographic') this.pornographicCount += 1
        else if(item.type == 'AD') this.ADCount += 1
        else if(item.type == 'other') {
          this.otherCount += 1
          this.informDetail.push(item.content)
        }
        console.log(this.informDetail)
      })

    },
    // 查看日记详情
    getDiaryDetail(index, row) {
      this.showPreview = true
      this.diaryItem = row
    },
    // 删除日记
    deleteDiary(index, row) {
      deleteDiary({id: row._id}).then(res => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.tableData.splice(index, 1)
      })
    },
    // 删除用户
    deleteUser(index, row) {
      deleteUser({userId: row.userId}).then(res => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.tableData.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
#admin {
  display: flex;
  justify-content: space-between;
}
#admin li{
  list-style: none;
}
#admin .text-list{
  text-align: left;
  margin-left: 100px;
  font-size: 14px;
  color: #999;
}
.menu{
  flex: 1 1 8%;
  text-align: left;
  /* float: left; */
  /* width: 250px; */
  height: 580px;
}
#admin div:nth-child(2){
  flex: 1 1 70%;
}
#admin .chart-container{
  display: flex;
  height: calc(100vh - 84px);
}
#admin .chart-container div:first-child{
  flex: 1 1 20%;
}
#admin .chart {
  /* border: 1px #333 solid; */
  /* margin: 0 auto; */
  flex: 1 1 60%;
  margin-top: 30px;
  /* margin-left: 450px; */
  padding-left: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#admin .inform-table {
  /* margin-left: 100px; */
  margin: 0 auto;
  width: 75%;
}
#admin .detail-dialog {
  text-align: left;
}
#admin .detail-dialog span{
  color: #409EFF;
  font-weight: bold;
}
#admin .detail-list {
  margin-left: 20px;
  font-size: 13;
  color: #999;
}
</style>
