// pages/me/address/chooseAddress/chooseAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 选择地址 
   */
  chooseAddress() {
    wx.navigateBack({})
  },


  // 编辑地址
  editAddress(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/me/address/addAddress/addAddress',
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