// pages/home/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { name: '最新商家' },
      { name: '人气商家' },
    ],
    list: [
      { id: 1, name: '中高档厨房餐具1', star: '10', eye: '1' },
      { id: 2, name: '中高档厨房餐具2', star: '10', eye: '1' },
      { id: 3, name: '中高档厨房餐具3', star: '10', eye: '1' },
      { id: 4, name: '中高档厨房餐具4', star: '10', eye: '1' },
      { id: 5, name: '中高档厨房餐具5', star: '10', eye: '1' },
    ],
    currentType: 0
  },

  //收藏\取消收藏
  collection(e) {
    let id = e.currentTarget.dataset.id
    wx.request({
      method: 'post',
      url: `${app.globalData.reqUrl}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id
      },
      success: data => {
        
      },
    })
  },

  //获取列表
  getList(id, word) {
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}/api/5b16a8b915bff.html`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': app.globalData.version
      },
      data: {
        sortid: id,
        keyword: word, 
      },
      success: data => {
        this.setData({
          list: data.data.data.store_list
        })
      },
    })
  },

  tapTypes(e) {
    let i = e.target.dataset.index;
    this.setData({
      currentType: i
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id ? options.id : ''
    let word = options.keyword ? options.keyword : ''
    this.getList(id, word)
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