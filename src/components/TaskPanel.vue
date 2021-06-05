<template>
  <div>
    <li v-for="(item,index) in list" :key="item._id">
      <div class="task-item">
        <div>
          <!-- <i class="el-icon-tickets"></i> -->
          <el-checkbox 
            @change="onChange(item, index)"
            :disabled="item.status == '1' || item.restDay == -1"
            :class="{'del-line': (item.status == '1' || item.restDay == -1)}"
            >
            {{item.content}}
          </el-checkbox>
        </div>
        <div v-if="isSelf">
          <span class="rest-span" v-if="item.status == 0 && item.restDay != -1" style="margin-right: 13px">
            剩余{{item.restDay}}天
          </span>
          <el-popover placement="top" :ref="`popover-${item._id}`">
            <div style="text-align: right; ">
              <div class="edit-popover">
                <h3>修改任务</h3>
                <el-input v-model="modifyInput" placeholder="请输入新名称"></el-input>
                <el-button size="mini" type="text" @click="$refs[`popover-${item._id}`][0].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="$refs[`popover-${item._id}`][0].doClose();modifyTask(item._id, index)">确定</el-button>
              </div>
            </div>
            <el-link  slot="reference" :underline="false" type='primary' v-if="item.status == 0 && item.restDay != -1" style="margin-right: 20px">
              <i class="el-icon-edit"></i>
            </el-link>
          </el-popover>
          <el-link :underline="false" type='danger' style="margin-right: 5px" @click="delTask(item._id, index)">
            <i class="el-icon-delete"></i>
          </el-link>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import {deleteTask, modifyTask, finishTask} from '@/api/api.js'
export default {
  props: ['list', 'isSelf'],
  data () {
    return {
      isOver: false,
      isModify: false,
      editVisible: false,
      // taskList: this.list,
      modifyInput: ''
    }
  },
  methods: {
    onChange (task, index) {
      // console.log(value)
      // if(task.status == '0') {
        finishTask({_id: task._id}).then(res => {
          this.list[index].status = '1'
          this.$emit('finishTask', this.list)
        })
      // }
    },
    modifyTask (id, index) {
      let param = {
        _id: id,
        content: this.modifyInput
      }
      modifyTask(param).then(res => {
        this.list[index].content = this.modifyInput
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    delTask (id, index) {
      deleteTask({_id: id}).then(res => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        let delList = this.list
        delList.splice(index, 1)
        this.$emit('delTask')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
.task-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
}
.task-item:first-child {
  flex: 1 1 50%;
  line-height: 37px;
}
.task-item:nth-child(2) {
  flex: 1 1 50%;
  height: 40px;
}
.task-item  .el-button {
  // padding: 12px 20px;
  margin-left: 8px;
  margin-top: 5px;
}
.rest-span {
  font-size: 13px;
  color: #999;
  margin-left: 30px;
}
.del-line span{
  text-decoration: line-through;
}
</style>
