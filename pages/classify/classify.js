// pages/classify/classify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
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
    resultId: '',
    result: [],//商品列表数据

    varietyIndex: 0,
    variety: [],// 商品分类

    bannerList: [],//广告数据
  },

  loadImage(e) {
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
    app.get('/api/5b169d7bb041d.html', {
      adplace: id
    }, data => {
      this.setData({
        bannerList: data.ad_list
      })
    })
  },

  /**
   * 获取分类
   * @method: GET 
   * @url: /api/5b16b2355d474.html
   *
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getVariety() {
    app.get('/api/5b16b2355d474.html', {}, data => {
      data.sort_lsit.unshift({ name: '全部', id:'0'})

      this.setData({
        variety: data.sort_lsit,
        varietyIndex: 0,
        resultId: data.sort_lsit[0].id
      }, () => {
        this.getResult(this.data.resultId);
      })
    })
  },

  /**
   * 获取商品
   * @method: GET 
   * @url: /api/5b16b2ab1de15.html
   *
   * @param sortid:int          分类id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getResult(id) {
    app.get('/api/5b16b2ab1de15.html', {
      sortid: id
    }, data => {
      this.setData({
        result: data.shop_list
      })
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
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  // 选择品类
  chooseVariety(e) {
    let id = e.currentTarget.dataset.id;
    let i = e.currentTarget.dataset.index;
    this.setData({
      varietyIndex: i,
      resultId: id
    }, () => {
      this.getResult(id)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(101)
    this.getVariety();
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
    this.getVariety();
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