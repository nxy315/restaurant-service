// pages/forum/forum.js
const app = getApp();
import { getData } from '../../utils/ajax'
import { wxSetData, wxPreview } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toTop: false,
    top: 0,
    loadMore: true,
    end: false,
    imgUrl: app.globalData.imgUrl,
    suck: false,
    types: [
      { icon: 'sort_light', name: '全部' },
      { icon: 'post', name: '产品需求' },
      { icon: 'hot', name: '厂商新品' },
    ],
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(254, 64, 112, 1)',
      autoplay: true,
      interval: 3000,
      circular: true,
      duration: 500
    },//swiper 配置
    page: 1,
    pagenum: 6,
    currentType: 0,
    bannerList: [],//广告数据
    open: false,
    list: [],
    loading: true,

    province_id: '',
    city_id: '',
    district_id: '',
    areaname: '',
  },

  locaiton() {
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },

  toCity() {
    wx.navigateTo({
      url: '/pages/forum/city/city',
    })
  },

  /* 滚动 */
  scroll(e) {
    app.scroll(e, 200, 'suck', this)
  },

  goTop() {
    this.setData({
      top: 200
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
    let data = await getData('/api/5b169d7bb041d.html', { adplace: id})
    this.setData({
      bannerList: data.ad_list
    })
  },

  /**
   * 餐饮圈数据列表
   * @method: GET 
   * @url: /api/5b2b753401e58.html
   *
   * @param page:Int            页码
   * @param pagenum:Int         每页显示多少个
   * @param type:Int            0 全部 1 需求 2 产品
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getList() {
    wx.showNavigationBarLoading()
    await wxSetData(this, { loading: true })
    let data = await getData('/api/5b2b753401e58.html', {
      page: this.data.page,
      pagenum: this.data.pagenum,
      type: this.data.currentType,
      province_id: this.data.province_id,
      city_id: this.data.city_id,
      district_id: this.data.district_id,
    })
    app.globalData.changeArea = false
    
    let end
    data.quan_list.length < this.data.pagenum ? end = true : end = false
    let list = [...this.data.list]

    data = this.data.page == 1 ? data.quan_list : list.concat(data.quan_list)

    this.setData({
      list: data,
      loadMore: true,
      end,
      loading: false
    })
    wx.hideNavigationBarLoading()
  },


  async pullFresh() {
    if (this.data.loading) return
    await wxSetData(this, { page: 1 })
    this.getList()
  },

  /**
   * 触底加载更多
   */
  async reachBottom() {
    if (!this.data.loadMore || this.data.end) return

    let page = this.data.page + 1
    await wxSetData(this, { loadMore: false, page })
    this.getList()
  },

  /**
   * 点赞
   * @method: GET 
   * @url: /api/5b309d0170036.html
   *
   * @param quan_id:Int @require    id
   * @header[version]               版本号
   * @header[access-token]          验签
   * @header[user-token]            验签
   */
  async like(e) {
    let target = e.currentTarget.dataset
    let index = target.index,
      quan_id = target.id

    try {
      await getData('/api/5b309d0170036.html', { quan_id })
      let list = [...this.data.list]
      list.splice(index, 1, { ...list[index], zan: parseInt(list[index].zan) + 1 })
      this.setData({
        list
      })
      wx.showToast({
        title: '点赞成功',
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '您已经赞过了',
      })
    }
  },

  /**
   * 预览
   */
  async preview(e) {
    let index = e.currentTarget.dataset.index
    let idx = e.currentTarget.dataset.idx
    let list = [...this.data.list]
    let preUrls = list[index].quan_image_list
    let urls = []
    for(let i = 0; i < preUrls.length; i++) {
      urls.push(preUrls[i].image)
    }
    wxPreview(urls[idx], urls)
  },

  checkDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/forum/detail/detail?id=${id}`,
    })
  },


  async tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    await wxSetData(this, { currentType: i, top: 200, page: 1 })
    this.getList()
  },

  /**
   * 打开发布需求
   */
  openPost() {
    this.setData({
      open: !this.data.open
    })
  },

  /**
   * 发布需求
   */
  postForm(e) {
    let type = e.currentTarget.dataset.type

    wx.navigateTo({
      url: `/pages/forum/post/post?type=${type}`,
    })
    this.setData({
      open: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(102)
    this.getList()
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
    let change = app.globalData.changeArea
    if(change) {
      this.setData({
        province_id: app.globalData.province,
        city_id: app.globalData.city,
        district_id: app.globalData.area,
        areaname: app.globalData.areaname,
      }, () => {
        this.getList()
      })
    }
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
})