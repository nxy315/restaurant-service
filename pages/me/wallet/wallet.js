// pages/me/wallet/wallet.js
const app = getApp()
import { getData, login } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: '',
    record: []
  },

  /**
   * 获取充值记录
   * @method: GET 
   * @url: /api/5b30c0ceaf68e.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getRecord() {
    let data = await getData('/api/5b30c0ceaf68e.html', {})
    this.setData({
      record: data.balance_log
    })
  },

  toRecharge() {
    wx.redirectTo({
      url: '/pages/me/wallet/recharge/recharge',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecord()
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
      balance: app.globalData.userInfo.balance
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
})