// pages/article_mgr/article_mgr.js
const db = wx.cloud.database()
const pageMap = new Map([
  ["0", 'edit_scenic_spot'],
  ["1", 'edit_activity_about_scene'],
  ["2", 'edit_scene_activity'],
  ["3", 'edit_spec_food']
])
const collectionMap =  new Map([
  ["0", 'scenic_spots_info'],
  ["1", 'scenic_guide_info'],
  ["2", 'scene_activity_info'],
  ["3", 'spec_food_info']
])

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfoList: [],
    showList: [],
    page: '',
    coll: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    var pageType = options.pageType
    var page = pageMap.get(pageType)
    var coll = collectionMap.get(pageType)
    
    var articleInfoList = []
    switch(pageType) {
      case "0":
        db.collection(coll).get().then(res => {
          for (idx in res.data) {
            var articleObj = {
              id: res.data[idx]._id,
              title: res.data[idx].name,
              content: res.data[idx].gaishu,
              level: res.data[idx].level,
              capacity: res.data[idx].capacity,
              opentime: res.data[idx].opentime,
              reservetime: res.data[idx].reservetime,
              address: res.data[idx].address,
              image: res.data[idx].image,
              reserve: res.data[idx].reserve,
              state: res.data[idx].state
            }
            console.log(articleObj)

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: articleInfoList,
            showList: articleInfoList
          })
        })
        break;
      case "1":
        db.collection(coll).get().then(res => {
          for (idx in res.data) {
            var articleObj = {
              id: res.data[idx]._id,
              title: res.data[idx].title,
              content: res.data[idx].content,
              imgList: res.data[idx].imgList
            }

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: articleInfoList,
            showList: articleInfoList
          })
        })
        break;
      case "2":
        db.collection(coll).get().then(res => {
          for (idx in res.data) {
            var articleObj = {
              id: res.data[idx]._id,
              title: res.data[idx].title,
              content: res.data[idx].content,
              imgList: res.data[idx].imgList,
              location: res.data[idx].location
            }

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: articleInfoList,
            showList: articleInfoList
          })
        })
        break;
      case "3":
        db.collection(coll).get().then(res => {
          for (idx in res.data) {
            var articleObj = {
              id: res.data[idx]._id,
              title: res.data[idx].title,
              content: res.data[idx].content,
              imgList: res.data[idx].imgList
            }

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: articleInfoList,
            showList: articleInfoList
          })
        })
        break;
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

  },

 
})