//actionlist.js
var app = getApp()
const db = wx.cloud.database()

Page({
 data:{
  indicatorDots: true,
  autoplay: true,
  interval: 5000,
  duration: 1000 ,
  name:'',
  introduction:'',
  photoImg:''
 },
 onLoad: function (options) {
  var that = this
  db.collection('scenic_guide_info').where({
    _id: options.id
  }).get().then(res => {
    that.setData({
      name: res.data[0].title,
      introduction: res.data[0].content,
      photoImg: res.data[0].imgList
    })
  })

}
})