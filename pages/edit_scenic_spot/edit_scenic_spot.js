// pages/edit_scenic_spot/edit_scenic_spot.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    capacity: NaN,
    address: '',
    state: '',
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
    imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (typeof(options.id) !== 'undefined') {
      var that = this
      db.collection('scenic_spots_info').where({
        _id: options.id
      }).get().then(res => {
        var imgList = res.data[0].image
        imgList.push(that.data.imgList[0])
        var opentime = res.data[0].opentime
        var reservetime = res.data[0].reservetime
        opentimeSplitRes = opentime.split('~')
        var startTime = opentimeSplitRes[0]
        var endTime = opentimeSplitRes[1]
        for (idx in reservetime) {
          reservetimeSplitRes = reservetime[idx].split('~')
          switch(idx) {
            case '0':
              that.setData({
                reserveTimeChangedFlag1 : true,
                reserveStartTime1 : reservetimeSplitRes[0],
                reserveEndTime1 : reservetimeSplitRes[1]
              })
              break
            case '1': 
            that.setData({
              reserveTimeChangedFlag2 : true,
              reserveStartTime2 : reservetimeSplitRes[0],
              reserveEndTime2 : reservetimeSplitRes[1]
            })
              break
            case '2':
              that.setData({
                reserveTimeChangedFlag3 : true,
                reserveStartTime3 : reservetimeSplitRes[0],
                reserveEndTime3 : reservetimeSplitRes[1]
              })
              break
          }
        }
        
        that.setData({
          name: res.data[0].name,
          selectedLevel: res.data[0].level,
          imgList: imgList,
          capacity: res.data[0].capacity,
          reserve: res.data[0].reserve,
          address: res.data[0].address,
          gaishu: res.data[0].gaishu,
          startTime: startTime,
          endTime: endTime,
          state: res.data[0].state
        })
      })
    } else {
      this.setData({
        name: '',
        capacity: NaN,
        address: '',
        state: '',
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
        imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png']
      })
    }
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
    // 获取当前小程序的页面栈 
    let pages = getCurrentPages(); 
    // 数组中索引最大的页面--当前页面  
    let currentPage = pages[pages.length-1];
    // 给 onLoad 传入 options 参数，执行 onLoad
    this.onLoad(currentPage.options)
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
          reserveTimeChangedFlag2: true
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
          reserveTimeChangedFlag2: true
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
    var state = e.detail.value.state
    if (name.length === 0 || gaishu.length === 0 || address.length === 0 || !this.data.reserveTimeChangedFlag2) {
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
    if (Object.is(cap, NaN) || cap <= 0) {
      wx.showToast({
        title: '请输入正确容量',
        icon: 'error',
        duration: 1000
      })

      return
    }

    reserveTime = []
    if (this.data.reserveTimeChangedFlag2) {
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
        state: state,
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