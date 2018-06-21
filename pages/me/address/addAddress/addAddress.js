// pages/me/address/addAddress/addAddress.js
const app = getApp()
import {  postData } from '../../../../utils/ajax'
var regeneratorRuntime = require('../../../../libs/runtime')
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajaxData: {
      realname: '',
      tel: '',
      address: '',
      channel: '',
    }
  },

  /**
   * 新增地址
   * @method: POST
   * @url: /api/5b2673319f025.html
   *
   * @param realname:String     真实姓名
   * @param tel:String          手机号
   * @param address:String      详细地址
   * @param channel:String      渠道码
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async saveAddress() {
    if (!this.data.ajaxData.realname) {
      return wx.showToast({
        title: '店铺不能为空',
        icon: 'none'
      })
    } else if (!this.data.ajaxData.tel) {
      return wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!this.data.ajaxData.address) {
      return wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
    } else if (!phoneReg.test(this.data.ajaxData.tel)) {
      return wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
    }
    await postData('/api/5b2673319f025.html', this.data.ajaxData)
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 输入框取值
   */
  inputHandler(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value

    this.setData({
      ajaxData: { ...this.data.ajaxData, [key]: value }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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