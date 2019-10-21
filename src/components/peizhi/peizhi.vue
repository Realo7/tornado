<template>
  <div>
    <el-row>
      <div>
        <table style="width:100%;height:200px;">
          <tr>
            <td class="backg">
              <div>人工呼入量</div>
            </td>
            <td class="backg">
              <div>接通量</div>
            </td>
            <td class="backg">
              <div>接通率</div>
            </td>
            <td class="backg">
              <div>20秒接通率</div>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <br />
    </el-row>
    <el-row>
      <el-col :span="18">
        <!--为echarts准备一个具备大小的容器dom-->
        <div id="chartLineBox" style="width: 1200px;height: 400px;font-size:30px;"></div>
      </el-col>
      <el-col :span="6">
        <div id="main" style="width: 400px;height: 400px;font-size:30px;"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      charts: '',
      opinion: ['当前在线人数', '总共处理服务数量', '半小时内呼入量'],
      opinionData: [{ value: 335, name: '当前在线人数' }, { value: 310, name: '总共处理服务数量' }, { value: 310, name: '半小时内呼入量' }],
      someinfo: {
        appId: '',
        privatekey: '',
        datas: { userId: '' }
      },
      series: [
        {
          name: '人工呼入量',
          type: 'line',
          stack: '人工呼入量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '接通量',
          type: 'line',
          stack: '接通量',
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    }
  },
  methods: {
    // 接收数据，获取运行状态信息
    getchartnum() {
      this.someinfo.datas.userId = localStorage.user
      let submit = {}
      submit = JSON.stringify(this.someinfo)
      this.$axios({
        method: 'post',
        url: '/GetRunningInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('chart部分返回的数据' + back)
          //处理数据
          let someback = JSON.parse(JSON.parse(back).datas)
          this.opinionData[0].value = someback.onlinecount
          this.opinionData[1].value = someback.sumnum
          this.opinionData[2].value = someback.halfhourcallincount
          //
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //画个折线图
    drawChartLine() {
      this.chartLine = echarts.init(document.getElementById('chartLineBox'))
      this.chartLine.setOption({
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      })
    },
    //画个圆
    drawPie(id) {
      this.charts = echarts.init(document.getElementById('main'))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '80',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData
          }
        ]
      })
    }
  },
  //数据自动刷新，必然需要一个监听机制告诉Echarts重新设置数据
  watch: {
    //观察option的变化
    echarts1_option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },

  //调用
  mounted() {
    this.getchartnum()
    this.$nextTick(function() {
      this.drawPie('main')
      this.drawChartLine('chartLineBox')
    })
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.backg {
  background-color: rgb(92, 167, 231);
  border-radius: 12px;
  width: 20%;
}
</style>