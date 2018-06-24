// pages/forum/post/post.js
const app = getApp();
import { getData, postData } from '../../../utils/ajax'
import { wxSetData, wxOpenSetting, wxGetSetting, wxShowLoading, wxGetLocation } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: [],
    ajaxData: {
      type: '',
      content: '',
      location_x: '',
      location_y: '',
      image_id: ''
    },
    images: []
  },

  /**
   * 选择地址
   */
  chooseAddress() {
    wx.navigateTo({
      url: '/pages/me/address/chooseAddress/chooseAddress',
    })
  },

  /**
   * 发帖
   * @method: POST
   * @url: /api/5b2b75c2440a3.html
   *
   * @param type:Int            1 需求 2 产品
   * @param content:String      内容
   * @param location_x:String   经度
   * @param location_y:String   纬度
   * @param image_id:String     100:首页 101:推荐 103:餐饮圈
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async postTie() {
    let data = await postData('/api/5b2b75c2440a3.html', this.data.ajaxData)

    await wxShowLoading('')
    wx.hideLoading()
    wx.navigateBack({})
  },

  /**
   * 发布
   */
  async prePost() {
    let scope = await wxGetSetting('scope.userLocation')

    if(scope) {
      let location = await wxGetLocation()
      await wxSetData(this, {
        ajaxData: { ...this.data.ajaxData, location_x: `${location.longitude}`, location_y: `${location.latitude}`}
      })
      this.postTie()
    } else {
      wx.showModal({
        title: '提示',
        content: '发布内容之前需要先获取您的地理位置',
        success: async res => {
          if (res.confirm) {
            await wxOpenSetting()

            let location = await wxGetSetting('scope.userLocation')

            if (!location) return
            // 获取地理位置成功 继续发布请求
            wx.showModal({
              title: '提示',
              content: '获取地理位置成功',
            })

          }
        }
      })
    }
    
    
    // wx.switchTab({
    //   url: '/pages/forum/forum',
    // })
  },

  handleInput(e) {
    let value = e.detail.value
    this.setData({
      ajaxData: {...this.data.ajaxData, content: value}
    })
  },
  
  uploadImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths
        let token = wx.getStorageSync('token')
        wx.uploadFile({
          url: 'https://api.youcanwuchu.com/api/5b2b7662e58d6.html',
          filePath: tempFilePaths[0],
          header: {
            'content-type': 'multipart/form-data',
            'version': 'v2.0',
            'user-token': token
          },
          name: 'quan_image',
          success: rs => {
            let image = JSON.parse(rs.data).data.info.image
            let imageId = JSON.parse(rs.data).data.info.image_id
            let ids = this.data.ajaxData.image_id
            let images = [...this.data.images]
            images.push(image)
            if(ids) {
              ids += `,${imageId}`
            } else {
              ids = imageId
            }
            console.log(images)
            this.setData({
              ajaxData: {...this.data.ajaxData, image_id: ids},
              images 
            })
          }
        })
      }
    })
  },

  /**
   * 页面初始化
   */
  async load(type) {
    if(type == 1) {
      wx.setNavigationBarTitle({
        title: '发布需求',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '发布产品',
      })
    }
    await wxSetData(this, {
      ajaxData: {...this.data.ajaxData, type}
    })

    wx.getLocation({
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    this.load(type)
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