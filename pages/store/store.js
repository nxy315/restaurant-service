// pages/store/store.js
const WxParse = require('../../utils/wxParse/wxParse.js')
import { getData } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
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
      phoneNumber: '18721823536'
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
  async getDetail(id) {
    let data = await getData('/api/5b1c788f5b08d.html', {id})
    data = data.detail
    WxParse.wxParse('detail', 'html', data.text, this, 0)
    wx.setNavigationBarTitle({
      title: data.brand,
    })
    this.setData({
      num: data.tel,
      contact: data.contact
    })
  },

  showAction: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.num
    })
  },

  /**
   * 流量入口
   */
  entrance() {
    wx.redirectTo({
      url: '/pages/store/store',
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})