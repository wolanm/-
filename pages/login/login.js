// pages/login/login.js
Page({
  login: function(e) {
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    // 从本地存储中获取保存的用户名和密码
    var savedUsername = wx.getStorageSync('username');
    var savedPassword = wx.getStorageSync('password');
    // 判断输入的用户名和密码是否正确
    if (username === savedUsername && password === savedPassword) {
      // 登录成功，跳转到首页
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      // 登录失败，弹出提示框
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      })
    }
  }
})