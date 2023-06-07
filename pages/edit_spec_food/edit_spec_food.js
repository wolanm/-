// pages/edit_spec_food/edit_spec_food.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png']
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
    // 获取当前小程序的页面栈 
    let pages = getCurrentPages()
    // 数组中索引最大的页面--当前页面  
    let currentPage = pages[pages.length-1]
    var options = currentPage.options
    var that = this
    if (typeof(options.id) !== 'undefined') {
      db.collection('spec_food_info').where({
        _id: options.id
      }).get().then(res => {
        var imgList = res.data[0].imgList
        imgList.push(that.data.imgList[0])
        that.setData({
          title: res.data[0].title,
          content: res.data[0].content,
          imgList: imgList
        })
      })
    } else {
      this.setData({
        title: '',
        content: '',
        imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png']
      })
    }
  },

  async selectImg(e) {
    var idx = e.currentTarget.dataset.index
    if (idx != this.data.imgList.length - 1) {
      return
    }

    var that = this
    var cnt = 2 - this.data.imgList.length
    await wx.chooseImage({
      count: cnt,
      sourceType:['album', 'camera'],
      success(res) {
        var imgList = that.data.imgList
        imgList.splice(imgList.length - 1, 0, res.tempFilePaths)
        that.setData({imgList: imgList})
      },
      fail(res) {
        return
      }
    })
  },

  async deleteImg(e) {
    var idx = e.currentTarget.dataset.index
    if (this.data.imgList.length < 6 && idx === this.data.imgList.length - 1) {
      return
    }

    var flag = false
    await wx.showModal({
      title: '提示',
      content: '确认要删除照片吗'
    }).then(res => {
      if (res.cancel) {
        flag = true
      }
    })

    if (flag) {
      return
    }

    var imgList = this.data.imgList
    imgList.splice(idx, 1)
    this.setData({ imgList: imgList })
  },

  async onSubmit(e) {
    var title = e.detail.value.title
    var content = e.detail.value.content
    if (title.length === 0 || content.length === 0) {
      wx.showToast({
        title: '请填写内容',
        icon:'error',
        duration: 1000
      })

      return
    }

    var that = this
    await new Promise((resolve) => {
      var res = that.uploadArctile()
      resolve(res)
    }).then(res => {
      that.add_to_db(title, content, res)
    })
  },

  async uploadArctile() {
    imgList = []
    var that = this
    for (let i = 0; i < this.data.imgList.length - 1; ++i) {
      let res = await new Promise(resolve => {
        let uploadRes = wx.cloud.uploadFile({
          cloudPath: 'images/' + Date.now() + '.jpg',
          filePath: that.data.imgList[i][0],
        })
        
        return resolve(uploadRes)
      })

      var fileId = res.fileID
      imgList.push(fileId)
    }

    return imgList
  },

  add_to_db(title, content, imgList) {
    db.collection('spec_food_info').add({
      data : {
        title: title,
        content: content,
        imgList: imgList
      },
      success(e) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
})