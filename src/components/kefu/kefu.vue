<template>
  <div>
    <el-form>
      <table style="width:100%;">
        <tr>
          <td style="width:14%;">
            <el-form-item
              label="车牌号"
              class="big"
            >
              <el-input
                v-model="userinfo.datas.plate"
                style="width:90%;"
              ></el-input>
            </el-form-item>
          </td>
          <td style="width:20%;">
            <el-form-item
              label="停车场名称"
              class="big"
            >

              <el-select
                v-model="userinfo.datas.parkId"
                clearable
                placeholder="请选择是哪个停车场"
                style="font-size:24px;width: 80%;"
              >
                <!-- @click.native="getreasoninfo2()" -->
                <el-option
                  v-for="item in parklist"
                  :key="item.parkId"
                  :label="item.parkName"
                  :value="item.parkId"
                ></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td style="width:20%;">
            <el-form-item
              label="呼叫开始时间"
              class="big"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                v-model="userinfo.datas.startTm"
                default-value="2019-01-01 00:00:00"
                style="width:90%;"
              ></el-date-picker>
            </el-form-item>
          </td>
          <td style="width:20%;">
            <el-form-item
              label="呼叫结束时间"
              class="big"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                v-model="userinfo.datas.endTm"
                default-value="2019-01-01 00:00:00"
                style="width:90%;"
              ></el-date-picker>
            </el-form-item>
          </td>
          <td style="width:12%;">
            <el-form-item>
              <el-button
                type="primary"
                @click="searchcallinfo()"
              >立即检索</el-button>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!-- <span contenteditable="true">这是一段可以编辑的文字</span> -->
    <br />
    <hr />
    <el-table
      :data="showlist"
      style="width: 100%"
      max-height="700"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        width="100"
        label="序号"
        fixed
      ></el-table-column>
      <el-table-column
        prop="plate"
        label="车牌号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="parkName"
        label="停车场名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="dealMode"
        label="停车类型"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="ticketCode"
        label="票号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="answerTm"
        label="呼叫开始时间"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="hangUpTm"
        label="挂断时间"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="通话时长"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="useName"
        label="客服名称"
        width="120"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click="getdetail(scope.$index)"
            type="text"
            size="small"
          >查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="block"
      style="padding-left:50px;"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[11, 15 , 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //前往
      currentPage: 1,
      // 总数
      dataCount: 0,
      // 每页显示条数
      pageSize: 11,
      //第几页
      page: 1,
      userinfo: {
        appId: '',
        privatekey: '',
        datas: { plate: '', userId: '', opUserId: '', parkId: '', startTm: '', endTm: '', pageNumber: '', pageSize: '' }
      },
      userback: {},
      getparkinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', parkName: '', pageIndex: '', pageSize: '' }
      },
      getparkback: {},
      list: [],
      dealInfo: {},
      operateLogList: [],
      time: '',
      showlist: [],
      parklist: [],
      parkdataCount: '',
    }
  },
  methods: {
    searchcallinfo () {
      this.userinfo.datas.userId = localStorage.user
      this.userinfo.datas.pageSize = this.pageSize
      this.userinfo.datas.pageNumber = this.page
      let submit = {}
      submit = JSON.stringify(this.userinfo)
      console.log('提交的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetCallRecordInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('报表返回的数据' + back)
          this.open1(JSON.parse(back).message)
          let first = JSON.parse(JSON.parse(back).datas)
          // 获取总数
          this.dataCount = parseInt(first.totalCount)
          // 第二个parse
          let second = JSON.parse(first.list)
          this.list = second

          for (var i = 0; i < second.length; i++) {
            let t = JSON.parse(second[i].dealInfo)
            let show = {}
            show.plate = t.plate
            show.parkName = t.parkName
            show.dealMode = t.dealMode
            show.ticketCode = t.ticketCode
            show.answerTm = second[i].answerTm
            show.hangUpTm = second[i].hangUpTm
            show.duration = second[i].duration
            show.useName = t.useName
            this.showlist[i] = show
          }
          let third = JSON.stringify(this.showlist)
          this.showlist = JSON.parse(third)

          console.log('分页后需要显示的数据' + JSON.stringify(this.showlist)) //处理数据
          //
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    usergetpark () {
      this.getparkinfo.datas.userId = localStorage.user
      this.getparkinfo.datas.pageIndex = 1
      this.getparkinfo.datas.pageSize = 50
      let submit = {}
      submit = JSON.stringify(this.getparkinfo)
      console.log('获取停车场模块提交的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetParkInfoByUserHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('报表返回的数据' + back)
          this.open1(JSON.parse(back).message)
          let first = JSON.parse(JSON.parse(back).datas)
          // 获取总数
          this.parkdataCount = parseInt(first.totalCount)
          // 第二个parse
          let second = JSON.parse(first.list)
          this.parklist = second
          //
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    msgbox1 (a, b) {
      this.$confirm(a, b, {
        // showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.open1(a)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'ok'
          })
        })
    },
    open1 (a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        title: '提示',
        message: msg,
        customClass: "notify04",
        duration: 10000,
      })
    },
    getnow () {
      var now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()

      var nowtime =
        year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + this.conver(hours) + ':' + this.conver(minutes) + ':' + this.conver(seconds)

      this.time = nowtime.toString()
      return nowtime.toString()
    },
    conver (a) {
      return a < 10 ? '0' + a : a
    },
    // 处理页面变化
    handleCurrentChange (val) {
      this.page = val
      this.searchcallinfo()
      console.log(`当前页: ${val}`)
    },
    // 处理页码大小
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.searchcallinfo()
    },
    // 处理序号
    indexMethod (index) {
      return index + 1
    },
    //点击查看详情触发的事件
    getdetail (index) {
      console.log('当前是第' + index + '行')
      // console.log(this.list[index])
      // this.dealInfo = this.list
      this.$router.push({
        name: 'kefubb',
        params: {
          list: this.list[index]
          // nameYouWant2: name2
        }
      })
    }
  },
  mounted () {
    this.searchcallinfo()
    this.userinfo.datas.endTm = this.getnow()
    this.usergetpark()
  }
}
</script>
<style scoped>
.big >>> .el-form-item__label {
  font-size: 25px;
  margin: auto;
  /* color: aqua; */
}
.notify04 {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background-color: rgb(44, 243, 127);
  font-size: 24px;
  padding-top: 30px;
  padding-left: 20px;
}
</style>
      