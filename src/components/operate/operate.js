
import EZUIKit from 'ezuikit'
import EZUIPlayer from 'ezuikit/ezuikit'
import { get } from 'https'
import { stringify } from 'querystring'

export default {
  data () {
    return {
      socketinfo: "",
      nowtime: '',
      camera_serial: '',
      // 用于监控的设备序列号
      deviceID: '',
      // 用于监控的频道号
      chanelNo: '',
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
      reasonId1: '',
      reasonId2: '',
      options2: [
        {
          reasonId: '1',
          reason: '原因1'
        }
      ],
      moneykind: '',
      moneykind1: [
        {
          AmountId: '',
          FixAmount: ''
        }
      ],
      // 用来选择标签页
      activeName: 'first',
      // 用于存入口图片地址
      imgsrc01: '',
      imgsrc02: '',
      //通话状态的图片地址
      callstatussrc: '',
      srcList: ['@/assets/img/defaultshow.png'],
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
      reasoninfo2: {
        appId: '',
        privatekey: '',
        datas: { cashierCode: '' }
      },
      cominfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', dealtype: '', serialNum: '', callId: '', reasonId: '' }
      },
      moneyinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', parkId: '' }
      },
      mechineinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', userType: '', deviceAdr: '', dealtype: '', serialNum: '', reason: '', pushTag: '', plate: '', fixAmont: '', parkId: '' }
      },
      mechineback: {},
      moneyback: {},
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
      reasonback2: [],
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
        appKey: '',
        appSecret: ''
      },
      //用来保存监控所需的令牌
      tokenback: '',
      //给监控令牌记录一个时间
      tokenbacktime: '',
      //保存登录时获取到绑定的设备编号
      telephone: {},
      dialogVisible: false,
      dialog2: false,
      dialog3: false,
      tableData: [
        {
          date: '',
          name: '',
          address: ''
        },

      ],
      formdia: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      zzjInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkId": "",
          "parkName": "",
          "deviceName": "",//设备名称
        }
      },
      zzjBack: [],
      carhisinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', plate: '', ticketNo: '', tag: '' }
      },
      carhisback: {},
      hisdataCount: '',
      hislist: [],
      showhislist: [],
      Coupon: [],
      paymes: [],
      inoutimgs: [],
      zzj: '',//推送的自助机
      dealtype: '',
      dealtype1: [{ dealId: '1', dealvalue: '临时用户' }, { dealId: '2', dealvalue: '群租' }, { dealId: '3', dealvalue: '月租' }],
      tagtype: '',
      tagtype1: [{ tagId: '1', tagvalue: '优惠券绑定记录' }, { tagId: '2', tagvalue: '出入场信息' }, { tagId: '3', tagvalue: '缴费信息' }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // jumpto() {
    //   this.$router.replace('/worktable')
    // },
    // 获取当前时间
    getNow () {
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
    getcaller () {

      // 清除界面元素数据
      this.clearinfo()
      this.zhuangtai = false
      //如果OM设备传过来的信息中含有ext数组(是OM设备的状态消息)
      if (this.address.ext) {
        //上线之前需要改1为0
        this.devMac = this.address.ext[1].id
        //主叫变量gocall
        this.gocall = this.address.ext[0].id
        //被叫变量getcall
        this.getcall = this.address.ext[1].id

        this.nowtime = this.getNow()
        console.log('呼叫的座机号' + this.devMac)
        //上传状态代号
      }
      if (this.address.attribute == '正在接听') {
        this.callerinfo.datas.status = 1
        this.callerinfo.datas.PA2_serial = this.gocall
      } else if (this.address.attribute == '已挂断') {
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
          this.callback = JSON.parse(JSON.parse(acm).datas)
          console.log(this.callback)
          // let reg = new RegExp('/\r\n/', 'g')
          // let acmm = acm.replace(/\\r\n/g, '\\r\\n')
          // console.log('去掉换行符的json字符串' + acmm)
          this.camera_serial = this.callback.camera_serial

          this.initvideo02()
          this.callstatussrc = 'src/assets/img/incalling.png'
          this.showmsg = JSON.parse(acm).message
          // console.log('getcaller的状态信息' + showmsg)
          this.statusCode = JSON.parse(acm).statusCode

          this.zhuangtai = true

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
    gettrade () {
      // 将获取通话信息传过来的停车场ID,设备地址,设备类型&&&&&是否产生0元订单等传到gettrade方法的request数据中
      this.tradeinfo.datas.parkId = this.callback.parkId
      this.tradeinfo.datas.devConnId = this.callback.devConnId
      if (this.callback.devTag) {
        this.tradeinfo.datas.devTag = this.callback.devTag
      } else {
        this.open3("cuowu")
      }

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
          if (res.data.statusCode == 200) {
            let trb = JSON.stringify(res.data)
            console.log('gettrade返回的数据' + trb)
            this.tradeback = JSON.parse(JSON.parse(trb).datas)
            this.tradeback.FreeLeaveTime = this.tradeback.FreeLeaveTime + '分钟'
            console.log('tradeback中的数据' + JSON.stringify(this.tradeback))
            // 对图片进行处理
            console.log("入场照片地址" + this.tradeback.inpic)
            this.imgsrc01 = this.tradeback.inpic
            console.log("出场照片地址" + this.tradeback.outpic)
            this.imgsrc02 = this.tradeback.outpic
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //操作手动开闸
    openbyhands () {
      if (this.reasonId1) {
        console.log('开闸原因' + this.reasonId1)
        this.msgbox1("您确定要抬杆吗", "提示")
      } else {
        this.open2('请选择抬杆原因')
      }
    },
    clearinfo () {
      this.imgsrc01 = ''
      this.callback = ''
      this.tradeback = ''
      this.livesrc02 = ''
      this.reasonId1 = ''
      this.reasonId2 = ''
      this.ombackrecord = ''
      this.ombackansered = ''
      this.nowtime = ''
    },
    getcarhistory0 () {

      this.getcarhistory(1)
      setTimeout(() => {
        this.getcarhistory(2)
        setTimeout(() => {
          this.getcarhistory(3)
        }, 500);
      }, 500);
    },
    //车辆历史轨迹
    getcarhistory (numb) {
      this.carhisinfo.datas.userId = localStorage.user
      this.carhisinfo.datas.plate = this.tradeback.plate
      this.carhisinfo.datas.ticketNo = this.tradeback.ticketCode
      this.carhisinfo.datas.tag = numb
      let submit = {}
      submit = JSON.stringify(this.carhisinfo)
      console.log('车辆轨迹模块提交的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetCarHistoricalRecordHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('车辆轨迹返回的数据' + back)
          // 使用通知返回信息
          // this.open1(JSON.parse(back).message)
          let first = JSON.parse(JSON.parse(back).datas)
          // 获取总数
          this.hisdataCount = parseInt(first.totalCount)
          // 第二个parse
          let second = JSON.parse(first.list)
          this.hislist = second
          console.log("第二个" + JSON.stringify(this.hislist))
          if (this.carhisinfo.datas.tag == 1) {
            for (var i = 0; i < second.length; i++) {
              // let t = JSON.parse(second[i].dealInfo)
              let show = {}
              show.serialNum = second[i].serialNum
              show.use_time = second[i].use_time
              show.car_no = second[i].car_no
              show.addmonId = second[i].addmonId
              show.actual_coupon_amount = second[i].actual_coupon_amount
              show.cTm = second[i].cTm
              show.remark = second[i].remark
              show.addMonLater = second[i].addMonLater
              show.parkName = second[i].parkName
              show.merchantName = second[i].merchantName
              show.couponName = second[i].couponName
              show.use_status = second[i].use_status
              this.Coupon[i] = show
            }
            let third = JSON.stringify(this.Coupon)
            this.Coupon = JSON.parse(third)

            console.log('his显示的数据1' + JSON.stringify(this.Coupon)) //处理数据
            //
          } else if (this.carhisinfo.datas.tag == 2) {
            for (var i = 0; i < second.length; i++) {
              // let t = JSON.parse(second[i].dealInfo)
              let show = {}
              show.serialNum = second[i].serialNum
              show.inTm = second[i].inTm
              show.outTm = second[i].outTm
              show.inCarNo = second[i].inCarNo
              show.outCarNo = second[i].outCarNo
              show.inDevAdr = second[i].inDevAdr
              show.outDevAdr = second[i].outDevAdr
              show.parkName = second[i].parkName
              show.dealTag = second[i].dealTag
              show.ticketNo = second[i].ticketNo
              show.inPic = second[i].inPic
              show.outPic = second[i].outPic
              this.inoutimgs[i] = show
              console.log("wwwwwwww" + show)
            }
            let third = JSON.stringify(this.inoutimgs)
            this.inoutimgs = JSON.parse(third)

            console.log('his显示的数据2' + JSON.stringify(this.inoutimgs)) //处理数据
            //
          } else if (this.carhisinfo.datas.tag == 3) {
            for (var i = 0; i < second.length; i++) {
              // let t = JSON.parse(second[i].dealInfo)
              let show = {}
              show.addmonId = second[i].addmonId
              show.serialNum = second[i].serialNum
              show.payTime = second[i].payTime
              show.shouldpay = second[i].shouldpay
              show.realpay = second[i].realpay
              show.couponpay = second[i].couponpay
              show.payAddress = second[i].payAddress
              show.remark = second[i].remark
              show.dealMode = second[i].dealMode
              show.car_no = second[i].car_no
              show.ticketNo = second[i].ticketNo
              show.rbCouponPay = second[i].rbCouponPay
              show.payStatus = second[i].payStatus
              show.outStatus = second[i].outStatus
              this.paymes[i] = show
            }
            let third = JSON.stringify(this.paymes)
            this.paymes = JSON.parse(third)
            console.log('his显示的数据3' + JSON.stringify(this.paymes)) //处理数据
            //
          }

        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    // 提示信息(右上角那种)
    open1 (a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        title: '提示',
        message: msg,
        customClass: "notify01",
        duration: 10000,
      })
    },
    open2 (a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        title: '提示',
        message: msg,
        customClass: "notify02",
        duration: 10000,
        position: 'bottom-right'
      })
    },
    open3 (a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        title: '提示',
        message: msg,
        customClass: "notify03",
        duration: 10000,
        position: 'top-right'
      })
    },
    //通过车牌号搜索信息
    searchinfo0 () {
      if (!this.searchinfo.datas.devConnId) {
        this.open2('请输入要搜索的车牌号</br>')
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

          console.log('搜索车牌号返回的数据' + trb)

          if (partrb.statusCode == 200) {
            // 搜索成功之后先清空
            this.clearinfo()
            this.tradeback = JSON.parse(JSON.parse(trb).datas)
            console.log("搜索返回tradeback" + JSON.stringify(this.tradeback))
            this.imgsrc01 = this.tradeback.inpic
            this.imgsrc02 = this.tradeback.outpic
            // this.imgsrc02 = this.tradeback.outpic.replace('+', '%2B')
          } else {
            this.open3(partrb.message)
          }
        })
        .catch(err => {
          let cuowu = JSON.stringify(err)
        })
    },
    // 完成本次服务调用接口
    comService () {
      if (!this.reasonId2) {
        this.open2('请输入原因')
        return
      }
      this.msgbox2("您确定要完成本次服务吗", "提示")
    },
    imgsrcchange () {
      this.callstatussrc = '@/assets/img/carbw.png'
    },
    //搜索出现问题时返回的信息
    msgbox3 (a, b) {
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
    msgbox1 (a, b) {
      this.$confirm(a, b, {
        // showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: "msgbox"
      })
        .then(() => {
          if (this.reasonId1) {
            this.opendoorinfo.datas.userId = localStorage.user
            this.opendoorinfo.datas.deviceAdr = this.callback.devConnId
            this.opendoorinfo.datas.reasonId = this.reasonId1
            // 交易类型
            this.opendoorinfo.datas.dealtype = '1'
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
                if (res.data.statusCode != 200) {
                  this.open2(res.data.message)
                }
                let trb = JSON.stringify(res.data)
                console.log('手动开闸返回的数据' + trb)
                //开闸之后自动调用完成本次服务
                this.comService()
                // this.com2msg()
                // this.tradeback = JSON.parse(JSON.parse(trb).datas)
                console.log('手动开闸模块需要显示的数据' + this.tradeback)
              })
              .catch(err => {
                console.log('出现了错误' + err)
              })
          } else {
            this.open2('请输入开闸原因或类型')
          }
        })
        .catch(() => {
          
        })
    },
    msgbox2 (a, b) {
      this.$confirm(a, b, {
        // showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: "msgbox"
      })
        .then(() => {
          this.com2msg()
        })
        .catch(() => {
          
        })
    },

    com2msg () {
      this.cominfo.datas.userId = localStorage.user
      //交易类型
      this.cominfo.datas.dealtype = '1'
      this.cominfo.datas.serialNum = this.tradeback.TradingInfoID
      this.cominfo.datas.callId = this.callback.callId
      //获取到原因后需要更改
      this.cominfo.datas.reasonId = this.reasonId2

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
            this.open2('完成本次服务成功')
            this.clearinfo()
            this.zhuangtai = false
            this.hangup()
          }
        })
        .catch(err => {
          console.log('完成本次服务接口未联通')
        })
    },
    //获取呼入原因信息
    getreasoninfo () {
      this.reasoninfo.datas.userId = localStorage.user
      let submit = {}
      submit = JSON.stringify(this.reasoninfo)
      // submit = this.reasoninfo
      // console.log('原因模块发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/GetCallReasonListHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          // console.log('原因模块返回的数据' + back)
          this.reasonback = JSON.parse(JSON.parse(back).datas).list

          //让获取到的值和options2中的label和value相等
          //或者说把获取到的值遍历到options2中，2个属性label和value
          //label用于对外界显示，value用于保存key(即呼入原因ID)

          this.options2 = JSON.parse(this.reasonback)

          // console.log('options2中的信息' + this.options2)
        })
        .catch(err => {
          console.log('原因模块出现了错误' + err)
        })
    },
    //获取抬杆原因信息
    getreasoninfo2 () {
      this.reasoninfo2.datas.cashierCode = localStorage.user
      let submit = {}
      submit = JSON.stringify(this.reasoninfo2)
      // submit = this.reasoninfo
      // console.log('原因模块发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/GetOpenReasonListHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          // console.log('原因模块返回的数据' + back)
          this.reasonback2 = JSON.parse(JSON.parse(back).datas).list

          //让获取到的值和options1中的label和value相等
          //或者说把获取到的值遍历到options2中，2个属性label和value
          //label用于对外界显示，value用于保存key(即呼入原因ID)

          this.options1 = JSON.parse(this.reasonback2)

          // console.log('options1中的信息' + this.options1)
        })
        .catch(err => {
          console.log('原因模块出现了错误' + err)
        })
    },
    //获取远程推送金额分档
    getmoneykindinfo () {
      this.moneyinfo.datas.userId = localStorage.user
      this.moneyinfo.datas.parkId = this.callback.parkId
      // this.moneyinfo.datas.parkId = 'PK0067'
      let submit = {}
      submit = JSON.stringify(this.moneyinfo)
      console.log('远程推送金额分档发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/GetParkFixAmountHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        data: submit,
        // headers: { 'Content-Type': 'application/json' },
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('远程推送金额分档返回的数据' + back)
          this.moneyback = JSON.parse(JSON.parse(back).datas).list

          //让获取到的值和options2中的label和value相等
          //或者说把获取到的值遍历到options2中，2个属性label和value
          //label用于对外界显示，value用于保存key(即呼入原因ID)

          this.moneykind1 = JSON.parse(this.moneyback)

          // console.log('options2中的信息' + this.options2)
        })
        .catch(err => {
          console.log('原因模块出现了错误' + err)
        })
    },
    //获取自助机信息
    getzzjinfo () {
      this.zzjInfo.datas.userId = localStorage.user
      // this.zzjInfo.datas.parkId = this.callback.parkId
      this.zzjInfo.datas.parkId = 'PK0067'
      let submit = {}
      submit = JSON.stringify(this.zzjInfo)
      console.log('获取自助机信息发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/GetPayStationListInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        data: submit,
        // headers: { 'Content-Type': 'application/json' },
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log(back)
          this.zzjBack = JSON.parse(JSON.parse(res.data.datas).list)
          console.log(this.zzjBack)
        })
        .catch(err => {
          console.log('原因模块出现了错误' + err)
        })
    },
    //远程推送收费信息到缴费机
    pushtomech () {
      this.mechineinfo.datas.userId = localStorage.user
      // this.mechineinfo.datas.userId = 'lmf123'

      this.mechineinfo.datas.userType = 1

      // this.mechineinfo.datas.deviceAdr = this.callback.devConnId
      this.mechineinfo.datas.deviceAdr = this.zzj

      this.mechineinfo.datas.dealtype = 0

      this.mechineinfo.datas.serialNum = this.tradeback.TradingInfoID
      // this.mechineinfo.datas.serialNum = 'TP2019062509102785840FF'

      this.mechineinfo.datas.reason = 0
      this.mechineinfo.datas.pushTag = 1

      this.mechineinfo.datas.plate = this.tradeback.plate
      // this.mechineinfo.datas.plate = '苏B003A2'

      this.mechineinfo.datas.fixAmont = this.moneykind

      this.mechineinfo.datas.parkId = this.callback.parkId
      // this.mechineinfo.datas.parkId = 'PK0067'
      let submit = {}
      submit = JSON.stringify(this.mechineinfo)
      console.log('远程推送发送的数据：' + submit)
      this.$axios({
        method: 'post',
        url: '/PushAmountFuncHandler.ashx?method=POST&lan=zh-CN&type=web&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('远程推送收费信息到缴费机模块返回的数据' + back)
          alert("推送成功")
        })
        .catch(err => {
          console.log('远程推送收费信息到缴费机模块出现了错误' + err)
        })
    },
    // 获取视频的令牌
    getvideotoken () {
      this.videotoken.appKey = this.$appKey
      this.videotoken.appSecret = this.$appSecret
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
          this.tokenbacktime = this.getNow()
          console.log('接到了token:' + this.tokenback)
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    initvideo01 () {
      this.player = new EZUIKit.EZUIPlayer('myplayer')
      this.player.play()
    },
    comparedate () {
      let nowtime00 = this.getNow()
      console.log(nowtime00 + "nowtime00")
      console.log(this.tokenbacktime)

      var date1 = new Date(nowtime00);
      var date2 = new Date(this.tokenbacktime);
      var date3 = (date1.getTime() - date2.getTime()) / 1000;   //相差秒数
      console.log("比较2个日期相差秒数" + date3)
      return date3
    },
    initvideo02 () {
      if (this.comparedate() > 432000) {
        console.log("wtfffffffffffffffffff")
        this.getvideotoken()

      }
      // console.log('我要打印看下' + this.tokenback)
      // console.log(this.camera_serial)
      this.deviceID = this.camera_serial.split('-')[0]
      this.chanelNo = this.camera_serial.split('-')[1]
      // console.log(this.deviceID)
      // console.log(this.chanelNo)
      let token = this.tokenback
      let head = 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/' + this.deviceID + '/' + this.chanelNo + '.hd.live&autoplay=1&accessToken='
      this.livesrc02 = head + token
      // let tk2 = 'at.cupam2ho91lp6rp04qwr5d6k60btucuq-7p1onnrvlm-0b1f2al-wyx6i96jj'
      // this.livesrc02 = head + tk2
      console.log('视频播放地址' + this.livesrc02)
    },
    // 从token中获取账号绑定的话机号，用来绑定socket的shopid
    getlocalTel () {
      let tel = JSON.parse(localStorage.token)
      let tele = JSON.stringify(tel.hostId).replace(new RegExp('"', 'g'), '')
      let telep = new Array()
      telep = tele.split(',')
      console.log('从localStorage中获取到token中保存的与账号绑定的话机一号' + telep[0])
      this.telephone = telep[0]
    },
    //从界面挂断电话
    hangup () {
      console.log("挂断的主机" + this.telephone)
      let id = this.telephone
      this.$axios({
        method: 'post',
        url: this.$springurl + '/sendxml/clearOne',
        data: id
        // emulateJSON: true
      })
        .then(res => {
          console.log('挂断成功')
          this.ombackansered.attribute = '已挂断'
        })
        .catch(err => {
          console.log('挂断出现了错误' + err)
        })
    },
    // dialog的关闭
    handleClose (done) {
      console.log('关闭dialog')
      //done来控制窗口的关闭
      done()
    },
    // 初始化websocket
    initWebSocket () {
      let telnum = this.telephone
      let dizhi = this.$wsurl
      // 拼接地址
      const wsuri = dizhi + telnum //这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () {
      //连接建立之后执行send方法发送数据
      this.websocketsend('hello客户端')
      console.log('socket建立连接')
      this.socketinfo = "连接服务器成功"
    },
    websocketonerror () {
      //连接建立失败重连
      this.socketinfo = "连接服务器失败，准备10秒后重连"
      console.log('5秒后准备重连')
      // setTimeout(this.initWebSocket(), 10000);
    },
    websocketonmessage (e) {
      var da = e.data
      console.log(da)

      this.address = JSON.parse(da)
      console.log("OM设备发来的消息" + this.address)
      // 判断address中是不是有ext.id
      if (this.address.ext) {
        let num0 = this.address.ext[0].id
        if (this.address.ext[1].id) {
          var num1 = this.address.ext[1].id
        } else if (this.address.outer[0].to) {
          var num1 = this.address.outer[0].to
        } else {
          cosole.log("其他信息")
        }
        this.ombackansered = this.address
        if (this.address.attribute == '正在接听') {
          this.open1(this.callback.devConnName+num0 + '呼入电话')
          this.getcaller()
        }
      } else {
        this.ombackrecord.attribute = ''
        this.ombackrecord = this.address
        this.gettrade()
      }

    },
    websocketsend (Data) {
      //数据发送
      this.websock.send(Data)
    },
    websocketclose (e) {
      this.socketinfo = "服务器关闭连接，15秒后重连"
      //关闭
      console.log('断开连接', e)
      console.log('15秒后准备重连')
      //setTimeout(this.initWebSocket(), 15000);
    }
  },

  created () {
    this.getlocalTel()
  },
  beforeMount () {
    this.initWebSocket()
    // this.gettrade()
    this.getvideotoken()
    // this.initvideo02()
  },
  mounted () {
    this.getreasoninfo()
    this.getreasoninfo2()
  },
}