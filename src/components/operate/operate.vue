<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple">
          这是操作窗口界面DIV1
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
          这是操作窗口界面DIV2
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data(){
        
    }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>