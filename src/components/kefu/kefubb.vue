<template>
  <div>
    <el-row :gutter="8" type="flex" class="row-bg" justify="start">
      <el-col :span="8" class="row-bg">
        <div v-model="stops" class="grid-l2">
          <h3>车辆停放信息</h3>
          车场名称：{{stops.name}}
          <br />
          车辆牌号：{{stops.name}}
          <br />
          入场时间：{{stops.name}}
          <br />
          出场时间：{{stops.name}}
          <br />
          入场通道：{{stops.name}}
          <br />
          出场通道：{{stops.name}}
          <br />
          停车类型：{{stops.name}}
          <br />
          车辆型号：{{stops.name}}
          <br />
          账单金额：{{stops.name}}
          <br />
          入场照片：{{stops.name}}
          <br />
        </div>

        <div class="grid-l2-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%" />
        </div>
      </el-col>
      <el-col :span="8">
        <div v-model="stops" class="grid-l2">
          <h3>呼叫处理信息</h3>
          车场名称：{{stops.name}}
          <br />
          呼叫通道：{{stops.name}}
          <br />
          入场牌号：{{stops.name}}
          <br />
          呼叫原因：{{stops.name}}
          <br />
          呼叫方式：{{stops.name}}
          <br />
          客服人员：{{stops.name}}
          <br />
          账单组成：{{stops.name}}
          <br />
          客户呼叫时间：{{stops.name}}
          <br />
          客户接听时间：{{stops.name}}
          <br />
          服务挂断时间：{{stops.name}}
          <br />
          客服服务时长：{{stops.name}}
          <br />
          呼叫照片：{{stops.name}}
          <br />
        </div>

        <div class="grid-l2-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2" v-cloak>
          <h3>呼叫处理记录</h3>
          <el-table :data="tableData" style="margin:0 " max-height="350">
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column prop="name" label="车牌号"></el-table-column>
            <el-table-column prop="address" label="对应操作"></el-table-column>
          </el-table>
        </div>

        <div class="grid-l2-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stops: {
        name: '停车场名称',
        carnum: '车辆牌号'
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>
<style scoped>
.grid-l2 {
  background-color: white;
  border-radius: 4px;
  min-height: 63%;
  padding: 20px;
  line-height: 35px;
}

.grid-l2-2 {
  background-color: rgb(99, 75, 206);
  border-radius: 4px;
  min-height: 30%;
  margin-top: 0.1%;
}

.row-bg {
  min-height: 800px;
}

[v-cloak] {
  display: none !important;
}
</style>