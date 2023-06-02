// pages/edit_activity_about_scene/edit_activity_about_scene.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editType: ['景区攻略', '景区动态'],
    selectItem: '景区攻略'
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

  selectorChange(e) {
    let i = e.detail.value
    let v = this.data.editType[i]
    this.setData({selectItem: v})
  },

  onSubmit(e) {
    
  }
})