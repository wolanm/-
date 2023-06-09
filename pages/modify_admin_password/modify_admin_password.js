const db = wx.cloud.database()
const _ = db.command
const timer = new Date()
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
    open: false,
    stop: false
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
    num = 60
    this.setData({stop: false})
  },

  onHide() {
    this.setData({stop: true})
  },

  onUnload() {
    this.setData({stop: true})
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
      if (this.data.stop) {
        break
      }

      this.setData({
        num: num--
      })
      console.log(num)
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

    wx.navigateBack()
  }
})