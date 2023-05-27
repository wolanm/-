const app = getApp()

Page({
  data: {
    button_status: false,
    userPhone: ''
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    this.setData({
      button_status: true
    })
    app.globalData.loginStatus = true
    
  },
  onGetPhoneNumber(e) {
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log('步骤2获检查用户登录状态，获取用户电话号码！', res)
          wx.request({
            url: '这里写自己的接口',
            data: {code: res.code},
            success: function(res) {
              console.log("步骤三获取授权码，获取授权openid，session_key",res);
              var userphone=res.data.data;
              that.setData({
                userPhone:userphone
              })
              // wx.setStorageSync('userphoneKey',userphone);
              //解密手机号
              var msg = e.detail.errMsg;
              var sessionID=wx.getStorageSync("userphoneKey").session_key;
              var encryptedData=e.detail.encryptedData;
              var iv=e.detail.iv;
              if (msg == 'getPhoneNumber:ok') {//这里表示获取授权成功
                wx.checkSession({
                  success:function(){
                        //这里进行请求服务端解密手机号
                    that.deciyption(sessionID,encryptedData,iv);
                  },
                  fail:function(){
                    // that.userlogin()
                  }
                })
              }
            },fail:function(res){
                console.log("fail",res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad(){
    
  }
})