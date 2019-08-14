<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" @click.prevent="handleLogin()" round>登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    //登录请求

    handleLogin() {
      // var input = {}
      // input.user = JSON.stringify(this.formdata)

      this.$http.post('CRUD/existUser', this.formdata, { emulateJSON: true }).then(res => {
        if (res.data === '登陆成功') {
          this.$message.success(res.data)
          //跳转home
          this.$router.push({ name: 'home' })
        } else {
          console.log(res)
          this.$message.error(res.data)
        }
      })
    }
  }
}
</script>



<style>
.login-wrap {
  /* background-image: url("@\assets\img\科尼赛克AgeraRS.png"); */
  height: 100%;
  background-color: #557daa;
  /* 弹性盒子布局 */
  display: flex;
  /* 对齐方式 */
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>