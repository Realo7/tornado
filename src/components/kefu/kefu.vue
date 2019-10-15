<template>
  <div>
    <el-form label-width="110px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="车牌号检索">
            <el-input v-model="plate" style="width:80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <!-- v-model绑定的是选中的value -->
          <el-form-item label="按客服姓名检索">
            <el-select v-model="opUseId" placeholder="请选择是哪个客服" style="width: 80%;">
              <el-option label="客服01" value="客服01"></el-option>
              <el-option label="客服02" value="客服02"></el-option>
              <el-option label="客服03" value="客服03"></el-option>
              <el-option label="客服04" value="客服04"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="停车场名称检索">
            <el-select v-model="parkId" placeholder="请选择是哪个停车场" style="width: 80%;">
              <el-option label="停车场01" value="停车场01"></el-option>
              <el-option label="停车场02" value="停车场02"></el-option>
              <el-option label="停车场03" value="停车场03"></el-option>
              <el-option label="停车场04" value="停车场04"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开始时间检索">
            <el-col :span="12">
              <el-date-picker type="date" placeholder="选择日期" v-model="userinfo.datas.startTm" style="width:200%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="结束时间检索">
            <el-col :span="12">
              <el-date-picker type="date" placeholder="选择日期" v-model="userinfo.datas.endTm" style="width:200%;"></el-date-picker>
            </el-col>
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
    <el-table :data="showlist" style="width: 100%" max-height="600">
      <el-table-column prop="plate" label="车牌号" width="150" fixed></el-table-column>
      <el-table-column prop="parkName" label="停车场名称" width="120"></el-table-column>
      <el-table-column prop="startTm" label="入场时间" width="120"></el-table-column>
      <el-table-column prop="endTm" label="出场时间" width="120"></el-table-column>
      <el-table-column prop="dealMode" label="停车类型" width="120"></el-table-column>
      <el-table-column prop="ticketCode" label="票号" width="120"></el-table-column>
      <el-table-column prop="opUseId" label="开闸客服id" width="120"></el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="getdetail" type="text" size="small">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationClass">
      <el-pagination :total="dataCount" :page-size="pagesize" show-total @on-change="changepage" show-elevator on-page-size-change="pagesize"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // plate: '',
      // useId: '',
      // opUseId: '',
      // parkId: '',
      // startTm: '',
      // endTm: '',
      pagesize: 6,
      page: 1,
      userinfo: {
        appId: '',
        privatekey: '',
        datas: { plate: '', useId: '', opUseId: '', parkId: '', startTm: '', endTm: '', pageNumber: '', pagesize: '' }
      },
      userback: {},

      list: [],
      showlist: [
        {
          plate: '苏B 23333',
          opUseId: 'lmf001',
          parkName: '上海外滩',
          startTm: '2019-10-1',
          endTm: '20119-10-12',
          dealMode: '月租车',
          ticketCode: '232323232'
        }
      ],
      // showlist: { dealInfo: { parkName: '1222' } },
      dataCount: 0
    }
  },
  methods: {
    searchcallinfo() {
      this.userinfo.datas.useId = localStorage.user
      this.userinfo.datas.plate = this.plate
      this.userinfo.datas.opUseId = this.opUseId
      this.userinfo.datas.parkId = this.parkId
      this.userinfo.datas.startTm = this.startTm

      let submit = {}
      submit = JSON.stringify(this.userinfo)
      console.log('提交' + submit)
      this.$axios({
        method: 'get',
        url: '/GetCallRecordInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('报表返回的数据' + back)
          this.list = JSON.parse(JSON.parse(back).datas)
          console.log('分页后需要显示的数据' + this.showlist)
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
    },
    //点击查看详情触发的事件
    getdetail() {
      this.$router.push({ name: 'kefubb' })
    },

    changepage(index) {
      var _start = (index - 1) * this.pagesize
      var _end = index * this.pagesize
      this.showlist = this.list.slice(_start, _end)
    }
  },
  mounted() {}
}
</script>
      