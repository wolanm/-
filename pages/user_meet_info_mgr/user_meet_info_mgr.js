// pages/user_meet_info_mgr/user_meet_info_mgr.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetInfoList: [],
    showList: [],
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    db.collection('meet_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      var meetInfoList = []
      for (i in res.data) {
        var meetInfo = {
          scenicName: res.data[i].scenicName,
          scenicId: res.data[i].sceneId,
          meetNumber: res.data[i].number,
          name: res.data[i].lastname,
          phone: res.data[i].phone,
          meetTime: res.data[i].meetTime
        }

        meetInfoList.push(meetInfo)
      }

      that.setData({
        meetInfoList: JSON.parse(JSON.stringify(meetInfoList)),
        showList: JSON.parse(JSON.stringify(meetInfoList))
      })
    })
  },

  search(e) {
    var word = e.detail.value
    var showList = []
    for (const v of this.data.meetInfoList) {
      if (v.phone.search(word) !== -1) {
        showList.push(JSON.parse(JSON.stringify(meetInfoList)))
      }
    }

    this.setData({showList: showList})
  },

  cancelSearch() {
    this.setData({
      inputValue: '',
      showList: JSON.parse(JSON.stringify(this.data.meetInfoList))
    })
  },

  editMeetInfo(e) {
    var index = e.currentTarget.dataset.index
    var id = this.data.showList[index].scenicId
    var phone = this.data.showList[index].phone
    var lastname = this.data.showList[index].name
    wx.navigateTo({
      url: `/pages/book/book?id=${id}&lastname=${lastname}&phone=${phone}`,
    })
  },

  async cancelMeetInfo(e) {
    var flag = false
    await wx.showModal({
      title: '提示',
      content: '确认取消预约吗'
    }).then(res => {
      if (res.confirm) {
        flag = true
      }
    })

    if (!flag) {
      return
    }
    
    var that = this
    var index = e.currentTarget.dataset.index
    var showList = this.data.showList
    var meetInfoList = this.data.meetInfoList
    var scenicId = showList[index].scenicId
    await db.collection('meet_info').where({
      number: showList[index].meetNumber
    }).remove().then(res => {
      var deleteIdx = 0
      while (deleteIdx < meetInfoList.length) {
        if (meetInfoList[deleteIdx].meetNumber === showList[index].meetNumber) {
          break
        }

        ++deleteIdx
      }
      showList.splice(index, 1)
      meetInfoList.splice(deleteIdx, 1)
      that.setData({
        showList: showList,
        meetInfoList: meetInfoList
      })
    })
    const _ = db.command
    db.collection('scenic_spots_info').where({
      _id: scenicId
    }).update({
      data: {
        capacity: _.inc(1)
      }
    })
  }
})