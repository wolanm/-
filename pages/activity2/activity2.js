// pages/activity2/activity2.js
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
    photoImg:"",
    activityList:[
      {
        id:1,
        name:"九歌山鬼夜游",
        location:"湖南省张家界武陵源区",
        introduction:"九歌山鬼是无数拍照达人安利的张家界最好拍的夜游景区。在张家界特有的美丽地貌之上，在深沉的夜色之下，取上你的魔法棒深入九歌山鬼夜游景区来一场奇幻之旅…九歌山鬼是实景结合灯光秀与数字光影艺术，以森林、溶洞、天坑为演绎剧场的沉浸式夜游景区，是国内唯一一个实景还原《山海经》奇幻世界的夜浒景区。漫步1.5小时，一边与《山海经》里的上古神兽和仙君们互动，一边听古老的传说故事，跟随ta们的引导走进神秘的世界，是国内的独一份！炎整个行程最大的亮点：体验到了森林与灯光的邂逅。",
        image:"/image/active11.jpg",
        images:[
          "/image/active11.jpg",
          "/image/active12.jpg",
          "/image/active13.jpg"
        ]
      },
      {id:2,
        name:"户外挑战—-槟榔谷",
        location:"张家界永定区罗塔坪乡",
        introduction:"这是一片张家界地貌和喀斯特地貌富集区，森林草地覆盖率超过80%。其间，刀劈斧削的石柱刺破云霄，壁立千仞的石墙绵延数里，石墙有门广，通向深深不知几许的溶洞迷宫，参照张家界地貌3亿8千万年的衍变史，槟榔谷堪称少年时代的张家界，是深藏亿万年沧海桑田变迁之地的地貌明珠。某种程度上，到了槟榔谷，就走进了张家界最纯净、最本初的历史。张家界槟榔谷是对有着“小张家界”之誉的罗塔坪乡各处景点的统称。",
        images:[
          "/image/active21.jpg",
          "/image/active22.jpg",
          "/image/active23.jpg",
        ]
      },
      {id:3,
        name:"《花儿与少年》拍摄地同款打卡",
        location:"张家界永定区",
        introduction:"在各个地方打卡，有机会获得如下免费旅游景点旅行体验卡哦！1.樟树市集  人均价0-200+。临山临水，有烧烤，旅行，高空低空网等等，由张家界本地摊主组成的市集每周一次。逛樟树集市是不收门票的，如果是你想樟树营区露营，可以选择租用帐篷，另外想攀爬花少同款低空网也需要收一定费用哦。2.大峽谷玻璃桥  人均价 80-200+,玻璃桥的盛名不用多说啦，十分惊险刺激，想要体验的赶快来！根据你的线路不同，门票费用也不同。3.黄龙洞景区灣 人均价120+。在“溶洞冠军”黄龙洞内恒温16-18°C，冬暖夏凉，想要避暑的不可错过，老少皆宜，十分适合出行游玩。在黄龙洞内，你可以感受时间的变迁，大自然工匠师的伟大，景色也是令人叹为观止。",
        images:[
          "/image/active31.jpg",
          "/image/active32.jpg",
          "/image/active33.jpg",
        ]
      },
      {id:4,
        name:"春节假期游张家界景区免门票",
        location:"张家界各大景区",
        introduction:"张家界武陵源景区、天门山景区、大峡谷景区、九天峰恋景区、黄龙洞景区、宝峰湖景区、七星山旅游度假区、大庸古城、七十二奇楼等景区对所有来张家界的游客实行景区门票免票优惠（不含景区内交通工具）。",
        images:[
          "/image/active41.jpg",
          "/image/active42.jpg",
          "/image/active43.jpg"
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.activityList.forEach(item => {
      if (item.id == options.id) {
        this.setData({
          name:item.name,
          location:item.location,
          introduction:item.introduction,
          photoImg: item.images
        })
      }
    })
  }
})