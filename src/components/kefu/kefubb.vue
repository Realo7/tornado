<template>
  <div>
    <el-row :gutter="8" type="flex" class="row-bg" justify="start">
      <el-col :span="8" class="row-bg">
        <div v-model="stops" class="grid-l2">
          <h3>车辆交易信息</h3>
          流水号：{{dealinfo.tradingInfoID}}
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
          停车状态：{{dealinfo.dealState}}
          <br />
        </div>
        <!-- 入场图片 -->
        <div class="grid-l2-2">
          <el-image :src="dealinfo.picin" fit="fill">
            <div slot="error" class="image-slot">
              <img src="@/assets/img/defaultshow.png" width="100%" />
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div v-model="stops" class="grid-l2">
          <h3>呼叫处理信息</h3>
          呼叫编号：{{detail.callId}}
          <br />
          呼叫时间：{{detail.callTm}}
          <br />
          应答时间：{{detail.answerTm}}
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
        </div>
        <!-- 出厂图片 -->
        <div class="grid-l2-2">
          <el-image :src="dealinfo.picout" fit="fill">
            <div slot="error" class="image-slot">
              <img src="@/assets/img/defaultshow.png" width="100%" />
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l3" v-cloak>
          <div class="btn">
            <el-button @click="back01">返回</el-button>
          </div>
          <h3>操作记录</h3>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import kefuVue from './kefu.vue'
export default {
  data() {
    return {
      defaultImg: '',
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
    },
    back01() {
      this.$router.push({ name: 'kefu' })
    }
  },

  mounted() {
    this.getdetail()
  }
}
</script>
<style scoped>
.grid-l2 {
  background-color: rgb(248, 248, 252);
  border-radius: 4px;
  min-height: 69%;
  padding: 20px;
  line-height: 35px;
}

.grid-l2-2 {
  /* background-color: rgb(99, 75, 206); */
  border-radius: 4px;
  min-height: 30%;
  margin-top: 0.1%;
  /* background-color: rgb(248, 248, 252); */
}

.row-bg {
  min-height: 800px;
}
.grid-l3 {
  background-color: rgb(248, 248, 252);
  border-radius: 4px;
  height: 99%;
  padding: 20px;
  line-height: 35px;
}
.btn {
  float: right;
}
.h3 {
  width: 50%;
  /* display: inline-block; */
}

[v-cloak] {
  display: none !important;
}
</style>