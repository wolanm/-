// pages/admin_login/admin_login.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  onAdminLogin : async function (e) {
    let adminName = e.detail.value.userName
    let adminPassword = e.detail.value.userPassword
    if (0 === adminName.length || 0 === adminPassword.length) {
      wx.showToast({
        title: '非法输入',
        icon: 'error',
        duration: 1000
      })

      return
    }

    db.collection('admin_info').where({
      userName: adminName
    }).get().then(res => {
      var query_res = res.data[0]
      if (!query_res) {
        wx.showToast({
          title: '用户不存在',
          icon: 'error',
          duration: 1500
        })

        return
      } 

      if (query_res.userPassword === adminPassword) {
        wx.navigateTo({
          url: '/pages/admin_mgr/admin_mgr?adminName=' + adminName + '&adminPassword=' + adminPassword,
        })
  
        return
      }
  
      wx.showToast({
        title: '密码错误',
        icon: 'error',
        duration: 1500
      })
    })
  },

  onFindPassword(e) {
    wx.navigateTo({
      url: '/pages/admin_set_password/admin_set_password',
    })
  }
})