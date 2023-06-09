const db = wx.cloud.database()
const _ = db.command
const timer = new Date()
var ynStop = false
var num = 60

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessCode: '041039',
    num: num,
    hidden: false,
    sendFlag: false,
    open: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  switch() {
    this.setData({
      open: !this.data.open
    })
  },

  delay(milSec) {
    return new Promise(resolve => {
      setTimeout(resolve, milSec)
    })
  },

  fresh() {  //停止函数
    num = 60
    this.setData({
      num: 60,
      hidden: false,
      sendFlag: false
    })
  },

  async timer() {
    for (let i = 0; i < 60; ++i) {
      this.setData({
        num: num--
      })
      await this.delay(1000)
    }

    this.fresh()
  },
  
  onSendAccessCode() {
    this.setData({
      hidden: true,
      sendFlag: true
    })
    this.timer()
  },
 
  async onModifyPassword(e) {
    var that = this
    var userPassword = e.detail.value.userPassword
    var accessCode = e.detail.value.accessCode
    // 是否超时
    if (!this.data.sendFlag) {
      await wx.showToast({
        title: '验证码无效',
        icon: 'error',
        duration: 1500
      })

      return
    }

    // 验证码是否正确
    if (accessCode !== this.data.accessCode) {
      await wx.showToast({
        title: '验证码错误',
        icon: 'error',
        duration: 1500
      })

      return
    }

    await db.collection('admin_info').where({
      userName: 'admin'
    }).update({
      data: {
        userPassword: userPassword
      }
    })

    await wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1500
    })

    await that.delay(1000)

    wx.navigateTo({
      url: '/pages/admin_login/admin_login',
    })
  }
})