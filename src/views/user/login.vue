<template>
  <div>
    <!-- <my-header></my-header> -->
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="login">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="form">
        <el-form-item label="用户名" prop='userName'>
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="submit-bt" @click="login"> 登录 </el-button>
        </el-form-item>
        <el-form-item style="margin-top: -25px">
          <el-col :span="11">
            <el-link type="primary" :underline="false" @click="dialogFormVisible = true">忘记密码了</el-link>
          </el-col>
          <el-col :span="11">
            <el-link type="primary" :underline="false" @click='regist'>我要去注册</el-link>
          </el-col>
        </el-form-item>
      </el-form>
       <!-- <el-button type="primary" class="submit-bt" width='200px' @click="onSubmit"> 登录 </el-button> -->
    </div>
    <el-dialog title="忘记密码" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="forgetForm" label-width="100px">
        <el-form-item label="新密码">
          <el-input v-model="forgetForm.password" 请输入新密码></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="forgetForm.checkPassword" 请再次输入新密码></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from '@/router'
import MyHeader from '@/components/header.vue'
import { mapMutations } from 'vuex'
import { login } from '@/api/api.js'
  export default {
    components: {
      MyHeader
    },
    data() {
      return {
        dialogFormVisible: false,
        forgetForm: {
          password: '',
          checkPassword: ''
        },
        form: {
          userName: '',
          password: ''
        },
        imgSrc: require('@/assets/images/bg3.jpg'),
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      regist() {
        router.push({name: 'Regist'})
      },
      login() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let params = {
              'userName': this.form.userName,
              'password': this.form.password
            }
            let _this = this
            login(params).then((res) => {
              console.log(res)
              if(res.data.status == '200') {
                _this.userToken = res.data.result.token
                _this.userId = res.data.result.userId
                // 将用户token保存到vuex中
                _this.changeLogin({ Authorization: _this.userToken, userId: _this.userId })
                // location.reload()
                // 跳转路由
                if(this.form.userName == 'admin') this.$router.push({name: 'Admin'})
                else this.$router.push({name: 'UserHome'})
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
              } else {
                this.$message.error('用户名或密码错误')
              }
             
            }).catch(error => {
              this.$message.error('账号或密码错误')
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      }
    }
  }
</script>
<style lang="less">
.login {
  display: block;
  top: 50%;
  left: 60%;
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
.login .form {
  width: 350px;
  display: block;
  margin-top: 0em;
}
.background{
    width:98%;  
    height:98%;  /**宽高98%是为了图片铺满屏幕且没有滚动条 */
    z-index:-1;
    position: absolute;
}
.submit-bt {
  width: 250px;
}
</style>
