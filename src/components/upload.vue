<template>
  <div id="upload">
    <h3>头像上传</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :http-request="upload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { upload } from '@/api/api.js'
import axios from 'axios'
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        name: ''
      }
    }
  },
  methods:{
    upload(f){
      let formData = new FormData()
      formData.append('file', f.file)
      formData.append('name', '123')

      axios.post('/api/user/upload', formData, {
        headers:{
          "content-type": 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization') || ''
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
