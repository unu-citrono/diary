<template>
  <div id="task">
    <span class="titleP">任务清单</span>
    <el-button size="small" type="primary" icon='el-icon-circle-plus' plain @click="showAddTask = true" v-if="isSelf"
      style="margin: -10px 0px 10px -140px"
    >添加</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="全部">
        <task-panel :list="allTaskList" :isSelf='isSelf' @delTask='delTask' @finishTask='finishTask'></task-panel>
      </el-tab-pane>
      <el-tab-pane label="正在进行">
        <task-panel :list="toDoTaskList" :isSelf='isSelf' @delTask='delTask' @finishTask='finishTask'></task-panel>
      </el-tab-pane>
      <el-tab-pane label="已完成" style="text-decoration:line-through">
        <task-panel :list="finishTaskList" @delTask='delTask' :isSelf='isSelf'></task-panel>
      </el-tab-pane>
      <el-tab-pane label="已过期" style="color:#999">
        <task-panel :list="overdueTaskList" @delTask='delTask' :isSelf='isSelf'></task-panel>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加新任务"
      :visible.sync="showAddTask"
      width="30%"
      center>
      <div class="add-task">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input style="width:218px" v-model="form.content" placeholder="请输入新任务"></el-input>
          </el-form-item>
          <el-form-item label="完成日期">
            <el-date-picker 
              v-model="form.deadline" 
              type="date" 
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTask">确 定</el-button>
        <el-button @click="showAddTask = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addTask, getTaskList } from '@/api/api.js'
import TaskPanel from './TaskPanel.vue'
export default {
  props: ['isOthers'],
  components: {
    TaskPanel
  },
  data() {
    return {
      showAddTask: false,
      form: {
        content: '',
        deadline: ''
      },
      isSelf: this.isOthers ? false :true,
      rules: {
        content: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        deadline: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
      },
      pickerOptions: {
        disabledDate(date){
          let zero = new Date().setHours(0, 0, 0, 0)
          if(date.getTime()<zero){
            return true;
          }
          return false;
        }
      },
      allTaskList: [],
      toDoTaskList: [],
      finishTaskList: [],
      overdueTaskList: []
    }
  },
  mounted() {
    getTaskList().then(res => {
      // console.log(res.data.result)
      this.classifyTasks(res.data.result)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 将所有任务分类
    classifyTasks(list) {
      this.toDoTaskList = []
      this.finishTaskList = []
      this.overdueTaskList = []
      let nowTime = new Date().getTime()
      list.forEach( (item, index) => {
        let nTime = item.deadline - nowTime
        if(nTime < 0) {
          list[index].restDay = -1
        } else
         list[index].restDay = Math.floor(nTime/86400000)
      })
      list.forEach( (item, index) => {
        if(item.status == '1') this.finishTaskList.push(item)
        else if(item.restDay >= 0) this.toDoTaskList.push(item)
        else this.overdueTaskList.push(item)
      })
      this.allTaskList = list.sort(this.compare)
    },
    compare (obj1, obj2) {
      var val1 = obj1.restDay;
      var val2 = obj2.restDay;
      if (val1 < val2) {
        return 1;
      } else if (val1 > val2) {
        return -1;
      } else {
        return 0;
      }            
    } ,
    addTask() {
      let param = {
        content:  this.form.content,
        deadline: this.form.deadline,
        status: '0'
      }
      addTask(param).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        console.log(this.allTaskList)
        this.allTaskList.unshift(param)
        this.classifyTasks(this.allTaskList)
        this.showAddTask = false
      })
    },
    finishTask(list) {
      getTaskList().then(res => {
        this.classifyTasks(res.data.result)
      }).catch(err => {
        console.log(err)
      })
    },
    delTask(list) {
      getTaskList().then(res => {
        this.classifyTasks(res.data.result)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
#task *{
  // margin: 0;
  // padding: 0;
  // text-align: left;
}
#task  .task-list  .el-button {
  margin-left: 8px;
  margin-top: 5px;
}
.add-task {
  text-align: center;
  padding: 8px;
}
.add-task .el-input{
  width: 250px;
}
.task-list {
  width: 100%;
  border: 1px solid #dfe0e6;
  border-radius: 4px;
  display: inline-block;
}
.task-list ul{
  width: 100%;
  float: left;
  // margin-top: -10px;
}
#task li {
  list-style: none;
  height: 40px;
}
#task .titleP{
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  font-weight: bold;
  border-left: 3px solid #136aa7;
  padding-left: 12px;
  position: relative;
  margin-bottom: 15px;
  float: left;
}
</style>
