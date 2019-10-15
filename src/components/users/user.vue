<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {}
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
          //              留白
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