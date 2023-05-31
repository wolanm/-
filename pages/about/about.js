//about.js
//获取应用实例
var app = getApp()
Page({
  data:{
    activityList:[
      {
        id:1,
        name:"九歌山鬼夜游",
        image:"/image/active11.jpg",
      },
      {id:'2',
        name:"户外挑战—-槟榔谷",
        image:"/image/active21.jpg",
      },
      {id:'3',
        name:"《花儿与少年》拍摄地同款打卡",
        image:"/image/active31.jpg"
      },
      {id:'4',
        name:"春节假期游张家界景区免门票",
        image:"/image/active41.jpg"
      },
    ],
  },

  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;
    console.log(id)

    wx.navigateTo({
      url: `/pages/activity2/activity2?id=${id}`
    })
  } 
  
})
