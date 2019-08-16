<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/img/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18">
          <h3 class="middle">头部标题newbee</h3>
        </el-col>
        <el-col :span="2">
          <a href="#" class="loginout" @click.prevent="handleSignout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏导航 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#d3dce6" unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>操作界面</span>
            </template>

            <el-menu-item index="1-1">操作界面</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>客服日志</span>
            </template>

            <el-menu-item index="2-1">客服姓名下拉菜单</el-menu-item>
            <el-menu-item index="2-2">开始时间检索</el-menu-item>
            <el-menu-item index="2-3">结束时间检索</el-menu-item>
            <el-menu-item index="2-4">车场名称检索</el-menu-item>
            <el-menu-item index="2-5">车牌号检索</el-menu-item>
            <el-menu-item index="2-6">检索按钮</el-menu-item>
            <el-menu-item index="2-7">客服报表</el-menu-item>
          </el-submenu>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">配置管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
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
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.middle {
  text-align: center;
}
.loginout {
  text-decoration-line: none;

  position: relative;
  left: 80%;
  top: 20px;
}
</style>