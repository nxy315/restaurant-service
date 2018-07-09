// pages/forum/edit/edit.js
const app = getApp();
import { getData, postData } from '../../../utils/ajax'
import { wxSetData, wxOpenSetting, wxGetSetting, wxShowLoading, wxGetLocation } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
    typePlaceholder: {
      1: '请输入您要寻找的商品或服务等的具体描述',
      2: '请输入您所供应的商品或服务等的具体描述'
    },
    type: 0,
    cover: [],
    ajaxData: {
      id: '',
      type: '',
      content: '',
      location_x: '',
      location_y: '',
      province_id: '',
      city_id: '',
      district_id: '',
      address: ''
    },
    userInfo: null,
    images: [],
    address: {}
  },

  /**
   * 获取帖子内容
   * @method: GET 
   * @url: /api/5b2fadb989307.html
   *
   * @param id:Int              id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getDetail() {
    let data = await getData('/api/5b2fadb989307.html', {id: this.data.id})
    let images = []

    for(let i = 0; i < data.info.quan_image_list.length; i++) {
      images.push({
        id: data.info.quan_image_list[i].id,
        src: data.info.quan_image_list[i].image
      })
    }

    let { id, type, content, location_x, location_y, province_id, city_id, district_id, address } = data.info
    this.setData({
      images,
      ajaxData: {
        id, type, content, location_x, location_y, province_id, city_id, district_id, address
      }
    })
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
    let list = data.address_list
    for (let i = 0; i < list.length; i++) {
      if (list[i].is_default == 1) {
        this.setData({
          address: list[i]
        })
      }
    }
  },

  /**
   * 去个人中心
   */
  editInfo() {
    wx.navigateTo({
      url: '/pages/me/userinfo/userinfo',
    })
  },

  /**
   * 更新发帖
   * @method: POST
   * @url: /api/5b2fb2aa38213.html
   *
   * @param type:Int            1 需求 2 产品
   * @param content:String      内容
   * @param location_x:String   经度
   * @param location_y:String   纬度
   * @param image_id:String     图片id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async postTie() {
    wx.showLoading({
      title: '',
    })
    let { province_id, city_id, district_id, address, short_address } = app.globalData.userInfo

    if (!this.data.ajaxData.content || this.data.images.length < 1) {
      return wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else if (!this.data.ajaxData.address || !this.data.ajaxData.province_id || !this.data.ajaxData.city_id || !this.data.ajaxData.district_id || !this.data.userInfo.realname || !this.data.userInfo.tel) {
      return wx.showToast({
        title: '请完善个人信息',
        icon: 'none'
      })
    }

    let location = { province_id, city_id, district_id, address: short_address + address }//发布时的address需要short_address+address拼接起来
    let data = await postData('/api/5b2fb2aa38213.html', Object.assign(this.data.ajaxData, location))
    wx.hideLoading()

    if (data.status == 1) {
      wx.showToast({
        title: '编辑成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({})
      }, 2000)
    } else {
      wx.showToast({
        title: data.info,
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 发布
   */
  async prePost() {
    this.postTie()
  },

  /**
   * 输入帖子内容
   */
  handleInput(e) {
    let value = e.detail.value
    this.setData({
      ajaxData: {...this.data.ajaxData, content: value}
    })
  },

  /**
   * 选择图片 
   */
  chooseImage() {
    wx.chooseImage({
      count: this.data.ajaxData.type == 1 ? (9 - this.data.images.length) : 1,
      sizeType: ['original'],
      success: res => {
        let tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          this.uploadFile(tempFilePaths[i])
        }
      }
    })
  },

  /**
   * 上传图片
   */
  uploadFile(path) {
    let token = wx.getStorageSync('token')

    wx.uploadFile({
      url: 'https://api.youcanwuchu.com/api/5b2b7662e58d6.html',
      filePath: path,
      header: {
        'content-type': 'multipart/form-data',
        'version': 'v2.0',
        'user-token': token
      },
      name: 'quan_image',
      formData: {
        quan_id: this.data.id
      },
      success: rs => {
        let image = JSON.parse(rs.data).data.info.image
        let imageId = JSON.parse(rs.data).data.info.image_id
        let ids = this.data.ajaxData.image_id
        let images = [...this.data.images]
        images.push({
          id: imageId,
          src: image
        })
        
        this.setData({
          ajaxData: { ...this.data.ajaxData},
          images
        })
      }
    })
  },

  /**
   * 删除图片
   * @method: GET
   * @url: /api/5b2fadf4a5676.html
   *
   * @param id:Int              圈子图片ID
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async delImage(e) {
    try {
      let id = e.currentTarget.dataset.id
      await getData('/api/5b2fadf4a5676.html', {id})
      let index = e.currentTarget.dataset.index
      let images = [...this.data.images]
      images.splice(index, 1)
      this.setData({
        images
      })
    } catch(e) {
      wx.showToast({
        title: '操作失败'
      })
    }
  },

  /**
   * 页面初始化
   */
  async load(id) {
    wx.setNavigationBarTitle({
      title: '编辑帖子',
    })
    await wxSetData(this, {
      id,
    })
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id

    
    this.load(id)
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
    this.setData({
      userInfo: app.globalData.userInfo
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