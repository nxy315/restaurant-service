// pages/me/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      { name: 'nxy', tel: '17721140500', address: '上海市徐家汇1号线下水道1', default: true },
      { name: 'nxy', tel: '17721140501', address: '上海市徐家汇1号线下水道2', default: false },
      { name: 'nxy', tel: '17721140502', address: '上海市徐家汇1号线下水道3', default: false },
      { name: 'nxy', tel: '17721140503', address: '上海市徐家汇1号线下水道4', default: false },
      { name: 'nxy', tel: '17721140504', address: '上海市徐家汇1号线下水道5', default: false },
    ]
  },

  /**
   * 设为默认
   */
  setDefault(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let list = [...this.data.addressList]
    if (list[index].default) return

    for (let i = 0; i < list.length; i++) {
      list[i].default = false
    }
    list[index].default = true

    this.setData({
      addressList: list
    })
  },

  // 编辑地址
  editAddress(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/me/address/addAddress/addAddress',
    })
  },
  delAddress() {

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