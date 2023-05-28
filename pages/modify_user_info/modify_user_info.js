// pages/modify_person_info/modify_person_info.js
// import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPhone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        userName: app.globalData.userInfo.userName,
        userPhone: app.globalData.userInfo.userPhone
      })
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

  onSubmit(e) {
    console.log(e.detail.value)
    this.setData({
      userName: e.detail.value.userName,
      userPhone: e.detail.value.userPhone,
    })
    app.setUserInfo(this.data.userName, this.data.userPhone)
    this.onLoad()
    // 操作反馈
    wx.showToast({ // 显示Toast
      title: '修改成功',
      icon: 'success',
      duration: 1500
    })
  }
})