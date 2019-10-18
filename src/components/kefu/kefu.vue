<template>
  <div>
    <!-- <div>{{time}}</div> -->
    <el-form label-width="110px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="车牌号">
            <el-input v-model="userinfo.datas.plate" style="width:80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <!-- v-model绑定的是选中的value -->
          <el-form-item label="客服姓名">
            <el-select v-model="userinfo.datas.opUserId" placeholder="请选择是哪个客服" style="width: 80%;">
              <el-option label="客服01" value="客服01"></el-option>
              <el-option label="客服02" value="客服02"></el-option>
              <el-option label="客服03" value="客服03"></el-option>
              <el-option label="客服04" value="客服04"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="停车场名称">
            <el-select v-model="userinfo.datas.parkId" placeholder="请选择是哪个停车场" style="width: 80%;">
              <el-option label="停车场01" value="停车场01"></el-option>
              <el-option label="停车场02" value="停车场02"></el-option>
              <el-option label="停车场03" value="停车场03"></el-option>
              <el-option label="停车场04" value="停车场04"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="呼叫开始时间">
            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="userinfo.datas.startTm" default-value="2019-01-01 00:00:00" style="width:90%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="呼叫结束时间">
            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="userinfo.datas.endTm" default-value="2019-01-01 00:00:00" style="width:90%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="searchcallinfo()" style="margin-left:-100px;">立即检索</el-button>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="6">
          <el-form-item label="结束时间检索">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 55%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <!-- <span contenteditable="true">这是一段可以编辑的文字</span> -->
    <br />
    <hr />
    <el-table :data="list" style="width: 100%" max-height="700">
      <el-table-column type="index" :index="indexMethod" width="100" label="序号" fixed></el-table-column>
      <el-table-column prop="dealInfo.plate" label="车牌号" width="150"></el-table-column>
      <el-table-column prop="parkName" label="停车场名称" width="120"></el-table-column>
      <el-table-column prop="dealMode" label="停车类型" width="120"></el-table-column>
      <el-table-column prop="ticketCode" label="票号" width="120"></el-table-column>
      <el-table-column prop="startTm" label="入场时间" width="120"></el-table-column>
      <el-table-column prop="endTm" label="出场时间" width="120"></el-table-column>
      <el-table-column prop="callTm" label="呼叫时间" width="240"></el-table-column>
      <el-table-column prop="opUserId" label="客服名称" width="120"></el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="getdetail(scope.$index)" type="text" size="small">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="padding-left:50px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[9, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //前往
      currentPage: 1,
      // 总数
      dataCount: 0,
      // 每页显示条数
      pageSize: 9,
      //第几页
      page: 1,
      userinfo: {
        appId: '',
        privatekey: '',
        datas: { plate: '', userId: '', opUserId: '', parkId: '', startTm: '', endTm: '', pageNumber: '', pageSize: '' }
      },
      userback: {},
      list: [],
      dealInfo: {},
      operateLogList: [],
      time: '',
      showlist: [{}]
    }
  },
  methods: {
    searchcallinfo() {
      this.userinfo.datas.userId = localStorage.user
      this.userinfo.datas.pageSize = this.pageSize
      this.userinfo.datas.pageNumber = this.page
      let submit = {}
      submit = JSON.stringify(this.userinfo)
      console.log('提交的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetCallRecordInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('报表返回的数据' + back)
          this.open1(JSON.parse(back).message)
          let rrr = JSON.parse(JSON.parse(back).datas)
          this.dataCount = parseInt(rrr.totalCount)
          this.list = JSON.parse(rrr.list)

          // this.dealInfo = JSON.stringify(this.list.dealInfo)
          console.log('分页后需要显示的数据' + this.list)
          //处理数据
          //
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    msgbox1(a, b) {
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
    open1(a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        group: 'foo',
        duration: 3000,
        type: 'success',
        title: '注意',
        text: msg
      })
    },
    getnow() {
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
    conver(a) {
      return a < 10 ? '0' + a : a
    },
    // 处理页面变化
    handleCurrentChange(val) {
      this.page = val
      this.searchcallinfo()
      console.log(`当前页: ${val}`)
    },
    // 处理页码大小
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.searchcallinfo()
    },
    // 处理序号
    indexMethod(index) {
      return index + 1
    },
    //点击查看详情触发的事件
    getdetail(index) {
      console.log('当前是第' + index + '行')
      // console.log(this.list[index])
      this.$router.push({
        name: 'kefubb',
        params: {
          list: this.list[index]
          // nameYouWant2: name2
        }
      })
    }
  },
  mounted() {
    this.searchcallinfo()
    this.userinfo.datas.endTm = this.getnow()
  }
}
</script>
      