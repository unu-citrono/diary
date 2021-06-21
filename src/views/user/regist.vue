<template>
   <div>
    <div class="background">
       <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="regist">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
        <el-form-item label="用户名" prop='userName'>
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='checkPasswordword'>
          <el-input v-model="form.checkPasswordword" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱帐号" prop='email'>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop='phoneNum'>
          <el-input v-model="form.phoneNum"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="submit-bt" @click="regist"> 注册 </el-button>
        </el-form-item>
        <el-form-item style="margin-top: -25px">
          <!-- <el-col :span="11">
            <el-link type="primary" :underline="false">忘记密码了</el-link>
          </el-col> -->
          <el-col :span="11">
            <el-link type="primary" :underline="false" >我要去登录</el-link>
          </el-col>
        </el-form-item>
      </el-form>
       <!-- <el-button type="primary" class="submit-bt" width='200px' @click="onSubmit"> 登录 </el-button> -->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { regist } from '@/api/api.js'
import router from '@/router'
export default {
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      form: {
        userName: '',
        password: '',
        checkPasswordword: '',
        email: '',
        phoneNum: ''
      },
      imgSrc: require('@/assets/images/bg3.jpg'),
      rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPasswordword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type:'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          phoneNum: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { len: 11, message: '请输入正确的手机号码', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    regist() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var params = {
            'userName': this.form.userName,
            'password': this.form.password,
            'email': this.form.email,
            'phoneNum': this.form.phoneNum
          }
          regist(params).then(res => {
            console.log(res)
            localStorage.setItem('avatar', '/api/avatar/default.jpg')
            router.push({name: 'Login'})
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.regist {
  display: block;
  top: 35%;
  left: 50%;
  margin: -100px 0 0 -100px;
  text-align: center;
  line-height: 180px;

  width: 400px;
  // border: 1px solid #ebebeb;
  // border-radius: 4px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // transition: .2s;
  padding: 24px;
  
  z-index: 1;
  position: absolute;
}
</style>
