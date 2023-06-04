//signup.js
//获取应用实例

const db = wx.cloud.database()

var app = getApp()
Page({
  data: {
    scenicSpots: []
  },
  onLoad: function () {
    // Do something when page load
  },

  onShow() {
    var that = this
    db.collection('scenic_spots_info').get().then(res => {
      var scenicSpots = []
      for (idx in res.data) {
        scenicObj = {
          id: res.data[idx]._id,
          name: res.data[idx].name,
          image: res.data[idx].image[0],
          level: res.data[idx].level,
          gaishu: res.data[idx].gaishu,
          opentime: res.data[idx].opentime,
          state: res.data[idx].state,
          reserve: res.data[idx].reserve,
          address: res.data[idx].address,
          reservetime: res.data[idx].reservetime
        }

        scenicSpots.push(scenicObj)
      }

      that.setData({scenicSpots: scenicSpots})
    })
  },

  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/book/book?id=${id}`
    })
  }
})