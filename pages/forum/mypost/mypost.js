// pages/forum/mypost/mypost.js
const app = getApp();
import { getData } from '../../../utils/ajax'
import { wxSetData, wxPreview } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    top: 0,
    loadMore: true,
    end: false,
    types: [
      { name: '全部', status: 0 },
      { name: '显示中', status: 1 },
      { name: '未显示', status: 2 },
    ],
    currentType: 0,
    page: 1,
    pagenum: 6,
    status: 0,
    list: [],
    loading: true,
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
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: '',
    })
    let data = await getData('/api/5b2fa57747221.html', {page: this.data.page, pagenum: this.data.pagenum, status: this.data.status})
    wx.hideLoading()
    let end
    data.quan_list.length < this.data.pagenum ? end = true : end = false
    let list = [...this.data.list]
    data = list.concat(data.quan_list)

    await wxSetData(this, {
      list: data,
      loadMore: true,
      end,
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 500)
  },

  /**
   * 触底加载更多
   */
  async reachBottom() {
    if (!this.data.loadMore || this.data.end) return

    let page = this.data.page + 1
    await wxSetData(this, { loadMore: false, page })
    this.getMyPost()
  },

  /**
   * 预览
   */
  async preview(e) {
    let index = e.currentTarget.dataset.index
    let idx = e.currentTarget.dataset.idx
    let list = [...this.data.list]
    let preUrls = list[index].quan_image_list
    let urls = []
    for (let i = 0; i < preUrls.length; i++) {
      urls.push(preUrls[i].image)
    }
    wxPreview(urls[idx], urls)
  },

  /**
   * 修改圈
   */
  editPost(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/forum/edit/edit?id=${id}`,
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
    list.splice(index, 1)
    if(list.length <= 0) {
      this.getMyPost()
    } else {
      this.setData({
        list
      })
    }
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
    await wxSetData(this, { currentType: i, list: [], page: 1, status: i })
    this.getMyPost()
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
    this.getMyPost()
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