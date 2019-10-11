<template>
  <div>
    <el-row :gutter="20" class="row-bg" type="flex">
      <el-col :span="8">
        <!-- 入口图片 -->
        <div class="grid-l1">
          <img :src="callstatussrc" />
        </div>
        <!-- 出口图片 -->
        <div class="grid-l1">
          <img :src="callstatussrc" />
        </div>
        <!-- 呼叫口的监控视频 -->
        <iframe :src="livesrc02" width="100%" height="40%" id="ysOpenDevice" controls allowfullscreen></iframe>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2-1">
          <span class="tit01" v-if="!tradeback.ComboMeal">类型：</span>
          <span class="tit01" v-if="tradeback.ComboMeal">
            {{tradeback.ComboMeal}}
            <br />
            {{tradeback.ShouldPayM}}
          </span>
          <span class="tit02">
            <br />
            <span class="spading">入场时间：{{tradeback.InTm}}</span>
            <br />
            <span class="spading">当前时间：{{tradeback.NowTM}}</span>
            <br />
            <span class="spading">通道号：{{tradeback.NowTM}}</span>
            <br />
            <span class="spading">停车时长：{{tradeback.LeaveTime}}</span>
            <br />
            <span class="spading">应收金额(元)：{{tradeback.ShouldPayM}}</span>
            <br />
            <span class="spading">优惠金额(元)：{{tradeback.CouponPayM}}</span>
            <br />
            <span class="spading">实收金额(元)：{{tradeback.RealPayM}}</span>
            <br />
            <span class="spading">免费离场时间：{{tradeback.FreeLeaveTime}}</span>
          </span>
        </div>

        <div class="grid-l2-2">
          <table width="92%" height="30%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed">
            <tr height="30%">
              <td width="40%" style="font-size:24px;padding-left:30px;">车辆信息查询:</td>
              <td width="60%">
                <el-input></el-input>
              </td>
            </tr>
            <tr height="30%">
              <td width="40%"></td>
              <td width="60%" style="padding-left:10px;">
                <el-button style="height:90%;width:95%;background-color:rgb(11,186,19);font-size:24px;" type="success" icon="el-icon-search" round>搜索</el-button>
              </td>
            </tr>
            <tr height="40%"></tr>
          </table>

          <table width="92%" height="40%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:24px;">
            <tr>
              <td width="30%" style="padding-left:20px;">放行类型:</td>
              <td width="70%" style="padding-left:20px;">
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td width="30%" style="padding-left:20px;">放行原因:</td>
              <td width="70%" style="padding-left:20px;">
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
            </tr>
            <tr></tr>
          </table>
          <table width="92%" height="20%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:24px;padding-left:80px;">
            <tr>
              <td>
                <el-button style="height:90%;width:90%;background-color:rgb(0,174,255);font-size:24px;" type="success" icon="el-icon-unlock" round>抬杆</el-button>
              </td>
            </tr>
          </table>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-l3-1">
          <span class="tit00" v-if="!callback.parkName">停车场名称</span>
          <span class="tit00">{{callback.parkName}}</span>
          <span class="tit03">通道号：{{tradeback.NowTM}}</span>
          <span class="tit03" style="padding-bottom:20px;">通道号：{{tradeback.NowTM}}</span>
          <div class="tit04">
            <img src="@/assets/img/incalling.png" alt="显示不能" width="40%" />
            <span v-if="!ombackansered.attribute&&!ombackrecord.attribute" class="tit04">通话状态:</span>
            <span v-if="ombackansered.attribute" class="tit04">{{ombackansered.attribute}}</span>
            <span v-if="ombackrecord.attribute && ombackansered.attribute=='' " class="tit04">{{ombackrecord.attribute}}</span>
          </div>
          <div style="text-align:center; vertical-align:middel;padding:30px;"></div>
        </div>
        <!-- 第三列中间 -->
        <div class="grid-l3-2">
          <span class="tit05" style="padding-top:50px;">收费标准 : 07:00-22:00</span>
          <span class="tit06">3元/小时</span>
          <span class="tit06">22:00-07:00</span>
          <span class="tit06">2元/小时</span>
        </div>
        <!-- 第三列下方 -->
        <div class="grid-l3-3">
          <span class="tit00">车场业务信息</span>
          <span class="tit03">免费车辆：小型车</span>
          <span class="tit03" style="padding-left:119px;">客车</span>
          <span class="tit03" style="padding-left:119px;">中型车</span>
          <span class="tit03" style="padding-left:119px;">微型车</span>
        </div>
        <div class="orangepart">剩余车位数：num</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EZUIKit from 'ezuikit'
import EZUIPlayer from 'ezuikit/ezuikit'

