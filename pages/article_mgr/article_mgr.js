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
const placeholderMap =  new Map([
  ["0", '搜索景区名称'],
  ["1", '搜索攻略名称'],
  ["2", '搜索活动名称'],
  ["3", '搜索美食名称']
])
const articleNameMap =  new Map([
  ["0", '景点'],
  ["1", '景点攻略'],
  ["2", '景区动态'],
  ["3", '美食特产']
])

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfoList: [],
    showList: [],
    pageType: '',
    page: '',
    coll: '',
    placeholder: '',
    articleName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  onShow() {
    // 获取当前小程序的页面栈     
    let pages = getCurrentPages()
    // 数组中索引最大的页面--当前页面  
    let currentPage = pages[pages.length-1]
    var options = currentPage.options

    var that = this
    var pageType = options.pageType
    if (typeof(pageType) === 'undefined') {
      pageType = this.data.pageType
    } else {
      this.setData({pageType: pageType})
    }
    var page = pageMap.get(pageType)
    var coll = collectionMap.get(pageType)
    var placeholder = placeholderMap.get(pageType)
    var articleName = articleNameMap.get(pageType)
    
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

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: JSON.parse(JSON.stringify(articleInfoList)),
            showList: JSON.parse(JSON.stringify(articleInfoList)),
            placeholder: placeholder,
            articleName: articleName
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
              imgList: res.data[idx].imgList,
              placeholder: placeholder
            }

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: JSON.parse(JSON.stringify(articleInfoList)),
            showList: JSON.parse(JSON.stringify(articleInfoList)),
            placeholder: placeholder,
            articleName: articleName
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
              address: res.data[idx].location
            }

            articleInfoList.push(articleObj)
          }

          that.setData({
            page: page,
            coll: coll,
            articleInfoList: JSON.parse(JSON.stringify(articleInfoList)),
            showList: JSON.parse(JSON.stringify(articleInfoList)),
            placeholder: placeholder,
            articleName: articleName
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
            articleInfoList: JSON.parse(JSON.stringify(articleInfoList)),
            showList: JSON.parse(JSON.stringify(articleInfoList)),
            placeholder: placeholder,
            articleName: articleName
          })
        })
        break;
    }
  },

  search(e) {
    var word = e.detail.value
    var showList = []
    for (const v of this.data.articleInfoList) {
      if (v.title.search(word) !== -1) {
        showList.push(JSON.parse(JSON.stringify(v)))
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

  createArticle() {
    var page = this.data.page
    wx.navigateTo({
      url: `/pages/${page}/${page}`,
    })
  },

  editArticle(e) {
    var index = e.currentTarget.dataset.index
    var page = this.data.page
    var id = this.data.showList[index].id
    wx.navigateTo({
      url: `/pages/${page}/${page}?id=${id}`,
    })
  },

  async deleteArticle(e) {
    var flag = false
    await wx.showModal({
      title: '提示',
      content: '确认要删除吗'
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
    var articleInfoList = this.data.articleInfoList
    var showList = this.data.showList

    await db.collection(that.data.coll).where({
      _id: showList[index].id
    }).remove().then(res => {
      var deleteIdx = 0
      while (deleteIdx < articleInfoList.length) {
        if (articleInfoList[deleteIdx].id === showList[index].id) {
          break
        }

        ++deleteIdx
      }
      showList.splice(index, 1)
      articleInfoList.splice(deleteIdx, 1)
      that.setData({
        showList: showList,
        articleInfoList: articleInfoList
      })
    })
  }
})