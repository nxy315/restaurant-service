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
    typePlaceholder: {
      1:'请输入您要寻找的商品或服务等的具体描述',
      2:'请输入您所供应的商品或服务等的具体描述'
    },
    type: 0,
    cover: [],
    ajaxData: {
      type: '',
      content: '',
      location_x: '',
      location_y: '',
      image_id: '',
    },
    images: [],
    address: {},
    userInfo: null
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
    wx.showLoading({
      title: '',
    })

    let { province_id, city_id, district_id, address, short_address } = app.globalData.userInfo

    if (!this.data.ajaxData.content || this.data.images.length < 1) {
      return wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else if (!province_id || !city_id || !district_id || !address) {
      return wx.showToast({
        title: '请完善个人信息',
        icon: 'none'
      })
    }

    let location = { province_id, city_id, district_id, address: address + short_address }//发布时的address需要short_address+address拼接起来
    let data = await postData('/api/5b2b75c2440a3.html', Object.assign(this.data.ajaxData, location))
    wx.hideLoading()

    if(data.status == 1) {
      app.globalData.update = true
      wx.showToast({
        title: '发布成功',
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

  /**
   * 选择图片 
   */
  chooseImage() {
    // (type == 1 && images.length < 9) || (type == 2 && images.length < 1)
    if ((this.data.type == 1 && this.data.images.length < 9) || (this.data.type == 2 && this.data.images.length < 1)) {
      wx.chooseImage({
        count: this.data.type == 1 ? (9 - this.data.images.length) : 1,
        sizeType: ['original'],
        success: res => {
          let tempFilePaths = res.tempFilePaths
          for (let i = 0; i < tempFilePaths.length; i++) {
            this.uploadFile(tempFilePaths[i])
          }
        }
      })
    } else if (this.data.type == 1 && this.data.images.length >= 9) {
      wx.showToast({
        title: '只能上传9张图片',
        icon: 'none'
      })
    } else if (this.data.type == 2 && this.data.images.length >= 1) {
      wx.showToast({
        title: '只能上传1张图片',
        icon: 'none'
      })
    }
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
      success: rs => {
        let image = JSON.parse(rs.data).data.info.image
        let imageId = JSON.parse(rs.data).data.info.image_id
        let ids = this.data.ajaxData.image_id
        let images = [...this.data.images]
        images.push(image)
        if (ids) {
          ids += `,${imageId}`
        } else {
          ids = imageId
        }
        console.log(images)
        this.setData({
          ajaxData: { ...this.data.ajaxData, image_id: ids },
          images
        })
      }
    })
  },

  /**
   * 删除图片
   */
  delImage(e) {
    let index = e.currentTarget.dataset.index
    let ids = this.data.ajaxData.image_id
    let images = [...this.data.images]
    ids = ids.split(',')
    ids.splice(index, 1)
    ids = ids.join(',')
    images.splice(index, 1)
    this.setData({
      ajaxData: { ...this.data.ajaxData, image_id: ids},
      images
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
    this.setData({
      type
    })
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