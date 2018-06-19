// pages/me/wallet/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: [
      { name: '充值3000送2%得3060', check: true },
      { name: '充值5000送3%得5150', check: false },
      { name: '充值10000送5%得10500', check: false }
    ],
    index: 0
  },

  choose(e) {
    let index = e.currentTarget.dataset.index
    let list = [...this.data.choice]
    if (list[index].check) return

    for (let i = 0; i < list.length; i++) {
      list[i].check = false
    }
    list[index].check = true
    this.setData({
      choice: list
    })
  },

  recharge() {
    wx.redirectTo({
      url: '/pages/me/wallet/wallet',
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