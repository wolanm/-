// pages/qrcode/qrcode.js


  Page({
    data: {
      number:'',
      lastname:'',
      phone:'',
      name: '',
    },
    onLoad: function(options) {
      // 从上一个页面获取预约信息
      this.setData({
        lastname:options.lastname,
        phone:options.phone,
        number: options.number,
        name: options.scenicName
      })
    }
  })