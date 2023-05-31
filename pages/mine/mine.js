// pages/mine/mine.js
Page({
  register: function(e) {
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    // 将用户名和密码保存到本地存储中
    wx.setStorageSync('username', username);
    wx.setStorageSync('password', password);
    // 跳转到登录页面
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})