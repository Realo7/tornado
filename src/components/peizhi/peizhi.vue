<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div>
    <div id="main" style="width: 800px;height: 600px;font-size:30px;"></div>
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
        datas: { useId: '' }
      }
    }
  },
  methods: {
    // 接收数据，获取运行状态信息
    getchartnum() {
      let submit = {}
      submit = JSON.stringify(this.someinfo)
      this.$axios({
        method: 'get',
        url: '/GetRunningInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          let back = JSON.stringify(res.data)
          console.log('chart部分返回的数据' + back)
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
    //画个圆
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
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
</style>