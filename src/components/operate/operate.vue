<template>
  <div>
    <el-row
      :gutter="20"
      class="row-bg"
      type="flex"
    >
      <el-col :span="8">
        <!-- 入口图片 -->
        <div class="grid-l1">
          <div
            v-if="!imgsrc01"
            style="width:100%;height:100%"
          >
            <viewer style="width:100%;height:100%">

            </viewer>
          </div>
          <div
            v-if="imgsrc01"
            style="width:100%;height:100%"
          >
            <el-image
              :src="imgsrc01"
              style="width:100%;height:100%"
              :preview-src-list="srcList"
            >
              <div
                slot="error"
                style="width:100%;height:100%"
              >
                <img
                  src="@/assets/img/defaultshow.png"
                  width="100%"
                  height="100%"
                />
              </div>
            </el-image>
          </div>
        </div>
        <!-- 出口图片 -->
        <div class="grid-l1-2">
          <!-- <div
            v-if="!imgsrc02"
            style="width:100%;height:100%"
          >
            <img
              src="@/assets/img/carbw.png"
              width="100%"
              height="100%"
            />
          </div>
          <div
            v-if="imgsrc02"
            style="width:100%;height:100%"
          >
            <el-image
              :src="imgsrc02"
              style="width:100%;height:100%"
              :preview-src-list="srcList"
            >
              <div
                slot="error"
                style="width:100%;height:100%"
              >
                <img
                  src="@/assets/img/defaultshow.png"
                  width="100%"
                  height="100%"
                />
              </div>
            </el-image>
          </div> -->
        </div>
        <!-- 呼叫口的监控视频 -->
        <iframe
          :src="livesrc02"
          width="100%"
          height="40%"
          id="ysOpenDevice"
          controls
          allowfullscreen
        ></iframe>
        <div class="grid-l1-0">
          <span
            v-if="socketinfo=='服务器连接成功'"
            class="socket-bg-blue"
          >{{socketinfo}}</span>
          <span
            v-if="socketinfo!='服务器连接成功'"
            class="socket-bg-red"
          >{{socketinfo}}</span>
        </div>
      </el-col>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
      >
        <div>
          <el-input></el-input>
        </div>
        <div>
          <!-- 优惠券绑定信息的表格 -->
          <el-table
            :data="Coupon"
            style="width: 100%"
            max-height="250"
          >
            <!-- v-if="tagtype=='1'" -->
            <el-table-column
              prop="serialNum"
              label="交易流水号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="use_time"
              label="使用时间"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="car_no"
              label="车牌号码"
            ></el-table-column>
            <el-table-column
              prop="addmonId"
              label="子表Id"
            ></el-table-column>
            <el-table-column
              prop="actual_coupon_amount"
              label="实际优惠金额"
            ></el-table-column>
            <el-table-column
              prop="cTm"
              label="绑定时间"
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="支付方式"
            ></el-table-column>
            <el-table-column
              prop="addMonLater"
              label="应收金额"
            ></el-table-column>
            <el-table-column
              prop="parkName"
              label="停车场名称"
            ></el-table-column>
            <el-table-column
              prop="merchantName"
              label="商户名称"
            ></el-table-column>
            <el-table-column
              prop="couponName"
              label="优惠券名称"
            ></el-table-column>
            <el-table-column
              prop="use_status"
              label="使用状态"
            ></el-table-column>
          </el-table>
          <!-- 出入场信息的表格 -->
          <el-table
            :data="inoutimgs"
            style="width: 100%"
            max-height="250"
          >
            <!-- v-if="tagtype=='2'" -->
            <el-table-column
              prop="serialNum"
              label="交易流水号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="inTm"
              label="入场时间"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="outTm"
              label="出场时间"
            ></el-table-column>
            <el-table-column
              prop="inCarNo"
              label="入场车牌号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="outCarNo"
              label="出场车牌号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="inDevAdr"
              label="入场设备"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="outDevAdr"
              label="出场设备"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="parkName"
              label="停车场名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="dealTag"
              label="出入状态 "
              width="150"
            ></el-table-column>
            <el-table-column
              prop="ticketNo"
              label="票号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="inPic"
              label="入场图片"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="outPic"
              label="出场图片"
              width="150"
            ></el-table-column>
          </el-table>
          <!-- 缴费信息的表格 -->
          <el-table
            :data="paymes"
            style="width: 100%"
            max-height="250"
          >
            <!-- v-if="tagtype=='3'" -->
            <el-table-column
              prop="addmonId"
              label="ID"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="serialNum"
              label="交易流水号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="payTime"
              label="缴费时间"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="shouldpay"
              label="应收金额"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="realpay"
              label="实收金额"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="couponpay"
              label="优惠金额"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="payAddress"
              label="付费设备"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="付费方式"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="dealMode"
              label="缴费车辆类型"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="car_no"
              label="车牌号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="ticketNo"
              label="票号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="rbCouponPay"
              label="任泊优惠金额"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="payStatus"
              label="支付状态"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="outStatus"
              label="出场状态"
              width="150"
            ></el-table-column>

          </el-table>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-col :span="8">
        <div class="grid-l2-1">
          <span
            class="tit01"
            v-if="!tradeback.ComboMeal"
          >类型：</span>
          <span
            class="tit01"
            v-if="tradeback.ComboMeal"
          >{{tradeback.ComboMeal}}</span>
          <span
            class="tit01"
            v-if="statusCode=='200'"
          >{{tradeback.plate}}</span>
          <span
            class="tit01"
            v-if="statusCode!='200'"
          >{{showmsg}}</span>
          <br />
          <span class="tit02">
            <!-- <br /> -->
            <table width="100%">
              <tr>
                <td width="70%">
                  <span
                    class="spading1"
                    v-if="!callback.devTag"
                  >出入类型：</span>
                  <span
                    class="spading1"
                    v-if="callback.devTag=='1'"
                  >出入类型：入口</span>
                  <span
                    class="spading1"
                    v-if="callback.devTag=='2'"
                  >出入类型：出口</span>
                </td>
                <td width="30%"></td>
              </tr>
            </table>
            <span class="spading">票号：{{tradeback.TicketCode}}</span>
            <br />
            <span class="spading">入场时间：{{tradeback.InTm}}</span>
            <br />
            <span class="spading">当前时间：{{tradeback.NowTM}}</span>
            <br />
            <span class="spading">停车时长：{{tradeback.LeaveTime}}</span>
            <br />
            <span class="spading">
              应收金额(元)：
              <span style="color:red">{{tradeback.ShouldPayM}}</span>
            </span>
            <br />
            <span class="spading">优惠金额(元)：{{tradeback.CouponPayM}}</span>
            <br />
            <span class="spading">实收金额(元)：{{tradeback.RealPayM}}</span>
            <br />
            <span class="spading">免费离场时间：{{tradeback.FreeLeaveTime}}</span>
          </span>
        </div>

        <div class="grid-l2-2">
          <table
            width="92%"
            height="30%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="table-layout:fixed"
          >
            <tr height="30%">
              <td
                width="40%"
                style="font-size:24px;padding-left:20px;"
              >车辆信息查询:</td>
              <td width="60%">
                <el-input
                  type="text"
                  v-model="searchinfo.datas.devConnId"
                  onkeyup="value=value.replace(/[\W]/g,'') "
                  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                  placeholder="请输入车牌号"
                ></el-input>
              </td>
            </tr>
            <tr height="30%">
              <td width="40%"></td>
              <td
                width="60%"
                style="padding-left:10px;"
              >
                <el-button
                  style="height:90%;width:95%;background-color:rgb(11,186,19);font-size:24px;"
                  type="success"
                  icon="el-icon-search"
                  round
                  @click="searchinfo0"
                >搜索</el-button>
              </td>
            </tr>
            <tr height="40%"></tr>
          </table>

          <table
            width="92%"
            height="40%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="table-layout:fixed;font-size:24px;"
          >
            <tr>
              <td
                width="35%"
                style="padding-left:20px;text-align:center;"
              >抬杆原因:</td>
              <td
                width="65%"
                style="padding-left:20px;"
              >
                <!-- 获取选取的值只需要取this.kind即可 -->
                <el-select
                  v-model="reasonId1"
                  clearable
                  placeholder="请选择"
                  style="font-size:24px;"
                >
                  <!-- @click.native="getreasoninfo2()" -->
                  <el-option
                    v-for="item in options1"
                    :key="item.ReasonId"
                    :label="item.ReasonInfo"
                    :value="item.ReasonId"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td
                width="35%"
                style="padding-left:20px;text-align:center;"
              >呼入原因:</td>
              <td
                width="65%"
                style="padding-left:20px;"
              >
                <el-select
                  v-model="reasonId2"
                  clearable
                  placeholder="请选择"
                  style="font-size:24px;"
                >
                  <!-- @click.native="getreasoninfo()" -->
                  <el-option
                    v-for="item in options2"
                    :key="item.reasonId"
                    :label="item.reason"
                    :value="item.reasonId"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr></tr>
          </table>
          <table
            width="100%"
            height="20%"
            cellpadding="0"
            cellspacing="0"
            style="table-layout:fixed;font-size:24px;padding-left:10px;"
          >
            <tr>
              <td>
                <el-button
                  style="height:90%;width:45%;font-size:24px;"
                  type="primary"
                  icon="el-icon-check"
                  round
                  @click="comService()"
                  :disabled="!zhuangtai"
                  :class="{common: zhuangtai,skyblue: !zhuangtai}"
                >完成本次服务</el-button>
                <!-- :disabled="!wczhuangtai" -->
                <el-button
                  style="height:90%;width:45%;font-size:24px;"
                  type="primary"
                  icon="el-icon-unlock"
                  round
                  @click="openbyhands()"
                  :disabled="!zhuangtai"
                  :class="{orange: zhuangtai,skyblue: !zhuangtai}"
                >抬杆</el-button>
              </td>
            </tr>
          </table>
        </div>、
      </el-col>

      <el-col :span="8">
        <div class="grid-l3-1">
          <span
            class="tit00"
            v-if="!callback.parkName"
          >停车场名称</span>
          <span class="tit00">{{callback.parkName}}</span>
          <span class="tit03">通道：{{callback.devConnName}}</span>
          <span
            v-if="ombackrecord.callid"
            class="tit03"
            style="padding-bottom:20px;"
          >呼叫编号：{{ombackrecord.callid}}</span>
          <span
            v-if="!ombackrecord.callid"
            class="tit03"
            style="padding-bottom:20px;"
          >呼叫开始时间：{{nowtime}}</span>
          <div class="tit04">
            <div v-if="!ombackansered.attribute&&!ombackrecord.attribute">
              <img
                src="@/assets/img/comm.png"
                alt="显示不能"
                height="30%"
                width="30%"
              />
            </div>
            <span
              v-if="!ombackansered.attribute&&!ombackrecord.attribute"
              class="tit04"
            >空闲状态</span>
            <div v-if="ombackansered.attribute">
              <img
                src="@/assets/img/incalling.png"
                alt="显示不能"
                height="30%"
                width="30%"
              />
            </div>
            <span
              v-if="ombackansered.attribute"
              class="tit04"
            >{{ombackansered.attribute}}</span>
            <div v-if="ombackrecord.attribute && ombackansered.attribute=='' ">
              <img
                src="@/assets/img/hangup.png"
                alt="显示不能"
                height="30%"
                width="30%"
              />
            </div>
            <span
              v-if="ombackrecord.attribute && ombackansered.attribute=='' "
              class="tit04"
            >{{ombackrecord.attribute}}</span>
          </div>
          <div style="text-align:center; vertical-align:middel;padding:30
          px;"></div>
        </div>

        <!-- 第三列中间 -->
        <div class="grid-l3-2">
          <span
            class="tit05"
            style="padding-top:20px;"
            v-if="callback.parkRules"
          >收费标准 :</span>
          <span class="tit06">{{callback.parkRules}}</span>
          <span
            v-if="callback.freeCars"
            class="tit00"
          >车场业务信息</span>
          <span
            v-if="callback.freeCars"
            class="tit03"
          >免费车辆:{{callback.freeCars}}</span>
        </div>
        <!-- 远程推送金额1 -->
        <el-dialog
          title="远程推送金额"
          :visible.sync="dialog2"
        >
          <el-form>
            <el-form-item
              label="选择金额"
              label-width="150"
            >
              <el-select
                v-model="moneykind"
                placeholder="请选择需要推送的金额"
              >
                <el-option
                  v-for="item in moneykind1"
                  :key="item.AmountId"
                  :label="item.FixAmount"
                  :value="item.AmountId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="交易类型"
              label-width="150"
            >
              <el-select
                v-model="dealtype"
                placeholder="选择交易类型"
              >
                <el-option
                  v-for="item in dealtype1"
                  :key="item.dealId"
                  :label="item.dealvalue"
                  :value="item.dealId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="选择自助机"
              label-width="150"
            >
              <el-select
                v-model="zzj"
                placeholder="请选择需要推送的自助机"
              >
                <el-option
                  v-for="item in zzjBack"
                  :key="item.deviceId"
                  :label="item.deviceName"
                  :value="item.deviceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialog2 = false;pushtomech()"
            >确 定</el-button>
          </div>
        </el-dialog>

        <!-- 第三列下方 -->
        <div class="grid-l3-3">
          <el-row>
            <!-- <el-col :span="12">
              <el-select
                v-model="tagtype"
                placeholder="选择需要查看的历史轨迹"
                style="height:50px;"
              >
                <el-option
                  v-for="item in tagtype1"
                  :key="item.tagId"
                  :label="item.tagvalue"
                  :value="item.tagId"
                ></el-option>
              </el-select>
            </el-col> -->
            <el-col :span="12">
              <el-button
                icon="el-icon-view el-icon--right"
                class="el-button-grid-l3-3"
                @click="dialogVisible = true;getcarhistory0()"
              >车辆历史轨迹</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                @click="hangup()"
                class="el-button-grid-l3-3"
                style="background-color:rgb(158,234,106)"
              >挂断</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                @click="dialog2 = true;getmoneykindinfo();getzzjinfo()"
                class="el-button-grid-l3-3"
              >远程推送金额</el-button>
            </el-col>
            <!--
            <el-col :span="12">
              <el-button
                type="primary"
                @click="dialog3 = true"
                class="el-button-grid-l3-3"
              >远程推送金额2</el-button>
            </el-col> -->
          </el-row>
        </div>
        <div class="orangepart">剩余车位数：{{callback.remainSpace}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import operate from './operate'
</script>

<style  scoped>
.common {
  background-color: rgb(0, 174, 255);
}

.gray {
  background-color: rgb(133, 133, 133);
}

.orange {
  background-color: rgb(255, 84, 0);
}

.grid-l1-0 {
  height: 5%;
  /* margin-bottom: 5%; */
  position: fixed;
  bottom: 0;
}

.grid-l1 {
  height: 43%;
  margin-bottom: 1%;
  background-color: gainsboro;
  border-radius: 8px;
}

.grid-l1-2 {
  height: 15%;
}

.grid-l2-1 {
  background-color: rgb(248, 248, 252);
  margin: auto;
  height: 58%;
  margin-bottom: 1%;
}

.grid-l2-2 {
  height: 41%;
  border-radius: 0 0 10px 10px;
  overflow: auto;
  line-height: 60px;
  /* display: block; */
  padding-left: 40px;
  padding-top: 40px;
  background-color: rgb(248, 248, 252);
}

.grid-l3-1 {
  background-color: rgb(216, 228, 246);
  border-radius: 6px;
  /* overflow: auto; */
  vertical-align: middle;
  padding-left: 40px;
  height: 42%;
}

.grid-l3-2 {
  height: 29%;
  margin-bottom: 2%;
  background-color: rgb(216, 228, 246);
  padding-left: 20px;
  line-height: 20px;
  overflow: auto;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.grid-l3-3 {
  background-color: rgb(216, 228, 246);
  border-radius: 0 0 0px 0px;
  height: 20%;
  padding-left: 30px;
  padding-top: 20px;
  line-height: 90px;
  text-align: center;
}

.el-button-grid-l3-3 {
  height: 70px;
  width: 90%;
  font-size: 24px;
}

.orangepart {
  border-radius: 0 0 20px 20px;
  background-color: rgb(255, 84, 0);
  height: 7%;
  font-size: 38px;
  text-align: center;
  padding-top: 10px;
  color: aliceblue;
  display: block;
}

.spading {
  padding: 30px;
  line-height: 35px;
}

.spading1 {
  padding: 30px;
  line-height: 35px;
  font-size: 28px;
  /* padding-left: 110px; */
}

.spadingl2 {
  margin-top: 30px;
  padding-top: 10px;
  font-size: 30px;
}

.spad2 {
  line-height: 35px;
  font-size: 18px;
  height: 100%;
  padding: auto;
  /* display: block; */
}

.tit00 {
  line-height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 30px;
  display: block;
  font-weight: 550;
}

.tit01 {
  line-height: 50px;
  padding-top: 10px;
  padding-left: 30px;
  text-align: left;
  font-size: 36px;
  display: block;
}

.tit02 {
  line-height: 40px;
  font-size: 20px;
}

.tit03 {
  font-size: 24px;
  text-align: left;
  padding-bottom: 10px;
  display: block;
  white-space: pre-wrap;
}

.tit04 {
  padding-top: 10px;
  padding-bottom: 50px;
  text-align: center;
  font-size: 30px;
  display: block;
}

.tit05 {
  line-height: 30px;
  font-size: 20px;
  display: block;
  white-space: pre-wrap;
}

.tit06 {
  font-size: 20px;
  line-height: 30px;
  padding-left: 30px;
  display: block;
  white-space: pre-wrap;
}

.tit07 {
  line-height: 50px;
  padding-top: 30px;
  display: block;
  font-size: 20px;
}

.add01 {
  margin-top: 10px;
  text-align: center;
  font-size: 50px;
  display: block;
}

.add02 {
  margin-top: 0px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  display: block;
}

.msgbox01 {
  font-size: 50px;
  min-height: 200px;
}

.row-bg {
  height: 960px;
  /* align-items: flex-start; */
  justify-content: center;
}

/* .grid-l2-1 table tr td {
  border: 1px solid #f00;
}
.grid-l2-1 table tr {
  border: 1px solid blue;
} */
</style>
<style >
.el-message-box {
  height: 250px;
  width: 600px;
}
.el-message-box__title {
  font-size: 24px;
}
.el-message-box__content {
  height: 120px;
  font-size: 24px;
  padding-top: 30px;
}
.el-button--small {
  font-size: 24px;
  height: 50px;
  width: 90px;
}
.msgbox {
  font-size: 50px;
  padding-bottom: 20px;
  height: 300px;
}
.socket-bg-blue {
  color: blue;
}
.socket-bg-red {
  color: red;
}
.notify01 {
  border-radius: 10px;
  opacity: 1;
  width: 400px;
  height: 160px;
  /*! autoprefixer: off */
  background-color: rgb(243, 174, 44);
  /*! autoprefixer: on */
  padding-top: 30px;
  padding-left: 20px;
  line-height: 40px;
}
.notify02 {
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  max-width: 600px;
  height: 240px;
  background: rgb(240, 243, 44);
  padding-top: 30px;
  padding-left: 20px;
  line-height: 40px;
}
.notify03 {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background: rgb(252, 47, 47);
  padding-top: 30px;
  padding-left: 20px;
}
.el-notification__content {
  font-size: 22px;
}
/* .el-message-box__btns {
  height: 15%;
} */
</style>