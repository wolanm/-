//signup.js
//获取应用实例
var app = getApp()
Page({
  data: {
    scenicSpots: [
      {
        id: 1,
        name: '张家界天门山景区',
        image: '/image/1.png',
        level:'5A',
        gaishu:"乘观光索道，游玻璃栈道",
        opentime:"开放时间：08:30~16:00",
        state:"今日开放",
        reserve:"需提前预定",
        address:"湖南省张家界市永定区大庸中路11号"
      },
      {
        id: 2,
        name: '张家界茅岩河景区',
        image: '/image/2.jpg',
        level:'4A',
        gaishu:"漂流欣赏两岸峭壁险峰",
        opentime:"开放时间：09:00~16:00",
        state:"今日开放",
        reserve:" ",
        address:"湖南省张家界市永定区南庄坪街道352国道"
      },
      {
        id: 3,
        name: '张家界七星山旅游度假区',
        image: '/image/3.jpg',
        level:'国家级',
        gaishu:"天空之眼 听风声说爱你",
        opentime:"开放时间：08:00~18:00",
        state:"今日开放",
        reserve:" ",
        address:"湖南省张家界市永定区天门山镇七星山旅游度假区"
      },
      {
        id: 4,
        name: '张家界大庸古城',
        image: '/image/4.jpg',
        level:'3A',
        gaishu:"还原古居民浓郁民族风情",
        opentime:"开放时间：08:00~23:59",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区崇文办事处滨河路大庸古城A1栋"
      },
      {
        id: 5,
        name: '张家界七十二奇楼景区',
        image: '/image/5.jpg',
        level:'3A',
        gaishu:"庸王国文旅小镇（网红打卡）",
        opentime:"开放时间：00:00~23:59",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界永定区武陵山大道航空学院南侧"
      },
      {
        id: 6,
        name: '张家界市博物馆',
        image: '/image/6.jpg',
        level:'3A',
        gaishu:"研学",
        opentime:"开放时间：09:00~16:00",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市大庸桥公园对面文化广场"
      },
      {
        id: 7,
        name: '张家界军声画院',
        image: '/image/7.jpg',
        level:'3A',
        gaishu:"独特的民族和艺术特色",
        opentime:"开放时间：08:00~18:30",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区子午路2号 "
      },
      {
        id: 8,
        name: '张家界牧笛溪景区',
        image: '/image/8.jpg',
        level:'3A',
        gaishu:"自然风光",
        opentime:"开放时间：07:00~19:00",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区四都坪乡牧笛溪村 "
      },
      {
        id: 9,
        name: '张家界罗峰山旅游景区',
        image: '/image/9.jpg',
        level:'3A',
        gaishu:"自然风光",
        opentime:"开放时间：08:30~18:00",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区四都坪乡牧笛溪村 "
      },
      {
        id: 10,
        name: '张家界马头溪景区',
        image: '/image/10.jpg',
        level:'3A',
        gaishu:"自然风光",
        opentime:"开放时间：08:30~18:30",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区王家坪镇马头溪村 "
      },
      {
        id: 11,
        name: '张家界石堰坪古寨景区',
        image: '/image/11.jpg',
        level:'3A',
        gaishu:"历史古迹",
        opentime:"开放时间：08:00~18:30",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区王家坪镇石堰平村 "
      },
      {
        id: 12,
        name: '张家界马儿山景区',
        image: '/image/12.jpg',
        level:'3A',
        gaishu:"自然风光",
        opentime:"开放时间：09:30~18:00",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区尹家溪镇马儿山村5组 "
      },
      {
        id: 13,
        name: '张家界远方的家景区',
        image: '/image/13.jpg',
        level:'3A',
        gaishu:"宜人山色 亲子酒店",
        opentime:"开放时间：00:00~23:59",
        state:"免费开放",
        reserve:" ",
        address:"湖南省张家界市永定区尹家溪镇瓦窑岗村2组  "
      },
    ]
  },
  onLoad: function () {
    // Do something when page load
  },
  onScenicSpotTap: function (event) {
    const id = event.currentTarget.dataset.id;
    const name = event.currentTarget.dataset.name;
    const opentime = event.currentTarget.dataset.opentime;
    const address = event.currentTarget.dataset.address;
    wx.navigateTo({
      url: `/pages/book/book?id=${id}&name=${name}&opentime=${opentime}&address=${address}`
    })
  }
})