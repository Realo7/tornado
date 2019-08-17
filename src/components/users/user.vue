<template>
  <div>
    <el-button type="primary" @click="getdata1()">查看所有</el-button>
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="input" :label-width="80">
        <el-form-item label="用户名" label-position="right" label-width="120px">
          <Input v-model="input.username" placeholder="请填写你的用户名"></Input>
        </el-form-item>
        <el-form-item label="密码" label-position="right" label-width="120px">
          <Input v-model="input.password" placeholder="请填写你的密码"></Input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="地址">
        <template slot-scope="scope">
          <i class="el-icon-map-location"></i>
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      input: {
        username: '',
        password: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getdata1() {
      var apiall = ''
      this.$http.get(apiall).then(
        response => {
          console.log(response)
          this.list = response.body
        },
        function(err) {
          console.log(err)
        }
      )
    },
    useradd() {
      var apiadd = ''
      var jsonuser = {}
      jsonuser.input = JSON.stringify(this.input)
      console.log(jsonuser)

      this.$http.post(apiadd, jsonuser, { emulateJSON: true }).then(
        response => {
          console.log(response.body), alert('提交成功')
          this.getdata1()
        },
        response => {
          console.log(response)
          alert('出问题了')
        }
      )
    }
  }
}
</script>