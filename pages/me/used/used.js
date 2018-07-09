// pages/me/used/used.js
const app = getApp();
import { getData, postData } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    list: [],
    loading: true,
  },

  qugg() {
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  },

  /**
   * 获取常用清单
   * @method: POST 
   * @url: /api/5b30b4b3b7c8d.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getUsedList() {
    await wxSetData(this, {loading: true})
    let data = await postData('/api/5b30b4b3b7c8d.html', {})
    await wxSetData(this, {list: data.qingdan_list, loading: false})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUsedList()
    getData('/api/5b430946d557f.html', {})
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