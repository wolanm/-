//action.js
//获取应用实例
var app = getApp()
Page({
  data: {
    gonglueList:[
      {
        id:"1",
        name:"美丽乡村游",
        gaishu:"游马儿山村",
        image:"/image/gonglue1.jpg",
      },
      {
        id:"2",
        name:"网红打卡游",
        gaishu:"张家界大峡谷一溪布街一天门山一大庸古城",
        image:"/image/gonglue21.jpg",
      },
      {
        id:3,
        name:"学习科普游",
        gaishu:"看大庸风情，研学特色线路",
        image:"/image/gonglue31.jpg",
      },
      {
        id:"4",
        name:"七星山攻略",
        gaishu:"一生一定要去一次张家界七星山，美得惊人!",
        image:"/image/gonglue41.jpg",
      },
    ]
  },
  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/actionlist/actionlist?id=${id}`
    })
  }



});