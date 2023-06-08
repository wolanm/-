const db = wx.cloud.database()
const timer = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessCode: '',
    sendCodeTime: 0,
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

  generateMixed(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 10); //10为chars数组个数，数组里也可以写字母，只要这边个数写对就没问题
      res += chars[id];
    }
    return res;
  },

  getTimeStamp() {
    return timer.getTime() / 1000
  },

  onSendAccessCode(e) {
    this.setData({
      accessCode: accessCode,
      sendCodeTime: this.getTimeStamp()
    })
  },

  delay(milSec) {
    return new Promise(resolve => {
      setTimeout(resolve, milSec)
    })
  },

  async onModifyPassword(e) {
    var that = this
    var userName = e.detail.value.userName
    var userPassWord = e.detail.value.userPassWord
    var accessCode = e.detail.value.accessCode
    // 是否超时
    if (this.getTimeStamp() - this.data.sendCodeTime > 60) {
      await wx.showToast({
        title: '验证码已失效',
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

      that.delay(1000)

      wx.navigateTo({
        url: '/pages/admin_login/admin_login',
      })
    })
  }
})