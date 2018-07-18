// pages/forum/detail/detail.js
const app = getApp();
import { getData, postData } from '../../../utils/ajax'
import { wxSetData, wxPreview } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    content: '',//回复内容
    id: '',
    info: null
  },

  
  /**
   * 打电话
   */
  showAction(e) {
    let tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  /**
   * 获取圈内容
   * @method: GET 
   * @url: /api/5b2fadb989307.html
   *
   * @param id:Int              id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getInfo() {
    let data = await getData('/api/5b2fadb989307.html', {id: this.data.id})
    await wxSetData(this, { info: data.info })
    if(data.info.type == 1) {
      wx.setNavigationBarTitle({
        title: '需求详情',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '产品详情',
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
    let quan_id = target.id

    try {
      await getData('/api/5b309d0170036.html', { quan_id })
      this.setData({
        info: { ...this.data.info, zan: parseInt(this.data.info.zan)+1}
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

  /**
   * 回复内容
   */
  handleInput(e) {
    let value = e.detail.value

    this.setData({
      content: value
    })
  },

  /**
   * 预览
   */
  async preview(e) {
    let index = e.currentTarget.dataset.index
    let info = {...this.data.info}
    let preUrls = info.quan_image_list
    let urls = []
    for (let i = 0; i < preUrls.length; i++) {
      urls.push(preUrls[i].image)
    }
    
    wxPreview(urls[index], urls)
  },

  /**
   * 评论回复
   * @method: POST 
   * @url: /api/5b30a9a557f51.html
   *
   * @param quan_id:Int         帖子id
   * @param content:String      回复内容
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async sendHuifu() {
    let data = await postData('/api/5b30a9a557f51.html', { quan_id: this.data.info.id, content: this.data.content})
    await wxSetData(this, {content: ''})
    this.getInfo();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id
    }, () => {
      this.getInfo()
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})