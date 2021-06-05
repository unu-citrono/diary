<template>
  <div style="width:1000px;margin: 0 auto">
    <div style="margin-top: 20px;float:left;margin-bottom: 20px">
      <span class="book-title">{{bookName}}</span>
      <el-input size="small" placeholder="请输入关键字" v-model="searchInput" class="book-search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    
    <!-- <div style="width: 400px">
      <el-input placeholder="请输入关键字" v-model="searchInput">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div> -->
    <diary-list :propList='diaryList'></diary-list>
  </div>
</template>

<script>
import DiaryList from '@/components/DiaryList.vue'
import { htmlToText } from '@/untils/untils.js'
import {searchDiary} from '@/api/api.js'
export default {
  components: {
    DiaryList
  },
  data() {
    return {
      diaryList: this.$route.params.list,
      bookName: this.$route.params.bookName,
      searchInput: '',
      // diaryList: []
    }
  },
  methods: {
    search() {
      searchDiary({'keyword': this.searchInput}).then( res => {
         var list = res.data.result.diaryList      
        this.diaryList = htmlToText(list)
      }).catch(err => {
        console.log(err)
      }) 
    }
  }
  // mounted() {
  //   console.log(this.$route.param.list)
  //   this.diaryList = this.$route.param.list
  // }
}
</script>

<style lang="less">
.book-title {
  font-size: 18px;
  font-weight: bold;
  // float: left;
}
.book-search {
  margin-left: 16px;
  width: 260px;
}
</style>
