//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    a1src:'../../image/news_2.png',
    a2src: '../../image/meet_1.png',
    a3src: '../../image/news_1.png',
    a4src: '../../image/news_3.png',
    signupimg:'../../image/signup.png',
    imgUrls: [
      '/image/lunbo1.jpg',
      '/image/lunbo2.jpg',
      '/image/lunbo3.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 ,
    activityList:[
      {
        id:1,
        name:"九歌山鬼夜游",
        image:"/image/active11.jpg",
      },
      {id:'2',
        name:"户外挑战—-槟榔谷",
        image:"/image/active21.jpg",
      }
    ]
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        onsole.log("转发失败")
      }
    }
  },
  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;
    console.log(id)

    wx.navigateTo({
      url: `/pages/activity2/activity2?id=${id}`
    })
  }
})
