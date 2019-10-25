<template>
  <div>
    <el-tabs tabPosition="left" type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 我的行程
        </span>
        <el-button type="primary" icon="el-icon-phone">0号分机</el-button>
        <el-button type="primary" icon="el-icon-phone">1号分机</el-button>
        <el-button type="primary" icon="el-icon-phone">2号分机</el-button>
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.el-tabs {
  height: 800px;
}
.el-tabs__nav {
  height: 100%;
}
.el-tabs__item {
  height: 15%;
  text-align: center;
  padding-top: 20%;
  font-size: 24px;
  font-family: Mircosoft YaHei;
}
.el-button {
  height: 100px;
  width: 150px;
  font-size: 26px;
}
</style>