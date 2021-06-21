<template>
  <div>
    <li id="diary-item">
      <div>
        <el-avatar @click.native=getUser() :src="avatar"></el-avatar>
      </div>
      <div>
        <p>{{diaryItem.title}}
          <span class="mood-text">
          <span class="time">{{diaryItem.createTime}}</span>
            心情指数
            <i class="el-rate__icon icon-rate-face-1" v-if="diaryItem.mood == '1' || diaryItem.mood == '2'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-2" v-if="diaryItem.mood == '3' || diaryItem.mood == '4'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-3" v-if="diaryItem.mood == '5'" style="color: #ffcd12;"></i>
          </span>
        </p>
        <p>{{diaryItem.text}}</p>
        <el-button type="text" style="color:#409EFF;margin-left:10px" @click="showDetail = true">查看详情</el-button>
        <el-link type="danger" :underline=false style="margin-left:10px" @click="showInform = true">举报</el-link>
      </div>      
    </li>
    <el-divider style="margin-top: -10px"></el-divider>
    <!-- 预览 -->
    <el-dialog
      title="日记详情"
      :visible.sync="showDetail"
      width="50%"
      center>
      <div class="preview" v-html="diaryItem.content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 举报 -->
    <el-dialog
      title="我要举报"
      :visible.sync="showInform"
      width="30%"
      center>
        <el-radio-group v-model="informTypeRadio" @change="onChange" class="inform-radio">
          <el-radio label="illegal">违法信息</el-radio>
          <el-radio label="personalArrack">人身攻击</el-radio>
          <el-radio label="pornographic">色情</el-radio>
          <el-radio label="AD">垃圾广告</el-radio>
          <el-radio label="other">其他</el-radio>
        </el-radio-group>
        <div v-if="showInput" class="inform-input">
          <span>为帮助审核人员更快处理，请补充详细信息</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="informContent"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="informDiary">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { informDiary } from '@/api/api.js'
export default {
  props: ['diaryItem'],
  data () {
    return {
      userName: '',
      showDetail: false,
      showInput: false,
      showInform: false,
      informTypeRadio: '',
      informContent: '',
      avatar: '/api/avatar/' + this.diaryItem.userId + '.jpg' 
    }
  },
  mounted() {
    // console.log(this.diaryItem)
    // console.log(this.diaryItem.mood == 5)
  },
  methods: {
    getUser() {
      console.log(this.diaryItem)
      this.$router.push({name: 'User', params: {userId: this.diaryItem.userId}})
    },
    // 举报单选组值变化
    onChange(label) {
      if(label == 'other') this.showInput = true
      else {
        this.showInput = false
      }
    },
    // 举报日记
    informDiary() {
      let param = {
        _id: this.diaryItem._id,
        informType: this.informTypeRadio
      }
      // 判断是否为其他类型举报
      if(this.informTypeRadio == 'other') param.informContent = this.informContent
      informDiary(param).then(res => {
        console.log(res)
        this.showInform = false
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
#diary-item * {
  margin: 0;
  padding: 0;
}
#diary-item {
  display: flex;
  width: 1000px;
}
#diary-item div:first-child{
  flex: 0 0 5%;
  padding: 10px;
}
#diary-item div:first-child p{
  font-size: 14px;
}
#diary-item div:nth-child(2){
  flex: 0 0 95%;
  text-align: left;
}
#diary-item div:nth-child(2) p{
  margin: 10px;
}
#diary-item div:nth-child(2) p:first-child{
  font-weight: bold;
}
#diary-item div:nth-child(2) p:nth-child(2){
  color: rgba(0,0,0,.45);
  font-size: 14px;
  // margin-bottom: 0;
  overflow: hidden; 
  text-overflow: ellipsis;
  display: -webkit-box; 
  /* autoprefixer: off */
  -webkit-box-orient: vertical; 
  /* autoprefixer: on */
  -webkit-line-clamp:4; 
} 
#diary-item .mood-text {
  font-size: 14px;
  color: #303133;
  font-weight: normal;
  float: right;
}
.inform-radio {
  margin: 0 auto;
  padding-left: 60px;
}
.inform-input {
  margin-top: 18px;
  padding-left: 60px;
  font-size: 14px;
  color: #999;
}
.inform-radio .el-radio {
  width: 40%;
  margin-top: 20px;
}
</style>
