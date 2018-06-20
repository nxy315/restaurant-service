// pages/me/star/star.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList: []
  },

  /**
   * 收藏取消收藏
   * @method: GET 
   * @url: /api/5b29c482c6ce3.html
   *
   * @param id:Int                    商家id
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  collect(e) {
    wx.showLoading({
      title: ''
    })
    let index = e.currentTarget.dataset.index
    app.get('/api/5b29c482c6ce3.html', {}, data => {
      let list = [...this.data.starList]
      list[index].check = !list[index].check

      this.setData({
        starList: list
      })
    })
  },

  /**
   * 获取收藏列表
   * @method: GET 
   * @url: /api/5b29c53fe42e8.html
   *
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  getStarList() {
    app.get('/api/5b29c53fe42e8.html', {}, data => {
      let list = data.collection_list
      for (let i = 0; i < list.length; i++) {
        list[i].check = true
      }
      this.setData({
        starList: data.collection_list
      })
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
    this.getStarList()
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