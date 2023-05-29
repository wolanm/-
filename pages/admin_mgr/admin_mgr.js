// pages/admin_mgr/admin_mgr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminName: '',
    adminPhone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      adminName: options.adminName,
      adminPhone: options.adminPhone
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

})