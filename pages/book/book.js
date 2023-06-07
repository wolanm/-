// pages/book/book.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    dates: [],
    times: [],
    selectedDate: '',
    selectedTime: '',
    cap: -1,
    // 预约信息
    name: '',
    sceneId: '',
    dateIndex: 0,
    timeIndex: 0,
    lastname: '',
    phone: ''
  },

  formatDate() {
    // 获取当前日期
    var date = new Date();
    dates = []
    for (let i = 0; i < 3; ++i) {
      // 获取当前月份
      var nowMonth = date.getMonth() + 1;
      // 获取当前是几号
      var strDate = date.getDate();
      // 添加分隔符“-”
      var seperator = "-";
      // 对月份进行处理，1-9月在前面添加一个“0”
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      // 对月份进行处理，1-9号在前面添加一个“0”
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
      var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
      dates.push(nowDate)
      date.setDate(date.getDate() + 1)
    }

    return dates
  },

  onLoad: function (options) {
  },

  onShow() {
    // 获取当前小程序的页面栈     
    let pages = getCurrentPages()
    // 数组中索引最大的页面--当前页面  
    let currentPage = pages[pages.length-1]
    var options = currentPage.options

    if (typeof(options.id) !== 'undefined') {
      var that = this
      if (typeof(options.phone) === 'undefined') {
        options.phone = ''
      }
      if (typeof(options.lastname) === 'undefined') {
        options.lastname = ''
      }
      db.collection('scenic_spots_info').where({
        _id: options.id
      }).get().then(res => {
        wx.setNavigationBarTitle({
          title: res.data[0].name
        });
        
        dates = this.formatDate()

        that.setData({
          name: res.data[0].name,
          sceneId: res.data[0]._id,
          opentime: res.data[0].opentime,
          address: res.data[0].address,
          times: res.data[0].reservetime,
          selectedTime: res.data[0].reservetime[0],
          dates: dates,
          selectedDate: dates[0],
          cap: res.data[0].capacity,
          phone: options.phone,
          lastname: options.lastname
        });
      })
    }
    
  },

  bindDateChange: function(e) {
    this.setData({
      dateIndex: e.detail.value,
      selectedDate: this.data.dates[e.detail.value],
    })
  },

  // 选择时间
  bindTimeChange: function(e) {
    this.setData({
      timeIndex: e.detail.value,
      selectedTime: this.data.times[e.detail.value],
    })
  },

  // 输入姓名
  bindNameInput: function(e) {
    this.setData({
     lastname: e.detail.value
    })
  },

  // 输入电话号码
  bindPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  delay(milSec) {
    return new Promise(resolve => {
      setTimeout(resolve, milSec)
    })
  },

  // 预约
  async reserve() {
    // 获取预约信息
    var that = this
    var dateIndex = this.data.dateIndex
    var timeIndex = this.data.timeIndex
    var lastname = this.data.lastname
    var phone = this.data.phone

    // 检查预约信息是否完整
    if (lastname == '' || phone == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error',
        duration: 1500
      })
      return
    }

    // 通过电话号码判断是否重复预约
    let query_phone_res = await db.collection('meet_info').where({
      phone: phone,
      sceneId: that.data.sceneId
    }).get()
    if (query_phone_res.data.length > 0) {
      wx.showToast({
        title: '请勿重复预约',
        icon: 'error',
        duration: 1500
      })

      return
    }

    // 检查剩余容量是否足够
    var cap = this.data.cap
    if (cap <= 0) {
      wx.showToast({
        title: '该时段预约已满',
        icon: 'error',
        duration: 1500
      })
      return
    }

    // 更新剩余容量
    cap--
    this.setData({
      cap: cap
    })
    await db.collection('scenic_spots_info').where({
      _id: that.data.sceneId
    }).update({data:{capacity: cap}})

    // 存储预约信息
    let number = -1
    while (1) {
      number = Math.floor(Math.random() * 1000000+10)
      var flag = false
      await db.collection('meet_info').where({
        number: number
      }).get().then(res => {
        if (res.data.length === 0) {
          flag = true
        }
      })
      
      if (flag) {
        break
      }
    }
     // 提交预约信息到服务器
    await db.collection('meet_info').add({
      data: {
        lastname: lastname,
        phone: phone,
        meetTime: that.data.dates[dateIndex] + ' ' + that.data.times[timeIndex],
        scenicName: that.data.name,
        sceneId: that.data.sceneId,
        number: number
      }
    })
    
    await wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 1500
    });

    await this.delay(1000)

    wx.navigateTo({
      url: `/pages/qrcode/qrcode?lastname=${lastname}&phone=${phone}&number=${number}&scenicName=${that.data.name}`
    })
  },

  navigate() {
    
  }
})
    
