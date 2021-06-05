<template>
  <div id="diary-list">
    <el-card class="box-card"  v-for="(diary, index) in currentList" :key="diary._id">
      <div slot="header" class="clearfix">
        <span class="card-title">{{diary.title}}</span>
        <div style="float: right; padding: 3px 0">
          <span class="time">{{diary.createTime}}</span>
          <span class="mood-text">
            心情指数
            <i class="el-rate__icon icon-rate-face-1" v-if="diary.mood == '1' || diary.mood == '2'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-2" v-if="diary.mood == '3' || diary.mood == '4'" style="color: #ffcd12;"></i>
            <i class="el-rate__icon icon-rate-face-3" v-if="diary.mood == '5'" style="color: #ffcd12;"></i>
          </span>
          <span class="time" v-if="diary.viewLimit == 1">仅对自己可见</span>
          <span class="time" v-if="diary.viewLimit == 2">开放可见</span>
        </div>
      </div>
      <div class="diary-item">
        <p>{{diary.text}}</p>
      </div>
      <el-button type="text" style="color:#409EFF;" @click="showDiaryDetail(diary.content)">查看详情</el-button>
      <el-link :underline="false" type='primary'  v-if="isSelf" style="margin: 0px 15px"  @click="editForm(diary)">
        <i class="el-icon-edit"></i>编辑
      </el-link>
      <el-popconfirm title="确定删除吗？" @confirm='deleteDiary(diary._id, index)' v-if="isSelf">
        <el-link slot="reference" :underline="false" type='danger' v-if="isSelf" style="margin: 0px 15px">
          <i class="el-icon-delete"></i>删除
        </el-link>
      </el-popconfirm>
    </el-card>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="diaryList.length"
        :current-page="currentPage"
        :page-size='pageSize'
        hide-on-single-page
        @current-change='pageChange'>
      </el-pagination>
    </div>
    <el-dialog
      title="日记详情"
      :visible.sync="showDetail"
      width="50%"
      center>
      <div class="preview" v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteDiary } from '@/api/api.js'
export default {
  props: ['propList', 'isOthers'],
  data () {
    return {
      // diaryList: this.propList ? this.propList.splice(0, 5) : this.$route.params.list,
      diaryList: this.propList,
      currentList: [],
      showDetail: false,
      pageSize: 10,
      content: '',
      isSelf: this.isOthers ? false :true,
      currentPage: 1
    }
  },
  mounted() {
    this.currentList = this.diaryList.slice(0, 10)
  },
  watch: {
    propList: {
      handler(newValue, oldValue) {
        this.diaryList = newValue
        this.currentList = this.diaryList.slice(0, 10)
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    deleteDiary(id, index) {
      console.log(id)
      let param = {
        id: id
      }
      deleteDiary(param).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.diaryList.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看日记详情
    showDiaryDetail(content) {
      this.content = content
      this.showDetail = true
    },
    editForm(diary) {
      this.$router.push({name: 'EditDiary', params: {diary: diary}})
    },
    pageChange(page) {
      let start = this.pageSize * (page - 1)
      let end = start + this.pageSize
      this.currentList = this.diaryList.slice(start, end)
    }
  }
}
</script>

<style lang="less">
#diary-list {
  width:100%;
  margin: 0 auto;
}
#diary-list .mood-text {
  color: rgba(0,0,0,.45);
  font-size: 14px;
  // float: none;
}
.box-card {
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
}
.text {
  font-size: 14px;
}
#diary-list .diary-item {
  margin-bottom: 18px;
}
#diary-list .diary-item p {
  overflow: hidden; 
  text-overflow: ellipsis;
  display: -webkit-box; 
  /* autoprefixer: off */
  -webkit-box-orient: vertical; 
  /* autoprefixer: on */
  -webkit-line-clamp:2; 
}
#diary-list .preview {
  overflow: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
