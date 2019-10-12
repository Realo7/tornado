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
      searchcallinfo: {
        appId: '',
        privatekey: '',
        datas: { plate: '', useId: '', opUseId: '', parkId: '', startTm: '', endTm: '', pageNumber: '', pagesize: '' }
      },
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
    getuserinfo() {
      let submit = {}
      submit = JSON.stringify(this.userinfo)
      this.$axios({
        method: 'post',
        url: '/GetUserCallInfoListHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          //处理数据
          //
          //
          //
          //
          //
          //                    留白
          //
          //
          //
          //
          //
          //
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    }
  }
}
</script>