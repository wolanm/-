// pages/book/book.js
Page({
  data: {
    dates: ['今天', '明天', '后天'],
    times: ['上午07:00~12:00', '下午12:00~17:00', '晚上17:00~22:00'],
    selectedDate: '今天',
    selectedTime: '上午07:00~12:00',
    capacities: [
      [20000, 30000, 20000],
      [20000, 30000, 20000],
      [20000, 30000, 20000]
    ],
    // 预约信息
    dateIndex: 0,
    timeIndex: 0,
    lastname: '',
    phone: ''
  },
  onLoad: function (options) {
    const name = options.name;
    const opentime = options.opentime;
    const address = options.address;

    wx.setNavigationBarTitle({
      title: name
    });
    this.setData({
      name: name,
      opentime:opentime,
      address:address,
    });
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

  // 预约
  reserve: function() {
    // 获取预约信息
    var dateIndex = this.data.dateIndex
    var timeIndex = this.data.timeIndex
    var lastname = this.data.lastname
    var phone = this.data.phone

    // 检查预约信息是否完整
    if (lastname == '' || phone == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 检查剩余容量是否足够
    var capacities = this.data.capacities
    var capacity = capacities[dateIndex][timeIndex]
    if (capacity <= 0) {
      wx.showToast({
        title: '该时段预约已满',
        icon: 'none'
      })
      return
    }

    // 更新剩余容量
    capacities[dateIndex][timeIndex] = capacity - 1
    this.setData({
      capacities: capacities
    })

    // 存储预约信息
    var app = getApp()
    app.globalData.reservation.date = this.data.dates[dateIndex]
    app.globalData.reservation.time = this.data.times[timeIndex]
    app.globalData.reservation.lastname = lastname
    app.globalData.reservation.phone = phone
     // 提交预约信息到服务器
    // ...
    wx.showToast({
      title: '预约成功',
    });
    console.log(lastname)
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?lastname=${lastname}&phone=${phone}`
    })
  },

  navigate() {
    
  }
})
    
