<template>
  <div>
    <el-row :gutter="8" type="flex" class="row-bg" justify="start">
      <el-col :span="8" class="row-bg">
        <div v-model="stops" class="grid-l2">
          <h3>车辆交易信息</h3>
          总表交易流水号：{{dealinfo.tradingInfoID}}
          <br />
          停车场名称：{{dealinfo.parkName}}
          <br />
          票号：{{dealinfo.ticketCode}}
          <br />
          车牌号：{{dealinfo.plate}}
          <br />
          入场时间：{{dealinfo.inTm}}
          <br />
          当前时间：{{dealinfo.nowTm}}
          <br />
          出场时间：{{dealinfo.outTime}}
          <br />
          应收金额：{{dealinfo.shouldPayM}}
          <br />
          优惠金额：{{dealinfo.couponPayM}}
          <br />
          实收金额：{{dealinfo.realPayM}}
          <br />
          停车类型：{{dealinfo.dealMode}}
          <br />
          入场图片：{{dealinfo.picin}}
          <br />
          出厂图片：{{dealinfo.picout}}
          <br />
          停车状态：{{dealinfo.dealState}}
          <br />
        </div>

        <div class="grid-l2-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%" />
        </div>
      </el-col>
      <el-col :span="8">
        <div v-model="stops" class="grid-l2">
          <h3>呼叫处理信息</h3>
          呼叫编号：{{detail.callId}}
          <br />
          呼叫时间：{{detail.callTm}}
          <br />
          回答时间：{{detail.answerTm}}
          <br />
          挂断时间：{{detail.hangUpTm}}
          <br />
          通话时长：{{detail.duration}}
          <br />
          呼叫出入口名称：{{detail.callDevice}}
          <br />
          呼叫方式：{{detail.callType}}
          <br />
          呼叫原因：{{detail.callReason}}
          <br />
          服务员工：{{detail.useName}}
          <br />
          设备类型：{{detail.devTag}}
          <br />
          <!-- 停放记录信息：{{dealinfo}}
          <br />-->
          <!-- 呼叫照片：{{stops.name}}
          <br />-->
        </div>

        <div class="grid-l2-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2" v-cloak>
          <h3>操作记录</h3>
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
      detail: '',
      dealinfo: [],
      operateLogList: '',
      stops: {
        name: '停车场名称',
        carnum: '车辆牌号'
      }
    }
  },
  methods: {
    getdetail() {
      let list = this.$route.params.list
      console.log(list)
      this.detail = list
      this.dealinfo = JSON.parse(list.dealInfo)
      this.operateLogList = JSON.parse(list.operateLogList)
    }
  },
  mounted() {
    this.getdetail()
  }
}
</script>
<style scoped>
.grid-l2 {
  background-color: white;
  border-radius: 4px;
  min-height: 69%;
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