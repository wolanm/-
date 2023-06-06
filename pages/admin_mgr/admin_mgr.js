// pages/admin_mgr/admin_mgr.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminName: '',
    adminPhone: '',
    meetCnt: 0,
    spotCnt: 0,
    guideCnt: 0,
    activityCnt: 0,
    foodCnt: 0
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
    var that = this
    db.collection('meet_info').get().then(res => {
      that.setData({
        meetCnt: res.data.length
      })
    })
    db.collection('scenic_spots_info').get().then(res => {
      that.setData({
        spotCnt: res.data.length
      })
    })
    db.collection('scenic_guide_info').get().then(res => {
      that.setData({
        guideCnt: res.data.length
      })
    })
    db.collection('scene_activity_info').get().then(res => {
      that.setData({
        activityCnt: res.data.length
      })
    })
    db.collection('spec_food_info').get().then(res => {
      that.setData({
        foodCnt: res.data.length
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  editActivityAboutScene() {
    wx.navigateTo({
      url: '/pages/edit_activity_about_scene/edit_activity_about_scene',
    })
  },

  editSceneActivity() {
    wx.navigateTo({
      url: '/pages/edit_scene_activity/edit_scene_activity',
    })
  },

  editSpecFood() {
    wx.navigateTo({
      url: '/pages/edit_spec_food/edit_spec_food',
    })
  },

  editScenicSpot() {
    wx.navigateTo({
      url: '/pages/edit_scenic_spot/edit_scenic_spot',
    })
  },

  manageMeetInfo() {
    wx.navigateTo({
      url: '/pages/meet_mgr/meet_mgr',
    })
  },

  manageArticleInfo(e) {
    var pageType = e.currentTarget.dataset.pagetype
    wx.navigateTo({
      url: `/pages/article_mgr/article_mgr?pageType=${pageType}`,
    })
  }
})