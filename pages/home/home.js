// pages/home/home.js
const app = getApp();
import { getData, postData, login } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    suck: false,
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(254, 64, 112, 1)',
      duration: 300
    },//swiper 配置
    keyword: '',//关键字
    typeList: [],//厂商类型数据列表
    // list: [
    //   [], [], []
    // ],//厂商列表
    list: [],//厂商列表
    sort: ['', 'id-desc', 'hit-desc'],//厂商排序
    resultSwiper: {
      duration: 200
    },
    types: [
      { name: '全部' },
      { name: '最新入驻' },
      { name: '人气排名' },
    ],
    currentType: 0,
    loading: true,
    // loading: [true, true, true],
    banner: '',//广告数据

    swiperHeight: 500
  },

  //输入框
  handelInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  /* 计算swiper的高度 */
  calcuHeight() {
    let height = Math.ceil(this.data.list[this.data.currentType].length/2)*484

    this.setData({
      swiperHeight: height != 0 ? height : 500
    })
  },

  /**
   * 获取广告图
   * @method: GET 
   * @url: /api/5b169d7bb041d.html
   *
   * @param adplace:String      100:首页 101:推荐 103:餐饮圈
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getAds(id) {
    let data = await getData('/api/5b169d7bb041d.html', {
      adplace: id
    })

    this.setData({
      banner: data.ad_list[0].adpic
    })
  },

  /**
   * 滚动
   */
  scroll(e) {
    app.scroll(e, 440, 'suck', this)
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
  async getTypes() {
    let data = await getData('/api/5b150d64dee3d.html', {})
    
    let list = data.store_sort_list
    let len = Math.ceil(list.length / 8)
    
    let arr = []
    for(let i = 0; i < len; i++) {
      arr[i] = list.slice(i * 8, (i + 1)*8)
    }
    this.setData({
      typeList: arr
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
  async getList(sort) {
    let data = await getData('/api/5b16a8b915bff.html',{sort})

    this.setData({
      list: data.store_list,
      loading: false
    })
  },

  /* 跳转厂商列表页 */
  toList(e) {
    let id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : ''
    wx.navigateTo({
      url: `/pages/home/list/list?id=${id}&&keyword=${this.data.keyword}`,
    })
  },

  /* 改变索引，切换swiper */
  async tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    await wxSetData(this, {
      currentType: i,
      list: [],
      loading: true
    })
    this.getList(this.data.sort[this.data.currentType]);
  },

  async load() {
    try {
      this.getTypes();
      this.getAds(100)
      this.getList(this.data.sort[this.data.currentType])
    } catch (err) {
      console.log(err == -14)
      if(err == -14) {
        await login()
        this.getTypes();
        this.getAds(100)
        this.getList(this.data.sort[this.data.currentType])
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
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
      keyword: ''
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getList(this.data.sort[this.data.currentType])
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})