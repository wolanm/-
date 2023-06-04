// pages/meet_mgr/meet_mgr.js
const db = wx.cloud.database()

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
    var that = this
    db.collection('meet_info').get().then(res => {
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
        meetInfoList: meetInfoList,
        showList: meetInfoList
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  search(e) {
    var word = e.detail.value
    var showList = []
    for (const v of this.data.meetInfoList) {
      if (v.phone.search(word) !== -1) {
        showList.push(v)
      }
    }

    this.setData({showList: showList})
  },

  cancelSearch() {
    this.setData({
      inputValue: '',
      showList: this.data.meetInfoList
    })
  },

  cancelMeetInfo(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var meetInfoList = this.data.meetInfoList
    db.collection('meet_info').where({
      number: meetInfoList[index].meetNumber
    }).remove().then(res => {
      meetInfoList.splice(index, 1)
      that.setData({meetInfoList: meetInfoList})
    })
  }
})