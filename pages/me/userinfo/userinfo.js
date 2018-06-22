// pages/me/userinfo/userinfo.js
const app = getApp()
import { getData, postData } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: '',
    ajaxData: {
      nickname: '',
      realname: '',
      tel: '',
      user_work: '',
      address: ''
    }
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

  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths
        let token = wx.getStorageSync('token')
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: 'https://api.youcanwuchu.com/api/5b2b65086fd13.html',
          filePath: tempFilePaths[0],
          header: {
            'content-type': 'multipart/form-data',
            'version': 'v2.0',
            'user-token': token
          },
          formData: {
            file: tempFilePaths[0]
          },
          name: 'user_pic',
          success: rs => {
            console.log(rs)
            //do something
          }
        })
        // this.setData({
        //   cover: tempFilePaths
        // })
      }
    })
  },

  /**
   * 保存用户信息
   * @method: POST
   * @url: /api/5b266d4146e02.html
   *
   * @param nickname:String            昵称
   * @param realname:String            真实姓名
   * @param tel:String                 电话号码
   * @param user_work:String           公司名称
   * @param address:String             地址
   * @header[version]                  版本号
   * @header[access-token]             验签
   * @header[user-token]               验签
   */
  async saveInfo() {
    let data = await postData('/api/5b266d4146e02.html', this.data.ajaxData)

    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { nickname, realname, tel, user_work, address } = app.globalData.userInfo
    this.setData({
      cover: app.globalData.userInfo.user_pic,
      ajaxData: { nickname, realname, tel, user_work, address }
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
})