// pages/forum/mypost/mypost.js
const app = getApp();
import { getData } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    types: [
      { name: '全部', status: 0 },
      { name: '显示中', status: 1 },
      { name: '未显示', status: 2 },
    ],
    currentType: 0,
    params: {
      page: 1,
      pagenum: 6,
      status: 0,
    },
    list: [],
  },

  /**
   * 获取发布列表
   * @method: GET 
   * @url: /api/5b2fa57747221.html
   *
   * @param page:Int            页码
   * @param pagenum:Int         每页显示多少
   * @param status:Int          0 全部 1 显示 2 不显示
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getMyPost() {
    wx.showLoading({
      title: '',
    })
    let data = await getData('/api/5b2fa57747221.html', this.data.params)
    wx.hideLoading()
    
    this.setData({
      list: data.quan_list
    })
  },

  /**
   * 修改圈
   */
  editPost() {
    wx.showModal({
      title: '提示',
      content: '开发中',
    })
  },

  /**
   * 显示隐藏
   * @method: GET 
   * @url: /api/5b2faa213ffcd.html
   *
   * @param id:Int @require         id
   * @param status:Int @require     1 显示 2 不显示
   * @header[version]               版本号
   * @header[access-token]          验签
   * @header[user-token]            验签
   */
  async showToggle(e) {
    let target = e.currentTarget.dataset
    let id = target.id,
        status = target.status,
        index = target.index
    status == 1 ? status = 2 : status = 1
    let data = await getData('/api/5b2faa213ffcd.html', { id, status })
    let list = [...this.data.list]
    // if(this.data.currentType == 0) {
      list.splice(index, 1, { ...list[index], status })
    // } else {
    //   list.splice(index, 1)
    // }
    this.setData({
      list
    })
  },

  /**
   * 点赞
   * @method: GET 
   * @url: /api/5b309d0170036.html
   *
   * @param quan_id:Int @require    id
   * @header[version]               版本号
   * @header[access-token]          验签
   * @header[user-token]            验签
   */
  async like(e) {
    let target = e.currentTarget.dataset
    let index = target.index,
        quan_id = target.id

    try {
      await getData('/api/5b309d0170036.html', { quan_id })
      let list = [...this.data.list]
      list.splice(index, 1, { ...list[index], zan: parseInt(list[index].zan) + 1 })
      this.setData({
        list
      })
      wx.showToast({
        title: '点赞成功',
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '您已经赞过了',
      })
    }
  },


  /* change type */
  async tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    await wxSetData(this, { currentType: i, params: {...this.data.params, status: i}})
    // let data = await this.getMyPost()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPost()
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