// pages/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPhone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userName: options.userName,
      userPhone: options.userPhone
    })
    console.log(this.data)
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