//about.js
//获取应用实例
var app = getApp()
const db = wx.cloud.database()

Page({
  data:{
    activityList:[],
  },

  onShow() {
    var that = this
    db.collection('scene_activity_info').get().then(res => {
      var activityList = []
      for (idx in res.data) {
        var activityObj = {
          id: res.data[idx]._id,
          name: res.data[idx].title,
          image: res.data[idx].imgList[0]
        }
        activityList.push(activityObj)
      }

      that.setData({activityList: activityList})
    })
  },

  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/activity2/activity2?id=${id}`
    })
  } 
  
})
