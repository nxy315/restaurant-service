// pages/me/orders/orders.js
const app = getApp()
import { getData, postData } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    types: [
      { name: '全部', type: 0 },
      { name: '待付款', type: 1 },
      { name: '待发货', type: 2 },
      { name: '已完成', type: 8 },
    ],
    noData: false,
    orders: [],//订单数据
    swiperInit: {
      duration: 200
    },
    currentType: -1
  },

  qugg() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  /**
   * 获取订单数据
   * @method: GET 
   * @url: /api/5b26780224c31.html
   *
   * @param ostate:Int              0 全部订单 1 待付款 2 待发货 8 已完成
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  async getOrderList() {
    let data = await getData('/api/5b26780224c31.html', {ostate: this.data.currentType})
    if(data.orders_list.length <= 0) {
      await wxSetData(this, {noData: true})
    } else {
      await wxSetData(this, { noData: false, orders: data.orders_list })

    }
  },

  async tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    await wxSetData(this, {currentType: i})
    this.getOrderList()
  },
  /* 切换swiper，改变索引 */ 
  changeType(e) {
    let i = e.detail.current;
    this.setData({
      currentType: i
    })
  },

  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = options.index
    this.setData({
      currentType: i
    }, () => {
      console.log(this.data.currentType)
      this.getOrderList()
    })
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

})