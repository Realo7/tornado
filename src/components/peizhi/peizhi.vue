<template>
  <div>
    <el-row :gutter="10" type="flex" justify="start">
      <el-col :span="8" class="row-bg">
        <div class="grid-l1">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
          <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
          <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
        </div>

        <div class="grid-l1-2">
          <el-progress type="circle" :percentage="0"></el-progress>
          <el-progress type="circle" :percentage="25"></el-progress>
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" :percentage="70" status="warning"></el-progress>
          <el-progress type="circle" :percentage="50" status="exception"></el-progress>
        </div>

        <div class="grid-l1-2"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2"></div>

        <div class="grid-l2-2"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l3">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">dio</el-menu-item>
            <el-menu-item index="3">jojo</el-menu-item>
          </el-menu>
        </div>

        <div class="grid-l3-2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.grid-l1 {
  background-color: rgb(41, 142, 182);
  border-radius: 4px;
  min-height: 32%;
}
.grid-l1-2 {
  background-color: rgb(41, 142, 182);
  border-radius: 4px;
  min-height: 30%;
  margin-top: 4%;
}

.grid-l2 {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 64%;
}
.grid-l2-2 {
  background-color: rgb(99, 75, 206);
  border-radius: 4px;
  min-height: 30%;
  margin-top: 4%;
}

.grid-l3 {
  background-color: rgb(194, 124, 59);
  border-radius: 4px;
  min-height: 48%;
}
.grid-l3-2 {
  background-color: rgb(78, 230, 78);
  border-radius: 4px;
  min-height: 46%;
  margin-top: 3.5%;
}

.row-bg {
  min-height: 850px;
}
</style>