// pages/me/address/address.js
const app = getApp()
import { getData } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
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
    if (list[index].is_default == 1) return wx.hideLoading()

    await getData('/api/5b267aa787b35.html', {id: parseInt(id)})

    for (let i = 0; i < list.length; i++) {
      list[i].is_default = 0
    }
    list[index].is_default = 1

    await wxSetData(this, { addressList: list})
    wx.hideLoading()
  },

  // 编辑地址页面
  editAddress(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/me/address/editAddress/editAddress?id=${id}`,
    })
  },
  //新增地址页面
  addAddress() {
    wx.navigateTo({
      url: `/pages/me/address/addAddress/addAddress`,
    })
  },

  /**
   * 删除地址
   * @method: GET 
   * @url: /api/5b2f94c3df504.html
   *  
   * @param id:Int              地址id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async delAddress(e) {
    wx.showModal({
      title: '提示',
      content: '您确定要删除此地址吗？',
      // confirmColor: '#000000',
      success: async res => {
        if (res.cancel) return

        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index

        wx.showLoading({
          title: '',
        })
        let data = await getData('/api/5b2f94c3df504.html', { id })
        wx.hideLoading()

        if (data.status == 1) {
          let list = [...this.data.addressList]
          list.splice(index, 1)
          this.setData({
            addressList: list
          })
          wx.showToast({
            icon: 'success',
            title: '删除成功',
          })
        } else {
          wx.showToast({
            title: '删除失败',
          })
        }
      }
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