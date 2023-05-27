const app = getApp()

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userPhone:""
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 管理员登录
   */
  onAdminLogin() {
    wx.navigateTo({
      url: '/pages/admin_login/admin_login',
    })
  },

  /**
   * 修改个人信息
   */
  onModifyPersonInfo() {
    if (app.globalData.loginStatus) {
      wx.navigateTo({
        url: '/pages/modify_person_info/modify_person_info',
      })
    } else {
      wx.navigateTo({
        url: '/pages/user_login/user_login',
      })
    }
  }
})