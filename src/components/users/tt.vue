<template>
  <div>
    <div v-for="item in message">{{item}}</div>
    {{showlist}}
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      shopId: '',
      message: [],
      showlist: [],
      formdata: [
        {
          appId: '',
          privatekey: '',
          datas: "{'userCode':'oRUSf4ggQo8t54SMl8VqRLWwmIzE','pwd':'1234556','callServerIP':'','callServerPort':''}"
        }
      ]
    }
  },
  created() {
    // 页面创建生命周期函数
    this.initWebSocket()
    this.handleLogin()
  },
  destroyed: function() {
    // 离开页面生命周期函数
    // this.websocketclose()
  },
  methods: {
    initWebSocket() {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var ws = new WebSocket('ws://localhost:8080/websocket/DPS007')
      ;(ws.onopen = () => {
        console.log('websocket已连接，请发送数据')
        //连接websocket，使用send方法发送数据
        ws.send('hello')
        console.log('数据发送完成')
      }),
        (ws.onerror = e => {
          console.log('WebSocket连接发生错误')
        }),
        (ws.onmessage = e => {
          var da = e.data
          console.log(da)
          this.message = da
        }),
        (ws.onclose = e => {
          console.log('connection closed (' + e + ')')
          // setTimeout(ws.onopen(), 300)
        })
    },
    async handleLogin() {
      this.$axios({
        baseURL: '/api', //重写baseURL
        url: '/LoginBISHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00'
      })
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>