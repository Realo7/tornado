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
          <a href="#" class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
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