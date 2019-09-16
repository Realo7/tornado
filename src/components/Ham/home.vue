<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/img/logo.png" alt="无法显示图片" />
        </el-col>
        <el-col :span="18">
          <div class="middle"></div>
        </el-col>
        <el-col :span="2">
          <a href="#" class="loginout" @click.prevent="handleSignout()">退出</a>
        </el-col>
      </el-row>
    </el-header>

    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏导航 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="white" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>操作界面</span>
            </template>
            <el-menu-item index="operate">操作界面</el-menu-item>
            <el-menu-item index="worktable">工作台</el-menu-item>
            <el-menu-item index="try">尝试一下</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>客服日志</span>
            </template>
            <el-menu-item index="kefu">服务检索</el-menu-item>
            <el-menu-item index="kefubb">客服报表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user">用户管理</el-menu-item>
            <el-menu-item index="tt">再尝试一下</el-menu-item>
          </el-submenu>

          <el-menu-item index="peizhi">
            <i class="el-icon-setting"></i>
            <span slot="title">配置管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

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
  methods: {
    handleSignout() {
      //清除token
      localStorage.clear()
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








<style>
.container {
  height: 100%;
}
.header {
  background-color: white;
}
.aside {
  background-color: white;
}
.main {
  background-color: rgb(242, 242, 242);
}
.middle {
  text-align: center;
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
</style>