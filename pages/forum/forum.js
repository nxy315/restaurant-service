// pages/forum/forum.js
const app = getApp();
import { getData } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    suck: false,
    types: [
      { icon: 'sort_light', name: '全部' },
      { icon: 'post', name: '产品需求' },
      { icon: 'hot', name: '厂商新品' },
    ],
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(254, 64, 112, 1)',
      autoplay: true,
      interval: 3000,
      circular: true,
      duration: 500
    },//swiper 配置
    currentType: 0,
    bannerList: [],//广告数据
    open: false,
  },

  toCity() {
    wx.navigateTo({
      url: '/pages/forum/city/city',
    })
  },

  /* 滚动 */
  scroll(e) {
    app.scroll(e, 200, 'suck', this)
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
  async getAds(id) {
    let data = await getData('/api/5b169d7bb041d.html', { adplace: id})
    this.setData({
      bannerList: data.ad_list
    })
  },

  /**
   * 餐饮圈数据列表
   * @method: GET 
   * @url: /api/5b2b753401e58.html
   *
   * @param page:Int            页码
   * @param pagenum:Int         每页显示多少个
   * @param type:Int            0 全部 1 需求 2 产品
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getList() {
    let data = getData('/api/5b2b753401e58.html', { page: 1, pagenum: 6, type:0})
    console.log(data)
  }, 


  tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    this.setData({
      currentType: i
    })
  },

  /**
   * 打开发布需求
   */
  openPost() {
    this.setData({
      open: !this.data.open
    })
  },

  /**
   * 发布需求
   */
  postForm() {
    wx.navigateTo({
      url: '/pages/forum/post/post',
    })
    this.setData({
      open: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(102)
    this.getList()
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
})