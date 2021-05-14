<template>
  <div class="diary-list">
    <el-card class="box-card"  v-for="diary in diaryList" :key="diary._id">
      <div slot="header" class="clearfix">
        <span class="card-title">{{diary.title}}</span>
        <div style="float: right; padding: 3px 0">
          <span class="time">{{diary.createTime}}</span>
          <span class="time" v-if="diary.viewLimit == 1">仅对自己可见</span>
          <span class="time" v-if="diary.viewLimit == 2">开放可见</span>
        </div>
      </div>
      <div class="text item">
        {{diary.content}}
      </div>
        <el-button type="text">编辑</el-button>
        <!-- <el-button type="text">删除</el-button> -->
        <el-popconfirm
          title="确定删除吗？"
          :confirm='deleteDiary(diary._id)'
        >
          <el-button style="margin-left: 15px" type="text" slot="reference">删除</el-button>
        </el-popconfirm>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      diaryList: this.$route.params.list,
      diaryList1: [
        {
          _id: '1',
          title: '1111111',
          content: '在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下',
          diaryBook: '默认笔记本',
          viewLimit: '2',
          createTime: '2021/05/05 12:32'
        },
        {
          _id: '2',
          title: '1111111',
          content: '在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下',
          diaryBook: '默认笔记本',
          viewLimit: '1',
          createTime: '2021/05/05 12:32'
        },
        {
          _id: '3',
          title: '1111111',
          content: '在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下',
          diaryBook: '默认笔记本',
          viewLimit: '2',
          createTime: '2021/05/05 12:32'
        },
        {
          _id: '4',
          title: '1111111',
          content: '在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下',
          diaryBook: '默认笔记本',
          viewLimit: '2',
          createTime: '2021/05/05 12:32'
        },
        {
          _id: '5',
          title: '我是标题',
          content: '在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下',
          diaryBook: '默认笔记本',
          viewLimit: '2',
          createTime: '2021/05/05 12:32'
        }
      ]
    }
  },
  methods: {
    deleteDiary() {
      console.log('delete')
    }
  }
}
</script>

<style lang="less">
.diary-list {

}
.box-card {
  margin: 0 auto;
  width: 1000px;
  margin-bottom: 30px;
  text-align: left;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
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
