// pages/edit_activity_about_scene/edit_activity_about_scene.js
const db = wx.cloud.database()
let scrollTop = 0;
let screenHeight = 0;
let moveResult = {}
let start = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    location: '',
    imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png'],
    previewFlag: false,
    chooseFlag: false
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
    if (this.data.previewFlag || this.data.chooseFlag) {
      this.setData({ 
        previewFlag: false,
        chooseFlag: false
      })
      return
    }

    // 获取当前小程序的页面栈 
    let pages = getCurrentPages(); 
    // 数组中索引最大的页面--当前页面  
    let currentPage = pages[pages.length-1];
    var options = currentPage.options
    var that = this
    if (typeof(options.id) !== 'undefined') {
      db.collection('scene_activity_info').where({
        _id: options.id
      }).get().then(res => {
        var imgList = res.data[0].imgList
        imgList.push(that.data.imgList[0])
        that.setData({
          title: res.data[0].title,
          content: res.data[0].content,
          location: res.data[0].location,
          imgList: imgList
        })
      })
    } else {
      this.setData({
        title: '',
        content: '',
        location: '',
        imgList:['cloud://cloud1-8glw5m5v07e9ee9d.636c-cloud1-8glw5m5v07e9ee9d-1317059123/scenic_spot_tourism_img/add.png']
      })
    }

  },

  selectorChange(e) {
    let i = e.detail.value
    let v = this.data.editType[i]
    this.setData({selectItem: v})
  },

  async selectImg(e) {
    var idx = e.currentTarget.dataset.index
    var that = this
    if (idx !== this.data.imgList.length - 1) {
      var urls = []
      urls.push(that.data.imgList[idx])
      that.setData({previewFlag: true})
      await wx.previewImage({
        current: urls[0],
        urls: urls
      })
      
      return
    }

    var cnt = 7 - this.data.imgList.length
    that.setData({chooseFlag: true})
    await wx.chooseImage({
      count: cnt,
      sourceType:['album', 'camera'],
      success(res) {
        var imgList = that.data.imgList
        var imgUrl = res.tempFilePaths[0]
        imgList.splice(imgList.length - 1, 0, imgUrl)
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
    var location = e.detail.value.location
    var content = e.detail.value.content
    if (title.length === 0 || content.length === 0 || location.length === 0) {
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
      that.add_to_db(title, content, location, res)
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

  add_to_db(title, content, location, imgList) {
    db.collection('scene_activity_info').add({
      data : {
        title: title,
        content: content,
        location: location,
        imgList: imgList
      },
      success() {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
})