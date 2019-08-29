<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <!--  -->
      <el-form-item label="车牌号检索">
        <el-input v-model="form.name" style="width: 45.4%;"></el-input>
      </el-form-item>
      <el-form-item label="按客服姓名检索">
        <el-select v-model="form.fenlei" placeholder="请选择是哪个客服">
          <el-option label="客服01" value="客服01"></el-option>
          <el-option label="客服02" value="客服02"></el-option>
          <el-option label="客服03" value="客服03"></el-option>
          <el-option label="客服04" value="客服04"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="停车场名称检索">
        <el-select v-model="form.fenlei" placeholder="请选择是哪个停车场">
          <el-option label="停车场01" value="停车场01"></el-option>
          <el-option label="停车场02" value="停车场02"></el-option>
          <el-option label="停车场03" value="停车场03"></el-option>
          <el-option label="停车场04" value="停车场04"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间检索">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 99%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="结束时间检索">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 99%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即检索</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <br />
    <hr />
    <el-table :columns="columns1" :data="showlist"></el-table>
    <div class="paginationClass"></div>
    <el-pagination :total="dataCount" :page-size="pagesize" show-total @on-change="changepage" show-elevator on-page-size-change="pagesize"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        { title: '停车场名称', key: 'KeyValue' },
        { title: '车辆牌照', key: 'Title' },
        { title: '入场时间', key: 'Type' },
        { title: '出场时间', key: 'Department' },
        { title: '入场通道', key: 'DutyMan' },
        { title: '出场通道', key: 'BeginTime' },
        { title: '停车类型', key: 'DutyMan' },
        { title: '车辆型号', key: 'DutyMan' },
        { title: '账单金额', key: 'DutyMan' },
        { title: '入场通道', key: 'DutyMan' }
      ],
      form: {
        carnum: '',
        fenlei: '',
        xmfl: '',
        bumen: '',
        dutyman: '',
        date1: '',
        date1: ''
      },
      list: [],
      showlist: [],
      dataCount: 0,
      pagesize: 6,
      page: 1
    }
  },
  methods: {
    submitForm() {
      var formData = {}
      formData.input = JSON.stringify(this.form)

      console.log(formData)
      var apiDocfind = 'http://192.168.1.3:44318/Docfind.ashx'

      this.$http.post(apiDocfind, formData, { emulateJSON: true }).then(
        Response => {
          console.log(Response)
          this.list = Response.body
          this.dataCount = this.list.length
          if (this.dataCount < this.pagesize) {
            this.showlist = this.list
          } else {
            this.showlist = this.list.slice(0, this.pagesize)
          }
        },
        function(err) {
          console.log('error')
        }
      )
    },
    getall() {
      var apiall = 'http://192.168.1.3:44318/Docshow.ashx'

      this.$http.get(apiall).then(
        response => {
          console.log(response)
          this.list = response.body
          this.dataCount = this.list.length
          if (this.dataCount < this.pagesize) {
            this.showlist = this.list
          } else {
            this.showlist = this.list.slice(0, this.pagesize)
          }
        },
        function(err) {
          console.log(err)
        }
      )
    },
    changepage(index) {
      var _start = (index - 1) * this.pagesize
      var _end = index * this.pagesize
      this.showlist = this.list.slice(_start, _end)
    }
  },
  mounted() {
    this.getall()
  }
}
</script>
      