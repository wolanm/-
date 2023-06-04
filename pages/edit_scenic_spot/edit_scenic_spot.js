// pages/edit_scenic_spot/edit_scenic_spot.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scenicLevels : ['国家级', '5A', '4A', '3A', '2A', '1A'],
    selectedLevel: '5A',
    startTime: '00:00',
    endTime: '00:00',
    reserveStartTime1: '00:00',
    reserveStartTime2: '00:00',
    reserveStartTime3: '00:00',
    reserveEndTime1: '00:00',
    reserveEndTime2: '00:00',
    reserveEndTime3: '00:00',
    reserveTimeChangedFlag1: false,
    reserveTimeChangedFlag2: false,
    reserveTimeChangedFlag3: false,
    imgList:['/image/add.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  selectorChange(e) {
    let i = e.detail.value
    let v = this.data.scenicLevels[i]
    this.setData({selectedLevel: v})
  },

  timeChange(e) {
    var time = e.detail.value
    var op = e.currentTarget.dataset.time
    switch(op) {
      case 'startTime':
        this.setData({startTime: time})
        break;
      case 'endTime':
        this.setData({endTime: time})
        break;
      case 'reserveStartTime1':
        this.setData({
          reserveStartTime1: time,
          reserveTimeChangedFlag1: true
        })
        break;
      case 'reserveStartTime2':
        this.setData({
          reserveStartTime2: time,
          reserveTimeChangedFlag2: true
        })
        break;
      case 'reserveStartTime3':
        this.setData({
          reserveStartTime3: time,
          reserveTimeChangedFlag3: true
        })
        break;
      case 'reserveEndTime1':
        this.setData({
          reserveEndTime1: time,
          reserveTimeChangedFlag1: true
        })
        break;
      case 'reserveEndTime2':
        this.setData({
          reserveEndTime2: time,
          reserveTimeChangedFlag2: true
        })
        break;
      case 'reserveEndTime3':
        this.setData({
          reserveEndTime3: time,
          reserveTimeChangedFlag3: true
        })
        break;
    }
  },

  selectImg(e) {
    var idx = e.currentTarget.dataset.index
    if (idx != this.data.imgList.length - 1) {
      return
    }

    var that = this
    var cnt = 2 - this.data.imgList.length
    wx.chooseImage({
      count: cnt,
      sourceType:['album', 'camera'],
      success(res) {
        var imgList = that.data.imgList
        imgList.splice(imgList.length - 1, 0, res.tempFilePaths)
        that.setData({imgList: imgList})
      }
    })
  },

  onSubmit(e) {
    var name = e.detail.value.name
    var gaishu = e.detail.value.gaishu
    var address = e.detail.value.address
    var reserve = e.detail.value.reserve
    var cap = e.detail.value.capacity
    if (name.length === 0 || gaishu.length === 0 || address.length === 0 || !this.data.reserveTimeChangedFlag1) {
      wx.showToast({
        title: '请填写内容',
        icon: 'error',
        duration: 1000
      })

      return
    }

    if (this.data.imgList.length == 1) {
      wx.showToast({
        title: '请选择图片',
        icon: 'error',
        duration: 1000
      })

      return
    }

    if (this.data.startTime > this.data.endTime || 
        this.data.reserveStartTime1 > this.data.reserveEndTime1 ||
        this.data.reserveStartTime2 > this.data.reserveEndTime2 ||
        this.data.reserveStartTime3 > this.data.reserveEndTime3) {
      wx.showToast({
        title: '请输入正确时段',
        icon: 'error',
        duration: 1000
      })

      return
    }

    cap = parseInt(cap, 10)
    console.log(cap)
    if (Object.is(cap, NaN) || cap <= 0) {
      wx.showToast({
        title: '请输入正确容量',
        icon: 'error',
        duration: 1000
      })

      return
    }

    reserveTime = []
    if (this.data.reserveTimeChangedFlag1) {
      reserveTime.push(this.data.reserveStartTime1 + '~' + this.data.reserveEndTime1)
      if (this.data.reserveTimeChangedFlag2) {
        reserveTime.push(this.data.reserveStartTime2 + '~' + this.data.reserveEndTime2)
        if (this.data.reserveTimeChangedFlag3) {
          reserveTime.push(this.data.reserveStartTime3 + '~' + this.data.reserveEndTime3)
        }
      }
    }

    var that = this
    db.collection('scenic_spots_info').add({
      data: {
        name: name,
        image: that.data.imgList[0],
        level: that.data.selectedLevel,
        gaishu: gaishu,
        opentime: that.data.startTime + '~' + that.data.endTime,
        reservetime: reserveTime,
        state: '免费开放',
        reserve: reserve,
        capacity: cap,
        address: address
      }
    }).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      })
    })
  }
})