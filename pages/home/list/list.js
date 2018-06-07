// pages/home/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    id: '',
    word: '',
    types: [
      { name: '最新商家', sort: 'id-desc' },
      { name: '人气商家', sort: 'hit-desc' },
    ],
    
    list: [
      [],[]
    ],//列表数据
    currentType: 0,
    loading: true
  },

  
  /**
   * 首页厂商类型
   * @method: GET 
   * @url: /api/5b150d64dee3d.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  collection(e) {
    let id = e.currentTarget.dataset.id
    wx.request({
      method: 'post',
      url: `${app.globalData.reqUrl}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id
      },
      success: data => {
        
      },
    })
  },

  
  /**
   * 厂商列表
   * @method: GET 
   * @url: /api/5b16a8b915bff.html
   * 
   * @param keyword :String     关键词
   * @param sortid  :Int        分类id
   * @param sort    :String     排序字段   全部:'' 最新:'id-desc'  人气:'hit-desc'
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getList(id, word) {
    this.setData({
      loading: true
    })
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}/api/5b16a8b915bff.html`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': app.globalData.version
      },
      data: {
        sortid: id,
        keyword: word,
        sort: this.data.types[this.data.currentType].sort
      },
      success: data => {
        let list = [...this.data.list]
        list[this.data.currentType] = list[this.data.currentType].concat(data.data.data.store_list)
        this.setData({
          list
        })
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  },

  tapTypes(e) {
    let i = e.target.dataset.index;
    let sort = e.target.dataset.sort;
    this.setData({
      currentType: i
    }, () => {
      if(this.data.list[this.data.currentType].length > 0) return 
      this.getList(this.data.id, this.data.word)
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id ? options.id : ''
    let word = options.keyword ? options.keyword : ''
    this.setData({
      id,word
    })
    this.getList(id, word)
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