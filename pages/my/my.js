// pages/my/my.js
//获取应用实例
const app = getApp()
Page({
  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      motto: '你好，',
      nickname:'名侦探',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
   //事件处理函数
   bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = (this);
    wx.request({
      url: 'http://www.weixin.com/xcx', //仅为示例，并非真实的接口地址
      data: {
        x: 'yyy',
        y: 'xxx'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        _this.setData({
          name1:res.data.name
        }) 
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      fuhao:'!',
    })
  },
  /**
   * 页面的初始数据
   */
  /**
   * 生命周期函数--监听页面加载
   */
 
    tapName:function(event){
     
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://www.weixin.com/xcx/openid',
            data: {
              code: res.code
            },
            // success(res){
            //   wx.setStorage({
            //     data: res.data.token,
            //     key: 'token',
            //   })
            // },
            success(res){
              wx.getStorage({
                key: 'token',
                success (res) {
                    console.log(res.data); 
                }
              })
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad: function () {
   
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})