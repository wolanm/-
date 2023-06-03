// pages/activity2/activity2.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 ,
    name:"",
    location:"",
    introduction :"",
    photoImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('scene_activity_info').where({
      _id: options.id
    }).get().then(res => {
      console.log(res)
      that.setData({
        name:res.data[0].title,
        location:res.data[0].location,
        introduction: res.data[0].content,
        photoImg:res.data[0].imgList
      })
    })
  },
})