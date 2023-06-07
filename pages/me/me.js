const app = getApp()
const db = wx.cloud.database()

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userPhone:"",
    meetInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userName: app.globalData.userName,
      userPhone: app.globalData.userPhone
    })
  },

  onShow() {
    this.setData({
      userName: app.globalData.userName,
      userPhone: app.globalData.userPhone
    })
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
        url: '/pages/modify_user_info/modify_user_info'
      })

      return
    }

    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 获取用户的所有预约信息
   */

  getUserMeetInfo() {
    wx.navigateTo({
      url: '/pages/user_meet_info_mgr/user_meet_info_mgr',
    })
  }
})