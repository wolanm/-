//action.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    gonglueList:[]
  },
  onLoad() {
    
  },
  
  onShow() {
    var that = this
    db.collection('scenic_guide_info').get().then(res => {
      dataList = []
      for (idx in res.data) {
        let item = res.data[idx]
        let dataObj = {
          id: item._id,
          name: item.title,
          image: item.imgList[0]
        }
        dataList.push(dataObj)
      }

      that.setData({gonglueList: dataList})
    })
  },

  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/actionlist/actionlist?id=${id}`
    })
  }
});