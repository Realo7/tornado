<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="160px" class="aside">
      <!-- 侧边栏导航 -->
      <!-- default-active，默认激活菜单的index -->
      <!-- active-text-color,激活菜单字体的颜色 -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true" text-color="white" active-text-color="#5CA7E7">
        <el-menu-item index="/operate" class="emi">
          <i style="font-size:45px;font-weight: bold;" class="el-icon-menu"></i>
          <br />
          <span style="font-size:22px;">操作</span>
          <br />
          <span style="font-size:22px;">界面</span>
        </el-menu-item>

        <el-menu-item index="/kefu" class="emi">
          <i style="font-size:45px;font-weight: bold;" class="el-icon-document"></i>

          <br />
          <span style="font-size:22px;">客服</span>
          <br />
          <span style="font-size:22px;">日志</span>
        </el-menu-item>

        <el-menu-item index="/user" class="emi">
          <i style="font-size:45px;font-weight: bold;" class="el-icon-user"></i>
          <br />
          <span style="font-size:22px;">远程</span>
          <br />
          <span style="font-size:22px;">呼叫</span>
        </el-menu-item>

        <el-menu-item index="/peizhi" class="emi">
          <i style="font-size:45px;font-weight:bold;" class="el-icon-s-marketing"></i>
          <br />
          <span style="font-size:22px;">图表</span>
          <br />
          <span style="font-size:22px;">展示</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img src="@/assets/img/logo.png" alt="无法显示图片" />
          </el-col>
          <el-col :span="18">
            <div class="middle">
              <span>云座席服务平台</span>
            </div>
          </el-col>
          <el-col :span="2">
            <a style="font-size:24px;font-family:Microsoft YaHei;" href="#" class="loginout" @click.prevent="handleSignout()">退出</a>
          </el-col>
        </el-row>
      </el-header>

      <el-main class="main">
        <!-- 设置容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import bus from './bus';
export default {
  data() {
    return {
      state: false,
      formdata: {
        appId: '',
        privatekey: '',
        datas: {
          userCode: '',
          pwd: '',
          callServerIP: '',
          callServerPort: '',
          logintype: '1'
        }
      },
      operateDetail: {
        appId: '',
        privatekey: '',
        datas: {
          opTm: '',
          userId: '',
          opContentId: '',
          callId: ''
        }
      }
    }
  },
  methods: {
    // changecolor() {
    //   this.state = true
    // },
    handleSignout() {
      //清除token
      localStorage.clear()
      this.handleLoginout()
      //提示
      this.$message.success('退出成功')

      //来到login组件
      this.$router.push({ name: 'login' })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleLoginout() {
      let submit = {}
      submit = JSON.stringify(this.formdata)
      //console.log(submit)
      this.$axios({
        method: 'post',
        // baseURL: 'api', //重写baseURL
        url: '/LoginBISHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    writeDe() {
      let submit = {}
      submit = JSON.stringify(this.operateDetail)
      //console.log(submit)
      this.$axios({
        method: 'post',
        // baseURL: 'api', //重写baseURL
        url: '/WriteCallLogHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    }
  },
  //newVue之前自动触发beforeCreate
  beforeCreate() {
    // 获取token
    const token = localStorage.getItem('token')
    //token 不存在 ->登录
    if (!token) {
      this.$router.push({ name: 'login' })
    }
    //if token 存在 ->继续渲染组件
  }
}
</script>


<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: white;
}
.aside {
  background-color: rgb(92, 167, 231);
  border: none;
}
.main {
  background-color: white;
  font-family: Microsoft YaHei;
}
.middle {
  text-align: center;
  font-family: Microsoft Yahei;
  font-size: 36px;
  /* margin: auto; */
}
.emi {
  height: 150px;
  width: 125px;
  background-color: rgb(92, 167, 231);
  border-radius: 12px 0px 0px 12px;
  margin-left: 40px;
  line-height: 27px;
  margin-top: 60px;
  margin-bottom: 50px;
  border: none;
}
.el-menu-item.is-active {
  background-color: white;
  color: white;
}

.loginout {
  text-decoration-line: none;

  position: absolute;
  right: 1%;
  top: 20px;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.el-menu-vertical-demo {
  background-color: rgb(92, 167, 231);
  font-size: 20px;
  border: none;
}
</style>