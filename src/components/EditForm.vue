<template>
  <div class="edit">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="日记属性" style="text-align: left">
        <el-col :span="11">
          <el-select v-model="form.diaryBook" placeholder="请选择日记本">
            <el-option 
              v-for="book in diaryBooks" 
              :key="book.name" 
              :label="book.name"
              :value="book.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-select v-model="form.viewLimit" placeholder="请选择查看权限">
            <el-option label="仅自己可见" value="1"></el-option>
            <el-option label="开放" value="2"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="日记标题">
        <el-input type="text" placeholder="请输入日记标题" v-model="form.title" maxlength="40" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="日记内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 14, maxRows: 16}"
          maxlength="1000"
          show-word-limit
          placeholder="请输入日记内容"
          v-model="form.content">
        </el-input>
      </el-form-item>
      <el-form-item label="添加图片">
        <el-upload 
          style="text-align:left" 
          action="localhost:3000/diary/upload" 
          :data="uploadData"
          :on-success="onSuccess"
          :before-upload="beforeUpload" 
          list-type="picture-card" 
          :auto-upload="false" 
          accept="image/*"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
            <!--  <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span> -->
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>        
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addDairy">添加日记</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from '@/router'
// import axios from 'axios'
import {dateFormat} from '../untils/untils.js'
import qs from 'qs'
export default {
  props: ['diaryBooks'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadData:{
        userId: localStorage.getItem('userId')
      },
      form: {
        title: '',
        content: '',
        diaryBook: '默认笔记本',
        viewLimit: '1'
      },
      rules: {
          title: [
            { required: true, message: '请输入日记标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入日记内容', trigger: 'blur' }
          ],
          diaryBook: [
            { required: true, message: '请选择日记本', trigger: 'change' }
          ],
          viewLimit: [
            { required: true, message: '请选择查看权限', trigger: 'change' }
          ]
      }
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file)
    },
    beforeUpload(file){
        const isLt = file.size/1024/1024
        const isJPG = file.type=='image/jepg'
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (isLt > 4) {
          this.$message.error('上传头像图片大小不能超过 4MB!')
        }
        return isLt&&usJPG;//以此让组件判断是否发起请求
     },
    onSuccess(res) {
      console.log(res)
    },
    addDairy() {
      var that = this
      var params = qs.stringify({
        'title': that.form.title,
        'content': that.form.content,
        'diaryBook': that.form.diaryBook,
        'viewLimit': that.form.viewLimit,
        'userId': localStorage.getItem('userId'),
        'createTime': dateFormat('YYYY/mm/dd HH:MM', new Date())
      })
      that.axios.post('/diary/addDiary', params, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(response)
        router.push({name: 'Home'})
        that.$message({
          message: '创建成功',
          type: 'success'
        })
        that.$emit('closeEdit', false)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
.edit {
  width: 600px;
}
</style>
