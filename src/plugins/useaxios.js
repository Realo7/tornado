//插件模块
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {

  //通用接口基准地址
  axios.defaults.baseURL='http://localhost:8080/'
  //  添加实例方法
  Vue.prototype.$http = axios

}

export default MyHttpServer