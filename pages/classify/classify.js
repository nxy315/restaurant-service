// pages/classify/classify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suck: false,
    fold: false,
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(254, 64, 112, 1)',
      autoplay: true,
      interval: 3000,
      circular: true,
      duration: 500
    },//swiper 配置
    result: [
      {id:1, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
      {id:2, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
      {id:3, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
      {id:4, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
      {id:5, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
      {id:6, name:'成品小龙虾1', price:'30', unit:'盒', des: '成品小龙虾成品小龙虾成品小龙虾成品小龙虾'},
    ],//商品列表数据

    varietyIndex: 0,
    variety: [
      { name: '全部' },
      { name: '烧腊卤水' },
      { name: '饭系列' },
      { name: '面系列' },
      { name: '汤系列' },
      { name: '点心系列' },
      { name: '小吃系列' },
      { name: '面系列' },
      { name: '汤系列' },
      { name: '点心系列' },
      { name: '小吃系列' },
      { name: '面系列' },
      { name: '汤系列' },
      { name: '点心系列' },
      { name: '小吃系列' },
    ],// 商品分类

    bannerList: [],//广告数据
  },
  
  foldToggle() {
    this.setData({
      fold: !this.data.fold
    })
  },
  

  /**
   * 获取广告图
   * @method: GET 
   * @url: /api/5b169d7bb041d.html
   *
   * @param adplace:String      100:首页 101:推荐 103:餐饮圈
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
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
          bannerList: data.data.data.ad_list
        })
      },
    })
  },
  upper(e){
    console.log('upper')
  },
  /* 滚动 */
  scroll(e) {
    // console.log(e)
    let direction = e.detail.deltaY
    if (direction < 0) {
      if (e.detail.scrollTop >= 200) {
        this.setData({
          suck: true
        })
      }
    } else {
      if (e.detail.scrollTop <= 200) {
        this.setData({
          suck: false
        })
      }
    }
    // if(e.detail.scrollTop >= 200) {
    //   this.setData({
    //     suck: true
    //   })
    // } else {
    //   this.setData({
    //     suck: false
    //   })
    // }
  },

  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  // 选择品类
  chooseVariety(e) {
    let i = e.currentTarget.dataset.index;
    this.setData({
      varietyIndex: i
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(101)
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