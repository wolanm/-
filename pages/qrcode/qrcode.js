// pages/qrcode/qrcode.js


  Page({
    data: {
      number:'',
      lastname:'',
      phone:'',
    },
    onLoad: function(options) {
      // 从上一个页面获取预约信息
      this.setData({
        lastname:options.lastname,
        phone:options.phone,
      })
      // 生成随机预约号
      let number = Math.floor(Math.random() * 1000000+10)
      this.setData({
        number: number
      })
    }
  })