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

    async handleLogin() {
      // var input = {}
      // input.user = JSON.stringify(this.formdata)
      // 让异步代码看起来像同步代码
      // 1.找到一步操作有结果的代码，前面加上await，同时res接收异步操作的结果
      // 2.找到距离异步操作有结果的代码最近的方法，前面加async
      // ES2017 async+await

      const res = await this.$http.post('http://localhost:8080/CRUD/existUser', this.formdata, { emulateJSON: true })

      if (res.data === '登陆失败') {
        console.log(res)
        this.$message.error(res.data)
      } else {
        this.$message.success(res.data)
        //保存后台返回的"登陆成功"(把这个字符串当做token，返回token需要后台jwt组件)
        localStorage.setItem('token', res.data)
        //跳转home
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>



<style>
.login-wrap {
  /* background-image: url("@\assets\img\科尼赛克AgeraRS.png"); */
  height: 100%;
  background-color: #388be9;
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