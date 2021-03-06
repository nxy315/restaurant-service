// pages/me/star/star.js
const app = getApp()
import { getData, postData, collectStore } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    starList: [],
    noData: false,
  },

  /**
   * 取消收藏
   * @method: GET 
   * @url: /api/5b29c482c6ce3.html
   *
   * @param id:Int                    商家id
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  async removeCollection(e) {
    let dataset = e.currentTarget.dataset
    let index = dataset.index,
        id = dataset.id
    let data = await getData('/api/5b29c482c6ce3.html', {id})
    let list = [...this.data.starList]
    list.splice(index, 1)

    this.setData({
      starList: list
    })
  },

  /**
   * 获取收藏列表
   * @method: GET 
   * @url: /api/5b29c53fe42e8.html
   *
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  async getStarList() {
    let data = await getData('/api/5b29c53fe42e8.html', {})
    let list = data.collection_list
    if(list.length <= 0) {
      await wxSetData(this, {noData: true})
      return
    }
    this.setData({
      starList: data.collection_list
    })
  },

  qugg() {
    wx.switchTab({
      url: '/pages/home/home',
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
    this.getStarList()
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