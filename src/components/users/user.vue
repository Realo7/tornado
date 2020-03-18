<template>
  <div>
    <div style="margin-bottom:20px;">
      <el-row>
        <el-col :span="12">
          <el-input
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            class="btn2"
          >搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <el-tabs
      tabPosition="left"
      type="border-card"
    >
      <!-- <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 一号停车场
        </span>
        <el-button
          type="primary"
          icon="el-icon-phone-outline"
          @click="callother"
        >1017</el-button>
        <el-button
          type="primary"
          icon="el-icon-phone-outline"
          @click="getlinkparklist()"
        >1号分机</el-button>
        <el-button
          type="
          primary"
          icon="el-icon-phone-outline"
          @click="gettelephonelist ()"
        >2号分机</el-button>
      </el-tab-pane> -->

      <el-tab-pane
        :key="item.parkName"
        v-for="(item,index) in parklistback"
      >
        <span
          slot="label"
          @click="gettelephonelist(index)"
        >
          <i class="el-icon-coordinate" />
          {{item.parkName}}
        </span>
        <el-button
          class="buttonoftele"
          :key="item.devId"
          v-for="(item,index) in telephoneback"
          @click="callother(index)"
        >{{item.devName}}</el-button>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: '',
      input: '',
      // parkId: 'PK0067',
      callinfo: {
        id1: '001',
        id2: '002'
      },
      parkback: [
        { parkname: '停车场一号', nirong: 'button1' },
        { parkname: '停车场二号', nirong: 'button1' },
        { parkname: '停车场三号', nirong: 'button1' },
        { parkname: 'givemefive', nirong: 'button1' }
      ],
      parklistinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '', parkName: '', pageIndex: '', pageSize: '' }
      },
      parklistback: [],
      telephoneinfo: {
        appId: '',
        privatekey: '',
        datas: { parkId: '', userId: '' }
      },
      telephoneback: {},
      devId: {}
    }
  },
  methods: {
    open2 (a) {
      let time = new Date()
      let now = time.toLocaleTimeString()
      let message = a
      let msg = message + ' ' + now
      this.$notify({
        title: '提示',
        message: msg,
        type: "succes",
        duration: 10000,
        position: 'top-right'
      })
    },
    callother (index) {
      let submit = {}
      // submit = JSON.Stringify(this.callinfo)
      this.devId = this.telephoneback[index].devId
      console.log(this.devId)
      var id2 = this.devId
      this.$axios({
        method: 'post',
        url: this.$springurl + '/sendxml/callother',
        data: { id1: '1016', id2: id2 }
        // headers: { 'Content-Type': 'application/json' }
        // emulateJSON: true
      })
      this.open2('请拿起话筒接听<br>')
      this.$router
        .push({
          name: 'operate'
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log('呼叫模块出现了错误' + err)
        })
    },
    //获取员工关联停车场列表
    async getlinkparklist () {
      this.parklistinfo.datas.userId = localStorage.user
      // 模糊查询停车场名称
      // this.parklistinfo.datas.parkName = '停车场名称'
      this.parklistinfo.datas.pageIndex = 0
      this.parklistinfo.datas.pageSize = 0
      let submit = {}
      submit = JSON.stringify(this.parklistinfo)
      console.log('搜索信息模块发送的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetParkInfoByUserHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          let partrb = JSON.parse(trb)
          console.log('获取员工关联停车场列表返回的数据' + trb)
          if (partrb.statusCode == 200) {
            this.parklistback = JSON.parse(JSON.parse(JSON.parse(trb).datas).list)
            // console.log("WWWWWWWWWWWWWWW" + JSON.stringify(this.parklistback))
            //回调根据停车场ID获取分机列表的方法
            this.gettelephonelist(0)
          } else {

          }
        })
        .catch(err => {
          console.log("获取员工关联停车场列表模块出现了错误")
        })
    },
    //根据停车场ID获取对讲分机列表
    async gettelephonelist (index) {
      // console.log("获取index" + index)
      // console.log("LOOOOOOL" + this.parklistback[index].parkId)
      this.telephoneinfo.datas.userId = localStorage.user
      this.telephoneinfo.datas.parkId = this.parklistback[index].parkId

      let submit = {}
      submit = JSON.stringify(this.telephoneinfo)
      console.log('搜索信息模块发送的数据' + submit)
      this.$axios({
        method: 'post',
        url: '/GetInterphoneHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let trb = JSON.stringify(res.data)
          let partrb = JSON.parse(trb)
          console.log('根据停车场ID获取对讲分机列表返回的数据' + trb)
          if (partrb.statusCode == 200) {
            this.telephoneback = JSON.parse(JSON.parse(JSON.parse(trb).datas).list)
            console.log(this.telephoneback)
          } else {

          }
        })
        .catch(err => {
          console.log("根据停车场ID获取对讲分机列表模块出现了错误")
        })
    },
  },
  mounted () {
    this.getlinkparklist()
    // 设置定时器的方法好蠢, 等会换一个async尝试,需要异步请求相关知识
    // setTimeout(() => {
    //   this.gettelephonelist(0)
    // }, 2000);

  }

}
</script>
<style>
.el-tabs {
  height: 800px;
}
.el-tabs__nav {
  height: 100%;
}
.el-tabs__item {
  height: 15%;
  text-align: center;
  padding-top: 20%;
  font-size: 24px;
  font-family: Mircosoft YaHei;
}
</style>
<style scoped>
/* local styles */
.buttonoftele {
  height: 100px;
  width: 240px;
  font-size: 24px;
  margin: 20px;
  text-align: center;
  /* background-color: deepskyblue; */
}
.btn2 {
  height: 40px;
  width: 100px;
  font-size: 22px;
  margin-left: 20px;
}
</style>