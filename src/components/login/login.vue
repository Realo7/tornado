<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.datas.userCode"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formdata.datas.pwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button
        class="login-btn"
        type="primary"
        @click.prevent="handleLogin()"
        round
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import homeVue from '../Ham/home.vue'
export default {
  data () {
    return {
      formdata: {
        appId: '',
        privatekey: '',
        datas: {
          userCode: '',
          pwd: '',
          callServerIP: '',
          callServerPort: '',
          logintype: '0'
        }
      }
    }
  },
  methods: {
    handleLogin () {
      let submit = {}
      submit = JSON.stringify(this.formdata)
      console.log('ru' + submit)
      //console.log(submit)
      this.$axios({
        method: 'post',
        // baseURL: 'http://192.168.1.99:3830/Handlers', 重写baseURL
        url: '/LoginBISHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit
      })
        .then(res => {
          console.log(res)
          //保存后台返回的token到localStorage
          localStorage.setItem('token', res.data.datas)
          localStorage.setItem('user', this.formdata.datas.userCode)
          //跳转home
          if (res.data.statusCode == '200') {
            this.$router.push({ name: 'home' })
          } else {
            alert('账号或者密码错误')
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
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