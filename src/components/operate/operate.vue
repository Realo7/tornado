<template>
  <div>
    <el-row :gutter="10" type="flex" class="row-bg" justify="center">
      <el-col :span="8" class="row-bg">
        <div class="grid-l1">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%;" />
        </div>

        <div class="grid-l1-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%;" />
          <!-- <embed
            src="http://player.youku.com/player.php/Type/Folder/Fid/23680436/Ob/1/sid/XOTMzNzg0MTY4/v.swf"
            quality="high"
            width="100%"
            height="100%"
            align="middle"
            allowScriptAccess="always"
            allowfullscreen="true"
            mode="transparent"
            type="application/x-shockwave-flash"
          ></embed>-->
        </div>

        <div class="grid-l1-2">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2">
          <span class="tit01">{{address}}</span>
          <span class="tit02">出场呼叫</span>
          <br />
          <span class="tit01">{{carnum}}</span>
          <div style="text-align:center; vertical-align:middel;padding:30px;">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>

        <div class="grid-l2-2">
          <span class="tit01">
            {{pay.paystatus}}
            <br />
            {{pay.needpay}}
          </span>
          <span class="tit02">
            应收车费(元)：{{pay.needpay}}
            已 支 付(元)：{{pay.alreadypay}}
            优免缴费(元)：{{pay.discount}}
            <br />
            中央收费(元)：{{pay.centerpay}}
            电子支付(元)：{{pay.elepay}}
          </span>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-l3">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="停车详情" name="first">
              <div>
                <br />
                <span class="spading">入场时间：</span>
                <br />
                <span class="spading">算费时间：</span>
                <br />
                <span class="spading">电子支付时间：</span>
                <br />
                <span class="spading">停车时长：</span>
                <br />
                <span class="spading">免费时长：</span>
                <br />
                <span class="spading">出场状态：</span>
                <br />
                <span class="spading">出场时间：</span>
                <br />
                <el-button type="primary" style="display:block;margin:20% 45%;" @click="what">刷新</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="车场描述" name="second">
              <br />
              <span class="spad2">
                <br />1.现场24小时负责人：李主管 18301050035(优先拨打授权，24小时联系电话)
                <br />2.授权人：孙艳波 电话：13683290015(紧急联系电话)
                <br />3.残疾车：有(云端验证证件)
                <br />4.长租车：(不包含)一位多车，多位多车
                <br />5.首汽共享授权云端免费放行
              </span>
            </el-tab-pane>
            <el-tab-pane label="查询停车记录" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </div>

        <div class="grid-l3-2">
          <span>
            呼叫原因：
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="danger">完成本次服务</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [
        {
          value: '选项1',
          label: 'A型车'
        },
        {
          value: '选项2',
          label: 'B型车'
        },
        {
          value: '选项3',
          label: 'C型车'
        }
      ],
      value: '',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      address: 'XX中心',
      carnum: '京A00001',
      pay: {
        paystatus: '待支付',
        needpay: '$50',
        alreadypay: '$0',
        discount: '$10',
        centerpay: '$0',
        elepay: '$10'
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.grid-l1 {
  background-color: white;
  border-radius: 4px;
  height: 32%;
}
.grid-l1-2 {
  background-color: white;
  border-radius: 4px;
  height: 30%;
  margin-top: 4%;
}

.grid-l2 {
  background-color: white;
  border-radius: 4px;
  height: 64%;
}
.grid-l2-2 {
  background-color: white;
  border-radius: 4px;
  height: 30%;
  margin-top: 4%;
}

.grid-l3 {
  background-color: white;
  border-radius: 4px;
  height: 64%;
}
.spading {
  padding: 20%;
  line-height: 35px;
}
.spad2 {
  line-height: 35px;
  font-size: 18px;
}
.grid-l3-2 {
  background-color: white;
  border-radius: 4px;
  height: 23%;
  margin-top: 3.5%;
  text-align: center;
  vertical-align: middle;
  padding: 30px;
}
.tit01 {
  line-height: 50px;
  padding-top: 30px;
  text-align: center;
  font-size: 30px;
  display: block;
}
.tit02 {
  padding-top: 30px;
  text-align: center;
  font-size: 18px;
  display: block;
}

.row-bg {
  max-height: 850px;
}
</style>