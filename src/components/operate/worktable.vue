<template>
  <div>
    <el-row :gutter="10" type="flex" justify="start">
      <el-col :span="15" class="row-bg">
        <div class="grid-l1">
          照片1
          <img
            src="http://borchaw-parking-image.oss-cn-shanghai.aliyuncs.com/PK0030/192.168.1.101/20190905/20190905112713苏B003A2.jpg?Expires=1568886563&OSSAccessKeyId=LTAI0HvDBA7TWiur&Signature=6syzFDvv7Zgdz8R5T1wz74p2gNQ="
            style="width:100%;height:95%;"
          />
          <!-- <img src="@/assets/img/监控01.png" style="width:100%;height:95%;" /> -->
        </div>

        <div class="grid-l1-2">
          照片2
          <img src="@/assets/img/全景02.jpg" style="width:100%;height:95%;" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-l2">
          <div>
            <h3 style="padding-top:30px">查询停车记录</h3>
            <span class="add01">{{address}}</span>
            <span class="add02">{{passwaywhich}} : {{passwayname}}</span>
            <br />
            <span class="add02">呼叫编号：{{vistorid}}</span>
          </div>
          <el-form label-width="80px" style="width: 100%;margin-top:8%;">
            <el-form-item label="车 牌 号">
              <el-input v-model="formInline.user" placeholder="车牌号" style="width: 60%;"></el-input>
            </el-form-item>
            <el-form-item label="呼叫原因">
              <el-select v-model="formInline.region" placeholder="呼叫原因" style="width:60%">
                <el-option label="原因1" value="shanghai"></el-option>
                <el-option label="原因2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: '武汉天界',
      passwaywhich: '这里写哪个口呼叫',
      passwayname: '这里写呼叫口的名称',
      vistorid: '这里传呼叫编号vistorid',

      formInline: {
        user: '',
        region: ''
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

<style scoped>
/* 圆角边框border-radius */
.grid-l1 {
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  height: 47%;
  font-size: 22px;
  text-align: left;
}
.grid-l1-2 {
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  height: 47%;
  margin-top: 0.75%;
  font-size: 22px;
  text-align: left;
}

.grid-l2 {
  margin-top: -18px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  height: 96.25%;
}
.add01 {
  margin-top: 10%;
  text-align: center;
  font-size: 50px;
  display: block;
}
.add02 {
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  display: block;
}
.row-bg {
  height: 800px;
}
</style>