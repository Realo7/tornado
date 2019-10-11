<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="160px" class="aside">
      <!-- 侧边栏导航 -->
      <!-- default-active，默认激活菜单的index -->
      <!-- active-text-color,激活菜单字体的颜色 -->
      <el-menu default-active="2" class="el-menu-vertical-demo" :router="true" text-color="white" active-text-color="#5CA7E7">
        <el-menu-item index="operate">
          <i style="font-size:45px;font-weight: bold;color:white" class="el-icon-menu"></i>
          <br />
          <span style="font-size:22px;">操作</span>
          <br />
          <span style="font-size:22px;">界面</span>
        </el-menu-item>

        <el-menu-item index="kefu">
          <i style="font-size:45px;font-weight: bold;color:white" class="el-icon-document"></i>
          <br />
          <span style="font-size:22px;">客服</span>
          <br />
          <span style="font-size:22px;">日志</span>
        </el-menu-item>

        <el-menu-item index="user">
          <i style="font-size:45px;font-weight: bold;color:white" class="el-icon-user"></i>
          <br />
          <span style="font-size:22px;">用户</span>
          <br />
          <span style="font-size:22px;">管理</span>
        </el-menu-item>

        <el-menu-item index="peizhi">
          <i style="font-size:45px;font-weight:bold;color:white;" class="el-icon-s-marketing"></i>
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
              <span>OM寻呼系统</span>
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
  background-color: rgb(92, 167, 231);
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
.el-menu-item {
  height: 150px;
  width: 125px;
  background-color: rgb(92, 167, 231);
  border-radius: 6%;
  margin-left: 33.5px;
  line-height: 27px;
  margin-top: 60px;
  margin-bottom: 50px;
  /* text-align: center; */
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
}
</style>