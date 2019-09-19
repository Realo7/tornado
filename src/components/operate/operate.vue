<template>
  <div>
    <el-row :gutter="10" type="flex" class="row-bg" justify="center">
      <el-col :span="11" class="row-bg">
        <div class="grid-l1">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%;" />
        </div>

        <div class="grid-l1-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%;" />
        </div>

        <!-- 中间上方部分 -->
        <div class="grid-l1-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-l2">
          <span class="spadingl2">呼叫话机的编号</span>
          <div v-for="(item,key) of address">
            <div v-for="inneritem of item">{{inneritem.id}}</div>
          </div>
          <div class="spadingl2">通话编号{{address.callid}}</div>
          <br />
          <span class="spadingl2" v-if="callback">停车场名称{{callback.parkName}}</span>

          <span class="tit01">{{tradeback.Plate}}</span>
          <div style="text-align:center; vertical-align:middel;padding:30px;">
            <!-- <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>-->
          </div>
        </div>

        <div class="grid-l2-2">
          <span class="tit01">
            {{tradeback.ComboMeal}}
            <br />
            {{tradeback.ShouldPayM}}
          </span>
          <span class="tit02">
            应收金额(元)：{{tradeback.ShouldPayM}}
            <br />
            优惠金额(元)：{{tradeback.CouponPayM}}
            <br />
            实收金额(元)：{{tradeback.RealPayM}}
            <br />
            <!-- 套 餐 类 型 ：{{tradeback.ComboMeal}} -->
            免费离场时间：{{tradeback.FreeLeaveTime}}
          </span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-l3">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="停车详情" name="first">
              <div>
                <br />
                <span class="spading">付费ID：{{tradeback.PayDetailID}}</span>
                <br />
                <span class="spading">票号：{{tradeback.TicketCode}}</span>
                <br />
                <span class="spading">入场时间：{{tradeback.InTm}}</span>
                <br />
                <span class="spading">当前时间：{{tradeback.NowTM}}</span>
                <br />
                <span class="spading">停留时长：{{tradeback.LeaveTime}}</span>
                <br />
                <span class="spading">免费离场时间：{{tradeback.FreeLeaveTime}}</span>
                <br />
                <span class="spading">套餐类型：{{tradeback.ComboMeal}}</span>
                <br />
                <el-button type="primary" style="display:block;margin:20% 45%;" @click="gettrade">刷新</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="车场描述" name="second">
              <br />
              <span class="spad2">
                <br />1.现场24小时负责人：李主管 18301050035(优先拨打授权，24小时联系电话)
                <br />2.授权人：孙艳波 电话：13683290015(紧急联系电话)
                <br />3.残疾车：有(云端验证证件)
                <br />4.长租车：(不包含)一位多车，多位多车
                <br />5.首汽共享授权云端免费放行
              </span>
            </el-tab-pane>
            <el-tab-pane label="查询停车记录" name="third">
              <el-button @click="jumpto"></el-button>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="grid-l3-2">
          <span>
            呼叫原因：
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="danger">完成本次服务</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      callerinfo: {
        appId: '',
        privatekey: '',
        datas: { devMac: '', devIP: '', status: '', callTm: '', host_serial: '', PA2_serial: '' }
      },
      tradeinfo: {
        appId: '',
        privatekey: '',
        datas: { parkId: '', devConnId: '', devTag: '', IsZeroOrder: '1' }
      },
      callback: {},
      tradeback: {},
      options: [
        {
          value: '选项1',
          label: 'A型车'
        },
        {
          value: '选项2',
          label: 'B型车'
        },
        {
          value: '选项3',
          label: 'C型车'
        }
      ],
      value: '',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      address: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    jumpto() {
      this.$router.replace('/worktable')
    },
    onSubmit() {
      console.log('submit!')
    },
    // 获取对讲机的详细信息，并保存相关记录
    getcaller() {
      let devMac = this.address.ext[1].id
      console.log('我带你们打' + devMac)
      // 处理devMac

      this.callerinfo.datas.devMac = devMac
      if (this.callerinfo.datas.devIP == '') {
        this.callerinfo.datas.devIP = devMac
      }
      let submit = {}
      submit = JSON.stringify(this.callerinfo)
      // console.log(this.callerinfo)
      this.$axios({
        method: 'post',
        url: '/GetInterphoneDetailHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let acm = JSON.stringify(res.data)
          console.log('返回的数据' + acm)

          // let reg = new RegExp('/\r\n/', 'g')
          // let acmm = acm.replace(/\\r\n/g, '\\r\\n')
          // console.log('去掉换行符的json字符串' + acmm)

          this.callback = JSON.parse(JSON.parse(acm).datas)
          console.log(this.callback)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //根据设备地址获取最近的一笔交易信息
    gettrade() {
      this.tradeinfo.datas.parkId = this.callback.parkId
      this.tradeinfo.datas.devConnId = this.callback.devConnId
      this.tradeinfo.datas.devTag = this.callback.devTag
      this.tradeinfo.datas.IsZeroOrder = 1
      let submit = {}
      submit = JSON.stringify(this.tradeinfo)
      this.$axios({
        method: 'post',
        url: '/GetInOutInfoByDevAdrHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          console.log('返回的数据' + trb)
          this.tradeback = JSON.parse(JSON.parse(trb).datas)
          console.log(this.tradeback)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },

    initWebSocket() {
      //初始化weosocket
      const wsuri = `ws://localhost:8080/websocket/DPS007` //这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      this.websocketsend('hello客户端')
      console.log('socket建立连接')
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      var da = e.data
      console.log(da)
      this.address = JSON.parse(da)
      // console.log(this.address)
      this.getcaller()
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      //关闭
      console.log('断开连接', e)
    }
  },
  created() {
    this.initWebSocket()
  }
}
</script>

<style scoped>
.grid-l1 {
  background-color: white;
  border-radius: 4px;
  height: 60%;
}
.grid-l1-2 {
  background-color: white;
  border-radius: 4px;
  height: 30%;
  margin-top: 4%;
}

.grid-l2 {
  background-color: white;
  border-radius: 4px;
  max-height: 60%;
  min-height: 60%;
  padding: 8%;
}
.grid-l2-2 {
  background-color: white;
  border-radius: 4px;
  max-height: 30%;
  min-height: 30%;
  margin-top: 3%;
  padding: 8%;
  font-size: 25px;
}

.grid-l3 {
  background-color: white;
  border-radius: 4px;
  height: 64%;
}
.spading {
  padding: 20%;
  line-height: 35px;
}
.spadingl2 {
  margin-top: 30px;
  padding-top: 10px;
  font-size: 30px;
}
.spad2 {
  line-height: 35px;
  font-size: 18px;
}
.grid-l3-2 {
  background-color: white;
  border-radius: 4px;
  height: 23%;
  margin-top: 3.5%;
  text-align: center;
  vertical-align: middle;
  padding: 30px;
}
.tit01 {
  line-height: 50px;
  padding-top: 30px;
  text-align: center;
  font-size: 30px;
  display: block;
}

.row-bg {
  max-height: 850px;
}
</style>