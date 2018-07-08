// pages/detail/detail.js
const WxParse = require('../../utils/wxParse/wxParse.js')
const app = getApp();
import { getData, postData } from '../../utils/ajax'
var regeneratorRuntime = require('../../libs/runtime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    detail: {},
    brand: '',//产品标题
    count: '',
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
  async getDetail(id) {
    let data = await getData('/api/5b1c7c61216d6.html', { id })
    let detail = data.detail
    WxParse.wxParse('detail2', 'html', detail.text, this, 0)
    wx.setNavigationBarTitle({
      title: detail.name,
    })
    this.setData({ detail })
  },

  /**
   * 购物车数量
   * @method: GET 
   * @url: /api/5b29aaa68d36e.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getCount(id) {
    let data = await getData('/api/5b29aaa68d36e.html', {})
    this.setData({
      count: data.total_num
    })
  },

  /**
   * 加入购物车
   * @method: POST 
   * @url: /api/5b29ad2a751fa.html
   *
   * @param gid:String @require       商品ID
   * @param pid:String @require       规格ID
   * @param price:String @require     价格
   * @param spec:String @require      规格名
   * @param nums:String @require      数量(1或-1)
   * @param gname:String @require     商品名
   * @header[version]                 版本号
   * @header[access-token]            验签
   * @header[user-token]              验签
   */
  async addCart(e) {
    let { gid, pid, price, spec, gname } = e.currentTarget.dataset
    let data = await postData('/api/5b29ad2a751fa.html', {
      gid, pid, price, spec, nums: 1, gname
    })
    if(data.status == 1) {
      console.log(this.data.count+1)
      this.setData({
        count: this.data.count+1
      })
    }
  },

  /**
   * 去购物车
   */
  switchTap(e) {
    let url = e.currentTarget.dataset.url

    wx.switchTab({
      url,
    })
  },

  /**
   * 去结算
   */
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
    this.getDetail(id)
    this.getCount()
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