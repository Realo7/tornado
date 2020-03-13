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
      <el-tab-pane>
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
        >1号分机</el-button>
        <el-button
          type="primary"
          icon="el-icon-phone-outline"
        >2号分机</el-button>
      </el-tab-pane>
      <el-tab-pane
        :key="item.parkname"
        v-for="item in parkback"
      >
        <span slot="label">
          <i class="el-icon-coordinate" />
          {{item.parkname}}
        </span>
        <el-button>这是个按钮</el-button>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      callinfo: {
        id1: '001',
        id2: '002'
      },
      parkback: [
        { parkname: '停车场一号', nirong: 'button1' },
        { parkname: '停车场二号', nirong: 'button1' },
        { parkname: '停车场三号', nirong: 'button1' },
        { parkname: 'givemefive', nirong: 'button1' }
      ]
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
    callother () {
      let submit = {}
      // submit = JSON.Stringify(this.callinfo)
      this.$axios({
        method: 'post',
        url: this.$springurl + '/sendxml/callother',
        data: { id1: '1016', id2: '1017' }
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
    }
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
.el-button {
  height: 100px;
  width: 180px;
  font-size: 26px;
}
.btn2 {
  height: 40px;
  width: 100px;
  font-size: 22px;
  margin-left: 20px;
}
</style>