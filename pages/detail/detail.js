// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    detail: {},
    brand: '',//产品标题
  },

  /**
   * 获取商品详情
   * @method: GET 
   * @url: /api/5b1c7c61216d6.html
   *
   * @param id:int              产品id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getDetail(id) {
    app.get('/api/5b1c7c61216d6.html', {
      id
    }, data => {
      let detail = data.detail
      wx.setNavigationBarTitle({
        title: detail.name,
      })
      // // // let list
      this.setData({
        // list
        detail
      })
    })
  },

  switchTap(e) {
    let url = e.currentTarget.dataset.url

    wx.switchTab({
      url,
    })
  },

  toClearing() {
    wx.navigateTo({
      url: '/pages/clearing/clearing',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    this.getDetail(id);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})