export default {
  data() {
    return {
      // 用来选择标签页
      activeName: 'first',
      // 用于存图片地址
      imgsrc01: '',
      //通话状态的图片地址
      callstatussrc: '',
      // 直播的地址
      videosrc01: 'rtmp://rtmp01open.ys7.com/openlive/caf2867d020c481482ed1ebf9b423649.hd',
      // 用于存监控地址
      livesrc02: '',
      // 向Spring后端发送的话机信息，用于获取对讲机的详细信息，并保存呼叫记录
      callerinfo: {
        appId: '',
        privatekey: '',
        datas: { devMac: '', devIP: '', status: '', callTm: '', host_serial: '', PA2_serial: '' }
      },
      // 向Spring后端发送的，根据设备地址获取最近的一笔交易信息
      tradeinfo: {
        appId: '',
        privatekey: '',
        datas: { parkId: '', devConnId: '', devTag: '', IsZeroOrder: '1' }
      },
      opendoorinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', deviceAdr: '', dealtype: '', serialNum: '', reason: '', callId: '' }
      },
      gocall: '',
      getcall: '',
      // 用来接收设备的回复信息
      callback: {},
      // 用来接收详细的交易信息
      tradeback: {},
      value: '',

      // 不管OM发来的什么数据，都先通过address保存
      address: [],
      // 用来2次保存返回的回复信息
      ombackansered: '',
      // 用来2次保存返回的通话记录
      ombackrecord: '',

      tab_pane3_input: '',
      paneaddress: '武汉天界',
      passwaywhich: '这里写哪个口呼叫',
      passwayname: '这里写呼叫口的名称',
      vistorid: '这里传呼叫编号vistorid',
      // 页面中选择框的数据
      formInline: {
        user: '',
        region: ''
      },
      //监控地址的KEY和Secret，在萤石平台获取
      videotoken: {
        appKey: '1589063f2302486697eb1f29ff814a70',
        appSecret: 'f333d38075e04ce55ce9204a90ba78ab'
      },
      //用来保存监控所需的令牌
      videoback: {},
      //保存登录时获取到绑定的设备编号
      telephone: {}
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // jumpto() {
    //   this.$router.replace('/worktable')
    // },
    onSubmit() {
      console.log('submit!')
    },
    // 获取对讲机的详细信息，并保存相关记录
    getcaller() {
      //如果OM设备传过来的信息中含有ext数组(是OM设备的状态消息)
      if (this.address.ext) {
        var devMac = this.address.ext[1].id
        //主叫变量gocall
        this.gocall = this.address.ext[0].id
        //被叫变量getcall
        this.getcall = this.address.ext[1].id

        console.log('呼叫的座机号' + devMac)
        // 处理devMac
        this.callerinfo.datas.devMac = devMac
        //分机呼话机IP取和MAC相同
        this.callerinfo.datas.devIP = devMac

        let submit = {}
        submit = JSON.stringify(this.callerinfo)
        console.log(submit)
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

            this.callstatussrc = 'src/assets/img/itncalling.png'
            this.callback = JSON.parse(JSON.parse(acm).datas)
            console.log(this.callback)
            if (this.callback != '') {
              this.gettrade()
            }
            this.initvideo02()
          })
          .catch(err => {
            console.log('出现了错误' + err)
          })
      } else {
        console.log('通话记录不需要执行下面的方法')
      }
    },
    //根据设备地址获取最近的一笔交易信息
    gettrade() {
      // 将获取通话信息传过来的停车场ID,设备地址,设备类型&&&&&是否产生0元订单等传到gettrade方法的request数据中
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
          this.imgsrc01 = this.tradeback.inpic.replace('+', '%2B')
          // let src = this.imgsrc01.replace('+', '%2B')
          // this.imgsrc01 = src
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //操作手动开闸
    openbyhands() {
      this.opendoorinfo.datas.userId = localStorage.user
      this.opendoorinfo.datas.deviceAdr = this.callback.devConnId
      //交易类型
      if (this.tradeback.ComboMeal == '临停缴费') {
        this.opendoorinfo.datas.dealtype = '1'
      } else if (this.tradeback.ComboMeal == '月租') {
        this.opendoorinfo.datas.dealtype = '2'
      } else if (this.tradeback.ComboMeal == '群租') {
        this.opendoorinfo.datas.dealtype = '3'
      } else {
        alert('不存在相关套餐')
      }
      //交易流水号
      this.opendoorinfo.datas.serialNum = this.tradeback.datas.TradingInfoID
      //开闸原因
      this.opendoorinfo.datas.reason = ''
      // 对讲记录主键ID
      this.opendoorinfo.datas.callId = ''
      let submit = {}
      submit = JSON.stringify(this.opendoorinfo)
      this.$axios({
        method: 'post',
        url: '/OpenDeviceHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
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
    open1() {
      // this.$notify({
      //   title: '通话接入',
      //   dangerouslyUseHTMLString: true,
      //   type: 'success',
      //   message: '<div>元</div>'
      // })
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = '有电话呼入'
      let msg = message + now
      this.$notify({
        group: 'foo',
        timeout: 7000,
        type: 'success',
        title: '注意',
        text: msg
      })
    },
    getvideotoken() {
      let submit = this.$qs.stringify(this.videotoken)
      this.$axios({
        method: 'post',
        url: 'http://open.ys7.com/api/lapp/token/get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let token = JSON.stringify(res.data)
          console.log('返回的数据' + token)
          this.tokenback = JSON.parse(token)

          console.log('接到了token' + this.tokenback)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    initvideo01() {
      this.player = new EZUIKit.EZUIPlayer('myplayer')
      this.player.play()
    },
    initvideo02() {
      this.livesrc02 =
        'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/C71948995/2.live&autoplay=1&accessToken=at.dauw61242axuwk0y94rpq0hi5f80j2c7-967pawazub-16l3bxu-btpjlhtsm'
    },
    // 从token中获取账号绑定的话机号，用来绑定socket的shopid
    getlocalTel() {
      let tel = JSON.parse(localStorage.token)
      let tele = JSON.stringify(tel.hostId).replace('"', '')
      let telep = new Array()
      telep = tele.split(',')
      console.log('巫毒娃娃' + telep[0])
      this.telephone = telep[0]
    },
    // 初始化websocket
    initWebSocket() {
      let telnum = this.telephone
      let dizhi = 'ws://localhost:8080/websocket/'
      // 拼接地址
      const wsuri = dizhi + telnum //这个地址由后端童鞋提供
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
      // 判断address中是不是有ext.id
      if (this.address.ext) {
        this.ombackansered = this.address
        this.open1()
      } else {
        this.ombackansered.attribute = ''
        this.ombackrecord = this.address
      }
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
    this.getlocalTel()
  },
  beforeMount() {
    this.initWebSocket()
    this.gettrade()
  }
}
</script>

<style scoped>
.grid-l1 {
  height: 29%;
  margin-bottom: 1%;
  background-color: gainsboro;
  border-radius: 8px;
}
.grid-l2-1 {
  background-color: rgb(248, 248, 252);
  margin: auto;
  height: 58%;
  margin-bottom: 1%;
}
.grid-l2-2 {
  height: 41%;
  border-radius: 0 0 10px 10px;
  overflow: auto;
  line-height: 60px;
  /* display: block; */
  padding-left: 40px;
  padding-top: 40px;
  background-color: rgb(248, 248, 252);
}

.grid-l3-1 {
  background-color: rgb(216, 228, 246);
  border-radius: 6px;
  /* overflow: auto; */
  vertical-align: middle;
  padding-left: 40px;
  height: 41%;
}
.grid-l3-2 {
  height: 22%;
  margin-bottom: 2%;
  background-color: rgb(216, 228, 246);
  padding-left: 20px;
  line-height: 20px;
}
.grid-l3-3 {
  background-color: rgb(216, 228, 246);
  border-radius: 0 0 0px 0px;
  height: 28%;
  padding-left: 30px;
}
.orangepart {
  border-radius: 0 0 20px 20px;
  background-color: rgb(255, 84, 0);
  height: 7%;
  font-size: 38px;
  text-align: center;
  padding-top: 10px;
  color: aliceblue;
  display: block;
}
.spading {
  padding: 30px;
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
  height: 100%;
  padding: auto;
  /* display: block; */
}
.tit00 {
  line-height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 30px;
  display: block;
  font-weight: 550;
}
.tit01 {
  line-height: 50px;
  padding-top: 10px;
  padding-left: 30px;
  text-align: left;
  font-size: 36px;
  display: block;
}
.tit02 {
  line-height: 45px;
  padding-top: 10px;
  font-size: 20px;
}
.tit03 {
  font-size: 24px;
  text-align: left;
  padding-bottom: 10px;
  display: block;
  white-space: pre-wrap;
}
.tit04 {
  padding-top: 10px;
  padding-bottom: 50px;
  text-align: center;
  font-size: 30px;
  display: block;
}
.tit05 {
  line-height: 30px;
  font-size: 20px;
  display: block;
  white-space: pre-wrap;
}
.tit06 {
  font-size: 20px;
  line-height: 30px;
  padding-left: 95px;
  display: block;
  white-space: pre-wrap;
}
.tit07 {
  line-height: 50px;
  padding-top: 30px;
  display: block;
  font-size: 20px;
}

.add01 {
  margin-top: 10px;
  text-align: center;
  font-size: 50px;
  display: block;
}
.add02 {
  margin-top: 0px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  display: block;
}
.msgbox01 {
  font-size: 50px;
  min-height: 200px;
}
.row-bg {
  height: 960px;
  /* align-items: flex-start; */
  justify-content: center;
}
/* .grid-l2-2 table tr td {
  border: 1px solid #f00;
}
.grid-l2-2 table tr {
  border: 1px solid blue;
} */
</style>