// pages/edit_spec_food/edit_spec_food.js
// pages/edit_activity_about_scene/edit_activity_about_scene.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    new Promise((resolve) => {
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