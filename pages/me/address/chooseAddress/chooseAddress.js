// pages/me/address/chooseAddress/chooseAddress.js
import { getData, postData } from '../../../../utils/ajax'
import { wxSetData } from '../../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 获取地址列表
   * @method: GET 
   * @url: /api/5b266fc349914.html
   *
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getAddress() {
    let data = await getData('/api/5b266fc349914.html', {})
    this.setData({
      addressList: data.address_list
    })
  },

  /**
   * 设为默认地址
   * @method: GET 
   * @url: /api/5b267aa787b35.html
   *  
   * @param id:Int              地址id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async setDefault(e) {
    wx.showLoading({
      title: '',
    })
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let list = [...this.data.addressList]
    if (list[index].is_default == 1) {
      wx.hideLoading()
      wx.navigateBack({
        delta: 1
      })
      return
    }

    await getData('/api/5b267aa787b35.html', { id: parseInt(id) })

    for (let i = 0; i < list.length; i++) {
      list[i].is_default = 0
    }
    list[index].is_default = 1

    await wxSetData(this, { addressList: list })
    wx.hideLoading()
    wx.navigateBack({
      delta: 1
    })
  },


  // 编辑地址
  editAddress(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/me/address/editAddress/editAddress?id=${id}`,
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
    this.getAddress()
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