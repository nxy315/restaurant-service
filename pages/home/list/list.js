// pages/home/list/list.js
const app = getApp();
import { getData, login } from '../../../utils/ajax'
import { wxSetData } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toTop: false,
    imgUrl: app.globalData.imgUrl,
    id: '',
    word: '',
    sort: ['id-desc', 'hit-desc'],
    types: [{ name: '最新商家' }, { name: '人气商家' }],
    page: 1,
    pagenum: 6,
    loadMore: true,
    end: false,
    list: [],//列表数据
    currentType: 0,
    top: 0,
  },

  goTop() {
    this.setData({
      top: 0
    })
  },

  scroll(e) {
    let direction = e.detail.deltaY
    if (direction < 0) {
      if (e.detail.scrollTop >= 1000) {
        this.setData({
          toTop: true
        })
      }
    } else {
      if (e.detail.scrollTop <= 1000) {
        this.setData({
          toTop: false
        })
      }
    }
  },

  
  /**
   * 收藏厂商
   * @method: GET 
   * @url: 
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async collection(e) {
    let id = e.currentTarget.dataset.id
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
  async getList() {
    let mydata = this.data
    let sortid = mydata.id,
        keyword = mydata.word,
        sort = mydata.sort[mydata.currentType],
        page = mydata.page,
        pagenum = mydata.pagenum

    let data = await getData('/api/5b16a8b915bff.html', {
      sortid, keyword, sort, page, pagenum
    })
    let end
    data.store_list < this.data.pagenum ? end = true : end = false
    let list = [...this.data.list]
    data = list.concat(data.store_list)

    this.setData({
      list: data,
      loadMore: true,
      end
    })
  },

  /* 改变索引 */
  async tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    await wxSetData(this, {
      currentType: i,
      list: [],
      page: 1,
      end: false,
      top: 0,
    })
    this.getList()
  },
  
  async load(id, word) {
    await wxSetData(this, { id, word } )
    this.getList()
  },

  async reachBottom() {

    if (!this.data.loadMore || this.data.end) return

    let page = this.data.page + 1
    await wxSetData(this, { loadMore: false, page })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id ? options.id : ''
    let word = options.keyword ? options.keyword : ''
    this.load(id, word)
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
})