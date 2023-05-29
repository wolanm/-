// pages/admin_set_password/admin_set_password.js
const db = wx.cloud.database()
const timer = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessCode: '',
    sendCodeTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  geTimeStamp() {
    return timer.getTime() / 1000
  },

  onSendAccessCode(e) {
    this.setData({
      accessCode: accessCode,
      sendCodeTime: getTimeStamp()
    })
  },

  onModifyPassword(e) {
    var userName = e.detail.value.userName
    var userPassWord = e.detail.value.userPassWord
    var accessCode = e.detail.value.accessCode
    // 验证码是否正确
    if (accessCode !== this.data.accessCode || geTimeStamp - sendCodeTime > 60) {
      wx.showToast({
        title: '验证码错误',
        icon: 'error',
        duration: 1500
      })

      return
    }

    db.collection('admin_info').where({
      userName: userName
    }).update({
      userPassWord: userPassWord
    }).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1500
      })

      wx.navigateTo({
        url: '/pages/admin_login/admin_login',
      })
    })
  }
})