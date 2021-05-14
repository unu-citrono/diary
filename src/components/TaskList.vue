<template>
  <div class="task">
    <p class="titleP">任务清单</p>
    <div class="task-list">
      <ul>
        <li v-for="item in list" :key="item.id">
          <p >
            <i class="el-icon-tickets"></i>
            <span>{{item.content}}</span>
            <span class="rest-span">剩余10天</span>
            <el-button class="status-btn" size="mini">完成</el-button>
            
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {id: '1', content: '看完一本书', endLine: '2021-5-20', status: '2'},
        {id: '2', content: '看完一部电影', endLine: '2021-5-9', status: '2'},
        {id: '3', content: '通关一个游戏', endLine: '2021-10-20', status: '2'}
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.task {
  text-align: left;
}
.task-list {
  width: 400px;
  border: 1px solid #dfe0e6;
  border-radius: 4px;
  display: inline-block;
}
.task-list ul{
  width: 400px;
  float: left;
}
.task-list li {
  list-style: none;
  text-align: left;
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
.rest-span {
  font-size: 13px;
  color: #999;
  margin-left: 30px;
}
.status-btn {
  float: right;
  // text-align: right;
  margin-right: 58px!important;
}
</style>
