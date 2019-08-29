<template>
  <div>
    <el-row :gutter="10" type="flex" class="row-bg" justify="center">
      <el-col :span="8" class="row-bg">
        <div class="grid-l1">
          <img src="@/assets/img/科尼赛克AgeraRS.png" style="width:100%;height:100%;" />
        </div>

        <div class="grid-l1-2">
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
          <img src="@/assets/img/卡普桌面壁纸1.png" style="width:100%;height:100%" />
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
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">停车详情</el-radio-button>
            <el-radio-button label="right">车场描述</el-radio-button>
            <el-radio-button label="top">查询停车记录</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="grid-l3-2">
          1、停车场名称
          2、哪个车道呼叫
          3、呼叫编号
          （备注：所有自助设备IP对讲的唯一ID,可以实现客服主动呼叫道口，最好是链接按钮)
          4、停车场计费标准及规则
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>
.grid-l1 {
  background-color: azure;
  border-radius: 4px;
  height: 32%;
}
.grid-l1-2 {
  background-color: azure;
  border-radius: 4px;
  height: 30%;
  margin-top: 4%;
}

.grid-l2 {
  background-color: azure;
  border-radius: 4px;
  min-height: 64%;
}
.grid-l2-2 {
  background-color: azure;
  border-radius: 4px;
  min-height: 30%;
  margin-top: 4%;
}

.grid-l3 {
  background-color: azure;
  border-radius: 4px;
  min-height: 48%;
}
.grid-l3-2 {
  background-color: azure;
  border-radius: 4px;
  min-height: 46%;
  margin-top: 3.5%;
}
.tit01 {
  padding-top: 10px;
  text-align: center;
  font-size: 50px;
  display: block;
}
.tit02 {
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  display: block;
}

.row-bg {
  min-height: 850px;
}
</style>