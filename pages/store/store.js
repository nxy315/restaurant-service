// pages/store/store.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    list: [],//图片列表
    name: '',//店铺名字
    num: null,//店铺电话
    contact: '',//联系人
  },

  // 信息报错
  callErr() {
    wx.makePhoneCall({
      phoneNumber: '13916344088'
    })
  },

  /**
   * 获取商家详情
   * @method: GET 
   * @url: /api/5b1c788f5b08d.html
   *
   * @param id:int              商家id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getDetail(id) {
    app.get('/api/5b1c788f5b08d.html', {
      id
    }, data => {
      data = data.detail
      wx.setNavigationBarTitle({
        title: data.brand,
      })
      // // let list
      this.setData({
        // list
        num: data.tel,
        contact: data.contact
      })
    })
  },

  showAction: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getDetail(id)
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