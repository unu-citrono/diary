<template>
  <div>
    <li id="diary-item" >
      <div>
        <el-avatar @click.native=getUser() :src="avatar"></el-avatar>
        <!-- <p>用户名</p> -->
      </div>
      <div>
        <p>{{diaryItem.title}}
          <span class="mood-text">
            心情指数
            <i class="el-rate__icon icon-rate-face-1" v-if="diaryItem.mood == '1' || diaryItem.mood == '2'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-2" v-if="diaryItem.mood == '3' || diaryItem.mood == '4'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-3" v-if="diaryItem.mood == '5'" style="color: #ffcd12;"></i>
          </span>
        </p>
        <p>{{diaryItem.text}}</p>
        <el-button type="text" style="color:#409EFF;margin-left:10px" @click="showDetail = true">查看详情</el-button>
      </div>      
    </li>
    <el-divider style="margin-top: -10px"></el-divider>
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
  </div>
</template>

<script>
export default {
  props: ['diaryItem'],
  data () {
    return {
      userName: '',
      showDetail: false,
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
</style>
