// pages/me/userinfo/userinfo.js
const app = getApp()
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
        this.setData({
          cover: res.tempFilePaths
        })
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
  saveInfo() {
    app.post('/api/5b266d4146e02.html', this.data.ajaxData, data => {
      if(data.status == 1) {
        wx.navigateBack({
          delta: 1
        })
      }
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