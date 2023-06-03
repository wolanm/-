//teacher.js
//获取应用实例
var app = getApp()
const db = wx.cloud.database()

Page({
  data:{
    meishi:[]
  },

  onShow() {
    var that = this
    db.collection('spec_food_info').get().then(res => {
      specFoodList = []
      for (idx in res.data) {
        var foodObj = {
          name: res.data[idx].title,
          gaishu: res.data[idx].content,
          image: res.data[idx].imgList
        }

        specFoodList.push(foodObj)
      }

      that.setData({meishi: specFoodList})
    })
  }
})