<template>
  <div>
    <el-row :gutter="20" class="row-bg" type="flex">
      <el-col :span="8">
        <!-- 入口图片 -->
        <div class="grid-l1">
          <div v-if="!callstatussrc" style="width:100%;height:100%">
            <img src="@/assets/img/carbw.png" width="100%" height="100%" />
          </div>
          <div v-if="callstatussrc" style="width:100%;height:100%">
            <el-image :src="callstatussrc" style="width:100%;height:100%">
              <div slot="error" style="width:100%;height:100%">
                <img src="@/assets/img/defaultshow.png" width="100%" height="100%" />
              </div>
            </el-image>
          </div>
        </div>
        <!-- 出口图片 -->
        <div class="grid-l1">
          <div v-if="!callstatussrc" style="width:100%;height:100%">
            <img src="@/assets/img/carbw.png" width="100%" height="100%" />
          </div>
          <div v-if="callstatussrc" style="width:100%;height:100%">
            <el-image :src="callstatussrc" style="width:100%;height:100%">
              <div slot="error" style="width:100%;height:100%">
                <img src="@/assets/img/defaultshow.png" width="100%" height="100%" />
              </div>
            </el-image>
          </div>
        </div>
        <!-- 呼叫口的监控视频 -->
        <iframe :src="livesrc02" width="100%" height="40%" id="ysOpenDevice" controls allowfullscreen></iframe>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2-1">
          <span class="tit01" v-if="!tradeback.ComboMeal">类型：</span>
          <span class="tit01" v-if="tradeback.ComboMeal">{{tradeback.ComboMeal}}</span>
          <span class="tit01" v-if="statusCode=='200'">{{tradeback.Plate}}</span>
          <span class="tit01" v-if="statusCode!='200'">{{showmsg}}</span>
          <br />
          <span class="tit02">
            <!-- <br /> -->
            <span class="spading1" v-if="!callback.devTag">出入类型：</span>
            <span class="spading1" v-if="callback.devTag=='1'">出入类型：入口</span>
            <span class="spading1" v-if="callback.devTag=='2'">出入类型：出口</span>
            <br />
            <span class="spading">票号：{{tradeback.TicketCode}}</span>
            <br />
            <span class="spading">入场时间：{{tradeback.InTm}}</span>
            <br />
            <span class="spading">当前时间：{{tradeback.NowTM}}</span>
            <br />
            <span class="spading">停车时长：{{tradeback.LeaveTime}}</span>
            <br />
            <span class="spading">
              应收金额(元)：
              <span style="color:red">{{tradeback.ShouldPayM}}</span>
            </span>
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
              <td width="40%" style="font-size:24px;padding-left:20px;">车辆信息查询:</td>
              <td width="60%">
                <el-input
                  type="text"
                  v-model="searchinfo.datas.devConnId"
                  onkeyup="value=value.replace(/[\W]/g,'') "
                  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                ></el-input>
              </td>
            </tr>
            <tr height="30%">
              <td width="40%"></td>
              <td width="60%" style="padding-left:10px;">
                <el-button
                  style="height:90%;width:95%;background-color:rgb(11,186,19);font-size:24px;"
                  type="success"
                  icon="el-icon-search"
                  round
                  @click="searchinfo0"
                >搜索</el-button>
              </td>
            </tr>
            <tr height="40%"></tr>
          </table>

          <table width="92%" height="40%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:24px;">
            <tr>
              <td width="35%" style="padding-left:20px;text-align:center;">抬杆原因:</td>
              <td width="65%" style="padding-left:20px;">
                <!-- 获取选取的值只需要取this.kind即可 -->
                <el-select v-model="kind" clearable placeholder="请选择">
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td width="35%" style="padding-left:20px;text-align:center;">呼入原因:</td>
              <td width="65%" style="padding-left:20px;">
                <el-select v-model="reasonId" clearable placeholder="请选择" style="font-size:24px;" @click.native="getreasoninfo()">
                  <el-option v-for="item in options2" :key="item.reasonId" :label="item.reason" :value="item.reasonId"></el-option>
                </el-select>
              </td>
            </tr>
            <tr></tr>
          </table>
          <table width="100%" height="20%" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:24px;padding-left:10px;">
            <tr>
              <td>
                <el-button
                  style="height:90%;width:45%;font-size:24px;"
                  type="info"
                  icon="el-icon-check"
                  round
                  @click="comService()"
                  :disabled="!wczhuangtai"
                  :class="{common: wczhuangtai,gray: !wczhuangtai}"
                >完成本次服务</el-button>
                <el-button
                  style="height:90%;width:45%;font-size:24px;"
                  type="info"
                  icon="el-icon-unlock"
                  round
                  @click="msgbox1('您确定要抬杆吗？','提示')"
                  :disabled="!zhuangtai"
                  :class="{orange: zhuangtai,gray: !zhuangtai}"
                >抬杆</el-button>
              </td>
            </tr>
          </table>
        </div>、
      </el-col>

      <el-col :span="8">
        <div class="grid-l3-1">
          <span class="tit00" v-if="!callback.parkName">停车场名称</span>
          <span class="tit00">{{callback.parkName}}</span>
          <span class="tit03">通道：{{callback.devConnName}}</span>
          <span class="tit03" style="padding-bottom:20px;">呼叫编号：{{ombackrecord.callid}}</span>
          <div class="tit04">
            <div v-if="!ombackansered.attribute&&!ombackrecord.attribute">
              <img src="@/assets/img/comm.png" alt="显示不能" height="30%" width="30%" />
            </div>
            <span v-if="!ombackansered.attribute&&!ombackrecord.attribute" class="tit04">通话状态</span>
            <div v-if="ombackansered.attribute">
              <img src="@/assets/img/incalling.png" alt="显示不能" height="30%" width="30%" />
            </div>
            <span v-if="ombackansered.attribute" class="tit04">{{ombackansered.attribute}}</span>
            <div v-if="ombackrecord.attribute && ombackansered.attribute=='' ">
              <img src="@/assets/img/hangup.png" alt="显示不能" height="30%" width="30%" />
            </div>
            <span v-if="ombackrecord.attribute && ombackansered.attribute=='' " class="tit04">{{ombackrecord.attribute}}</span>
          </div>
          <div style="text-align:center; vertical-align:middel;padding:30px;"></div>
        </div>
        <!-- 第三列中间 -->
        <div class="grid-l3-2">
          <span class="tit05" style="padding-top:20px;">收费标准 :</span>
          <span class="tit06">{{callback.parkRules}}</span>
          <!-- <span class="tit06">22:00-07:00</span>
          <span class="tit06">2元/小时</span>-->
        </div>
        <!-- 第三列下方 -->
        <div class="grid-l3-3">
          <span class="tit00">车场业务信息</span>
          <span class="tit03">免费车辆:{{callback.freeCars}}</span>
          <!-- <span class="tit03" style="padding-left:119px;">客车</span> -->
        </div>
        <div class="orangepart">剩余车位数：{{callback.remainSpace}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EZUIKit from 'ezuikit'
import EZUIPlayer from 'ezuikit/ezuikit'
import { get } from 'https'
import { stringify } from 'querystring'

export default {
  data() {
    return {
      zhuangtai: false,
      wczhuangtai: false,
      kind: '',
      options1: [
        {
          value: '1',
          label: '放行类型1'
        },
        { value: '2', label: '放行类型2' }
      ],
      reasonId: '',
      options2: [
        {
          reasonId: '1',
          reason: '原因1'
        },
        {
          reasonId: '2',
          reason: '原因2'
        }
      ],
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
        datas: { devMac: '', devIP: '', status: '', callTm: '', host_serial: '', PA2_serial: '', callsumtm: '', om_callId: '' }
      },
      devMac: '',
      // 向Spring后端发送的，根据设备地址获取最近的一笔交易信息
      tradeinfo: {
        appId: '',
        privatekey: '',
        datas: { parkId: '', devConnId: '', devTag: '', IsZeroOrder: '1' }
      },
      searchinfo: {
        appId: '',
        privatekey: '',
        datas: { parkId: '', devConnId: '', devTag: '', IsZeroOrder: '1' }
      },
      opendoorinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', deviceAdr: '', dealtype: '', serialNum: '', reason: '', callId: '', reasonId: '' }
      },
      reasoninfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '' }
      },
      cominfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', dealtype: '', serialNum: '', callId: '', reasonId: '' }
      },
      gocall: '',
      getcall: '',
      // 用来接收设备的回复信息
      callback: {},
      statusCode: '',
      showmsg: '',
      // 用来接收详细的交易信息
      tradeback: {},
      //搜索模块返回的信息
      searchback: {},
      reasonback: [],
      value: '',

      // 不管OM发来的什么数据，都先通过address保存
      address: [],
      // 用来2次保存返回的回复信息
      ombackansered: '',
      // 用来2次保存返回的通话记录
      ombackrecord: '',

      // 页面中选择框的数据
      formInline: {
        user: '',
        region: ''
      },
      //监控地址的KEY和Secret，在萤石平台获取
      videotoken: {
        appKey: 'fb8fe2aceedd4e358141eb1eec6c2173',
        appSecret: '3466edb75c40555187c5fe06aa57aed6'
      },
      tokenback: '',
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
    // 获取当前时间
    getNow() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate = year + seperator1 + month + seperator1 + day + ' ' + hours + ':' + minutes + ':' + seconds
      //  console.log(currentdate)
      return currentdate
    },
    // 获取对讲机的详细信息，并保存相关记录
    getcaller() {
      //如果OM设备传过来的信息中含有ext数组(是OM设备的状态消息)
      if (this.address.ext) {
        //上线之前需要改1为0
        this.devMac = this.address.ext[1].id
        //主叫变量gocall
        this.gocall = this.address.ext[0].id
        //被叫变量getcall
        this.getcall = this.address.ext[1].id

        console.log('呼叫的座机号' + this.devMac)
        //上传状态代号
      }
      if (this.ombackansered.attribute == '正在应答') {
        this.callerinfo.datas.status = 1
      } else if (this.ombackrecord.attribute == '已挂断') {
        this.callerinfo.datas.status = 2
        this.callerinfo.datas.callsumtm = this.ombackrecord.Duration
        this.callerinfo.datas.om_callId = this.ombackrecord.callid
        this.wczhuangtai = true
      } else {
        this.callerinfo.attribute = 0
      }
      //获取当前时间
      this.callerinfo.datas.callTm = this.getNow()
      // 处理devMac
      this.callerinfo.datas.devMac = this.devMac
      //分机呼话机IP取和MAC相同
      this.callerinfo.datas.devIP = this.devMac

      this.callerinfo.datas.callsumtm = this.ombackrecord.Duration
      this.callerinfo.datas.om_callId = this.ombackrecord.callId
      console.log('通话记录不需要执行下面的方法')

      let submit = {}
      submit = JSON.stringify(this.callerinfo)
      console.log('获取保存模块提交的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetInterphoneDetailHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let acm = JSON.stringify(res.data)
          console.log('callerback返回的数据' + acm)

          // let reg = new RegExp('/\r\n/', 'g')
          // let acmm = acm.replace(/\\r\n/g, '\\r\\n')
          // console.log('去掉换行符的json字符串' + acmm)
          this.initvideo02()
          this.callstatussrc = 'src/assets/img/incalling.png'
          this.showmsg = JSON.parse(acm).message
          // console.log('getcaller的状态信息' + showmsg)
          this.statusCode = JSON.parse(acm).statusCode
          this.callback = JSON.parse(JSON.parse(acm).datas)
          this.zhuangtai = true
          console.log(this.callback)
          if (this.callback != '') {
            this.gettrade()
          }
          this.initvideo02()
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
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
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          console.log('gettrade返回的数据' + trb)
          this.tradeback = JSON.parse(JSON.parse(trb).datas)
          this.tradeback.FreeLeaveTime = this.tradeback.FreeLeaveTime + '分钟'
          console.log('tradeback中的数据' + this.tradeback)
          // 对图片进行处理
          this.imgsrc01 = this.tradeback.inpic.replace('+', '%2B')
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //操作手动开闸
    openbyhands() {
      this.opendoorinfo.datas.userId = localStorage.user
      this.opendoorinfo.datas.deviceAdr = this.callback.devConnId
      console.log('打印一下开闸原因看看' + this.reasonId)
      this.opendoorinfo.datas.reasonId = this.reasonId
      // console.log('打印一下tradeback' + JSON.stringify(this.tradeback))
      // 交易类型

      if (this.tradeback.ComboMeal == '临停缴费') {
        this.opendoorinfo.datas.dealtype = '1'
      } else if (this.tradeback.ComboMeal == '月租') {
        this.opendoorinfo.datas.dealtype = '2'
      } else if (this.tradeback.ComboMeal == '群租') {
        this.opendoorinfo.datas.dealtype = '3'
      } else {
        this.open1('请输入开闸原因或类型')
      }

      this.opendoorinfo.datas.serialNum = this.tradeback.TradingInfoID
      //开闸原因
      // console.log('打印一下开闸原因看看' + this.opendoorinfo.datas.reasonId)
      // 对讲记录主键ID
      this.opendoorinfo.datas.callId = this.callback.callId
      let submit = {}
      submit = JSON.stringify(this.opendoorinfo)
      console.log('打印一下开闸提交数据' + submit)
      this.$axios({
        method: 'post',
        url: '/OpenDeviceHandler.ashx?method=POST&lan=zh-CN&type=web&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          console.log('手动开闸返回的数据' + trb)
          if (res.data.statusCode != 200) {
            this.open1(res.data.message)
          }
          // this.tradeback = JSON.parse(JSON.parse(trb).datas)
          console.log('手动开闸模块需要显示的数据' + this.tradeback)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    // 提示信息(右上角那种)
    open1(a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        group: 'foo',
        duration: 8000,
        type: 'info',
        title: '注意',
        text: msg
      })
    },
    open3(a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        group: 'coo',
        duration: 5000,
        position: 'top-full',
        type: 'error',
        title: '提示',
        text: msg
      })
    },
    //通过车牌号搜索信息
    searchinfo0() {
      if (!this.searchinfo.datas.devConnId) {
        this.open1('请输入要搜索的车牌号')
        return
      }
      // 将获取通话信息传过来的停车场ID,设备地址,设备类型&&&&&是否产生0元订单等传到gettrade方法的request数据中
      this.searchinfo.datas.parkId = this.callback.parkId
      if (!this.searchinfo.datas.parkId) {
        this.open3('无呼叫信息')
        return
      }
      // this.searchinfo.datas.devConnId = this.plate
      this.searchinfo.datas.devTag = '3'
      this.searchinfo.datas.IsZeroOrder = '1'
      let submit = {}
      submit = JSON.stringify(this.searchinfo)
      console.log('搜索信息模块发送的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetInOutInfoByDevAdrHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          let partrb = JSON.parse(trb)

          console.log('收到的信息' + trb)

          console.log('搜索车牌号返回的数据' + partrb)

          this.open3(partrb.message)
          if (partrb.status == 200) {
            this.tradeback = JSON.parse(JSON.parse(trb).datas)
            console.log(this.tradeback)
            this.imgsrc01 = this.tradeback.inpic
          }
        })
        .catch(err => {
          let cuowu = JSON.stringify(err)
        })
    },
    // 完成本次服务调用接口
    comService() {
      if (!this.reasonId) {
        this.open1('请输入原因')
        return
      }
      this.cominfo.datas.userId = localStorage.user
      //交易类型
      if (this.tradeback.ComboMeal == '临停缴费') {
        this.cominfo.datas.dealtype = '1'
      } else if (this.tradeback.ComboMeal == '月租') {
        this.cominfo.datas.dealtype = '2'
      } else if (this.tradeback.ComboMeal == '群租') {
        this.cominfo.datas.dealtype = '3'
      } else {
        this.open1('不存在相关完成服务交易类型')
      }
      this.cominfo.datas.serialNum = this.tradeback.TradingInfoID
      this.cominfo.datas.callId = this.callback.callId
      //获取到原因后需要更改
      this.cominfo.datas.reasonId = this.reasonId
      let submit = {}
      submit = JSON.stringify(this.cominfo)
      console.log('结束服务模块发送的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/EndServiceHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          let partrb = JSON.parse(trb)
          console.log('收到的信息' + trb)
          console.log('完成服务返回的信息:' + partrb.message)
          if (partrb.statusCode == 200) {
            // this.msgbox(partrb.message, '提示')
            this.msgbox2('您确定要完成本次服务吗？', '提示')
          }
        })
        .catch(err => {
          console.log('完成本次服务接口未联通')
        })
    },
    imgsrcchange() {
      this.callstatussrc = '@/assets/img/carbw.png'
    },
    //搜索出现问题时返回的信息
    msgbox3(a, b) {
      this.$alert(a, b, {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            height: '800px',
            message: `已点击确定`
          })
        }
      })
    },
    // 抬杆之前的确认信息
    msgbox1(a, b) {
      this.$confirm(a, b, {
        // showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.openbyhands()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'ok'
          })
        })
    },
    msgbox2(a, b) {
      this.$confirm(a, b, {
        // showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.open1('完成本次服务成功')
          this.$router.go(0)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'ok'
          })
        })
    },
    //获取呼入原因信息
    getreasoninfo() {
      this.reasoninfo.datas.userId = localStorage.user
      let submit = {}
      submit = JSON.stringify(this.reasoninfo)
      // submit = this.reasoninfo
      console.log('原因模块发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/GetCallReasonListHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('原因模块返回的数据' + back)
          this.reasonback = JSON.parse(JSON.parse(back).datas).list

          //让获取到的值和options2中的label和value相等
          //或者说把获取到的值遍历到options2中，2个属性label和value
          //label用于对外界显示，value用于保存key(即呼入原因ID)

          this.options2 = JSON.parse(this.reasonback)

          console.log('options2中的信息' + this.options2)
        })
        .catch(err => {
          console.log('原因模块出现了错误' + err)
        })
    },
    // 获取视频的令牌
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
          console.log('获取视频令牌模块返回的数据' + token)
          this.tokenback = JSON.parse(token).data.accessToken
          console.log('接到了token:' + this.tokenback)
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
      this.getvideotoken()
      console.log('我要打印看下' + this.tokenback)
      let token = this.tokenback
      let head = 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/C71948995/1.live&autoplay=1&accessToken='
      this.livesrc02 = head + token
      let tk2 = 'at.9wiz6ml83s7oy1cy50se9wc6aerts23b-6t53ia6nke-152k8ob-m9i35gmdm'
      console.log('视屏播放地址' + this.livesrc02)
    },
    // 从token中获取账号绑定的话机号，用来绑定socket的shopid
    getlocalTel() {
      let tel = JSON.parse(localStorage.token)
      let tele = JSON.stringify(tel.hostId).replace('"', '')
      let telep = new Array()
      telep = tele.split(',')
      console.log('从localStorage中获取到token中保存的与账号绑定的话机一号' + telep[0])
      this.telephone = telep[0]
    },
    //清空的方法

    // 初始化websocket
    initWebSocket() {
      let telnum = this.telephone
      let dizhi = 'ws://192.168.1.167:8080/websocket/'
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
        this.open1('有电话呼入')
      } else {
        this.ombackansered.attribute = ''
        this.ombackrecord = this.address
        this.gettrade()
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
    // this.gettrade()
    this.getvideotoken()
    // this.initvideo02()
  }
}
</script>

<style scoped>
.common {
  background-color: rgb(0, 174, 255);
}
.gray {
  background-color: rgb(133, 133, 133);
}
.orange {
  background-color: rgb(255, 84, 0);
}
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
  height: 42%;
}
.grid-l3-2 {
  height: 21%;
  margin-bottom: 2%;
  background-color: rgb(216, 228, 246);
  padding-left: 20px;
  line-height: 20px;
  overflow: auto;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
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
.spading1 {
  padding: 30px;
  line-height: 35px;
  font-size: 26px;
  padding-left: 110px;
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
  /* padding-top: 10px; */
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
  padding-left: 30px;
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