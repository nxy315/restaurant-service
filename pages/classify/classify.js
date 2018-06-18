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
    allCount: 0,//购物车总数量
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
      let list = data.shop_list
      for (let i = 0; i < list.length; i++) {
        list[i].size = []
        list[i].count = 0
        list[i].fold = true
      }
      list[0].size = [
        { sell_price: 30, spec: '个', count: 0},
        { sell_price: 31, spec: '个', count: 0 },
        { sell_price: 32, spec: '个', count: 0 },
      ]
      this.setData({
        result: data.shop_list
      })
    })
  },

  /**
   * 选择规格
   */
  chooseSize(e) {
    let i = e.currentTarget.dataset.index
    let list = [...this.data.result]
    list[i].fold = !list[i].fold
    this.setData({
      result: list
    })
  },

  /**
   * 减数量
   */
  reduceCount(e) {
    let type = e.currentTarget.dataset.type
    let i = e.currentTarget.dataset.index
    let list = [...this.data.result]
    if (!type) {
      if (list[i].count > 0) {
        list[i].count = list[i].count - 1
        this.setData({
          result: list,
          allCount: this.data.allCount - 1
        }, () => {
          if (this.data.allCount <= 0) {
            this.removeCart()
          } else {
            this.cartCount();
          }
        })
      }
    } else {
      let sizeIndex = e.currentTarget.dataset.i
      if (list[i].size[sizeIndex].count > 0) {
        list[i].size[sizeIndex].count = list[i].size[sizeIndex].count - 1
        this.setData({
          result: list,
          allCount: this.data.allCount - 1
        }, () => {
          if (this.data.allCount <= 0) {
            this.removeCart()
          } else {
            this.cartCount();
          }
        })
      }
    }

    
  },

  /**
   * 加数量
   */
  addCount(e) {
    let type = e.currentTarget.dataset.type
    let i = e.currentTarget.dataset.index
    let list = [...this.data.result]
    if(!type) {
      list[i].count = list[i].count + 1
    } else {
      let sizeIndex = e.currentTarget.dataset.i
      list[i].size[sizeIndex].count = list[i].size[sizeIndex].count + 1
    }

    this.setData({
      result: list,
      allCount: this.data.allCount + 1
    }, () => {
      this.cartCount();
    })
    
  },

  /**
   * 清空购物车
   */
  removeCart() {
    wx.removeTabBarBadge({
      index: 3
    })
  },
  /**
   * 购物车+-1
   */
  cartCount() {
    wx.setTabBarBadge({
      index: 3,
      text: `${this.data.allCount}`
    })
  },

  upper(e){
    console.log('upper')
  },
  /* 滚动 */
  scroll(e) {
    app.scroll(e, 200, 'suck', this)
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
    // this.getVariety();
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
    this.setData({
      allCount: 0
    }, () => {
      this.removeCart();//测试用，进来清空购物车
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    setTimeout(() => {
      this.setData({
        varietyIndex: 0
      })
    }, 1000)
    
    
    wx.removeTabBarBadge({
      index: 3,
    })
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