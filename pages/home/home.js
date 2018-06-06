// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(255, 60, 119, 1)',
      duration: 300
    },//swiper 配置
    keyword: '',//关键字
    typeList: [],
    resultSwiper: {
      duration: 200
    },
    types: [
      { name: '全部' },
      { name: '最新入驻' },
      { name: '人气排名' },
    ],
    currentType: 0,
    banner: '',//广告数据
  },

  //输入框
  handelInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  // 广告数据
  getAds(id) {
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}/api/5b169d7bb041d.html?adplace=${id}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': app.globalData.version
      },
      success: data => {
        this.setData({
          banner: data.data.data.ad_list[0].adpic
        })
      },
    })
  },

  getTypes() {
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}/api/5b150d64dee3d.html`,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': app.globalData.version
      },
      dataType: 'json',
      success: data => {
        let list = data.data.data.store_sort_list
        let len = Math.ceil(list.length / 8)
        
        let arr = []
        for(let i = 0; i < len; i++) {
          arr[i] = list.slice(i * 8, (i + 1)*8)
        }
        this.setData({
          typeList: arr
        })
      },
    })
  },

  toList(e) {
    let id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : ''
    wx.navigateTo({
      url: `/pages/home/list/list?id=${id}&&keyword=${this.data.keyword}`,
    })
  },

  /* 切换swiper，改变索引 */
  changeType(e) {
    let i = e.detail.current;
    this.setData({
      currentType: i
    })
  },


  tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    this.setData({
      currentType: i
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypes();
    this.getAds(100)
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
    this.setData({
      keyword: ''
    })
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