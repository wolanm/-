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
        userName: app.globalData.userName,
        userPhone: app.globalData.userPhone
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
    this.setData({
      userName: app.globalData.userName,
      userPhone: app.globalData.userPhone
    })
  },

  onSubmit(e) {
    if (e.detail.value.userPhone.length != 11) {
      wx.showToast({ // 显示Toast
        title: '手机号有误',
        icon: 'error',
        duration: 1500
      })

      return
    }
    this.setData({
      userName: e.detail.value.userName,
      userPhone: e.detail.value.userPhone,
    })
    app.setUserInfo(this.data.userName, this.data.userPhone)
    wx.cloud.database().collection('user_info').doc(app.globalData.docId).update({
      // data 传入需要局部更新的数据
      data: {
        userName: e.detail.value.userName,
        userPhone: e.detail.value.userPhone
      }
    })
    // 操作反馈
    wx.showToast({ // 显示Toast
      title: '修改成功',
      icon: 'success',
      duration: 1500
    })
  }
})