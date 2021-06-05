<template>
  <div class="user-info">
    <el-card shadow="never">
      <div class="avatar">
        <el-avatar shape="square" :size="150" fit="fit" :src="avatar"></el-avatar>
        <!-- <el-button icon="el-icon-camera-solid">上传头像</el-button> -->
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :show-file-list="false"
          :http-request="upload"
        >
          <el-button size="small" type="primary" icon="el-icon-camera-solid">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </div>
      <el-form ref="form" :model="form" label-width="80px" class='info-form'>
        <el-form-item label = '用户名'>
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label = '密码'>
           <el-button type="text" style="float:left" @click="showPwd = true">修改密码</el-button>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男" value='男'></el-radio>
            <el-radio label="女" value='女'></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label = '邮箱账号'>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label = '手机号码'>
          <el-input v-model="form.phoneNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeInfo">确认修改</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="修改密码"
      width="30%"
      class="pwd-dialog"
      :visible.sync="showPwd"
      >
      <el-input v-model="newPwd" placeholder="请输入新密码" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPwd = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getUserInfo, updateUserInfo, updateUserPwd } from '@/api/api.js'
export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
        gender: '',
        email: '',
        phoneNum: ''
      },
      avatar: '/api/avatar/' + localStorage.getItem('userId') + '.jpg',
      // avatar: localStorage.getItem('avatar'),
      showPwd: false,
      newPwd: ''
    }
  },
  mounted() {
    getUserInfo().then(res => {
      var result = res.data.result
      this.form.userName = result.userName
      this.form.email = result.email
      this.form.phoneNum = result.phoneNum
      this.form.gender = result.gender
    })
  },
  methods: {
    // 上传头像
    upload(f){
      let formData = new FormData()
      formData.append('file', f.file)

      axios.post('/api/user/upload', formData, {
        headers:{
          "content-type": 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization') || ''
        }
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        var newAvatar = '/api/avatar/' + localStorage.getItem('userId') + '.jpg'
        localStorage.setItem('avatar', newAvatar)
        this.$router.go(0)
      })
    },
    // 修改密码 
    changePwd () {
      let param = {
        password: this.newPwd,
      } 
      updateUserPwd(param).then(res => {
        console.log(res)
        this.showPwd = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    // 修改用户信息
    changeInfo() {
      let param = {
        userName: this.form.userName,
        email: this.form.email,
        gender: this.form.gender,
        phoneNum: this.form.phoneNum
      }
      console.log(param)
      updateUserInfo(param).then(res => {
        console.log(res)
        this.showPwd = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="less">
.user-info {
  width: 1000px;
  margin: 0 auto;
  margin-top: 60px;
}
.info-form {
  width: 400px;
  margin-left: 220px;
  margin-top: 80px;
}
.info-form label {
  font-weight: bold;
}
.avatar {
  float: left;
  left: 315px;
  top: 100px;
  position: absolute;
  width: 150px;
}
.avatar button {
  margin-top: 15px;
}
.pwd-dialog input {
  width: 300px;
}
</style>