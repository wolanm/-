//app.js
App({
  onLaunch: function () {
    // 云开发环境的初始化
    wx.cloud.init({
      env: 'cloud1-8glw5m5v07e9ee9d'
    })
    // 获取用户的 openid
    var that = this
    wx.cloud.callFunction({
      name:'login_get_openid',
      success(res) {
        that.globalData.openid = res.result.openid
        // 从数据库中查找是否有这条记录
        wx.cloud.database().collection('user_info').where({
          _openid: res.result.openid
        }).get({
          success(result) {
            var query_res = result.data[0]
            that.globalData.userName = query_res.userName
            that.globalData.userPhone = query_res.userPhone
            that.globalData.docId = query_res._id
            that.globalData.loginStatus = true
          }
        })
      }
    })
  },
  
  setUserInfo(userName, userPhone) {
    this.globalData.userName = userName
    this.globalData.userPhone = userPhone
  },

  globalData:{
    userName:'',
    userPhone: '',
    openid: '',
    docId: '',
    loginStatus:false,
    bookingInfo: null,
    reservation: {
      date: '',
      time: '',
      name: '',
      phone: ''
    }
  }
})