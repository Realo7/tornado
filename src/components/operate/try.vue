<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="date" label="车牌号"></el-table-column>
    <el-table-column prop="name" label="接听时间"></el-table-column>
    <el-table-column prop="province" label="处理时长"></el-table-column>
    <el-table-column prop="city" label="车场名称"></el-table-column>
    <el-table-column prop="address" label="处理人"></el-table-column>
    <el-table-column prop="zip" label="业务类型"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <!-- handleClick(scope.row) -->
        <el-button @click="getdata()" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      woXML: [],

      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      showlist: []
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    getdata() {
      var woXML = '<?xml version="1.0" encoding="utf-8" ?><Transfer attribute="Connect"><ext id="200"/><ext id="201"/></Transfer>'
      // var url = '192.168.1.28:80'
      // 发送一个 POST 请求

      this.$axios({ method: 'post', url: 'http://192.168.1.28:80', data: woXML })
        .then(resp => {
          console.log(resp)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>