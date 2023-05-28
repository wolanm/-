//app.js
App({
  onLaunch: function () {
    // 云开发环境的初始化
    wx.cloud.init({
      env: 'cloud1-8glw5m5v07e9ee9d'
    })
    // 从数据库里拿
    this.globalData.userInfo = {
      userName: '微信用户',
      userPhone: ''
    }
  },

  setUserInfo(userName, userPhone) {
    this.globalData.userInfo.userName = userName
    this.globalData.userInfo.userPhone = userPhone
  },

  globalData:{
    userInfo:null,
    loginStatus:false
  },
})