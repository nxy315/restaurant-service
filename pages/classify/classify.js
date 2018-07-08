// pages/classify/classify.js
const app = getApp();

import { getData, postData } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toTop: false,
    imgUrl: app.globalData.imgUrl,
    suck: false,
    fold: false,
    allCount: 0,//购物车总数量
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(254, 64, 112, 1)',
      autoplay: true,
      interval: 3000,
      circular: true,
      duration: 500
    },//swiper 配置
    resultId: '',
    varietyIndex: 0,
    variety: [],// 商品分类
    bannerList: [],//广告数据
    page: 1,
    pagenum: 6,
    loadMore: true,
    end: false,
    result: [],//商品列表数据
    top: 0,
    cartGid: [],
    cartPid: [],
    cartcount: {},
    cartcount2: {}
  },

  loadImage(e) {
  },
  
  foldToggle() {
    this.setData({
      fold: !this.data.fold
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
    let data = await getData('/api/5b169d7bb041d.html',{adplace: id})
    this.setData({
      bannerList: data.ad_list
    })
  },

  /**
   * 获取分类
   * @method: GET 
   * @url: /api/5b16b2355d474.html
   *
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getVariety() {
    let data = await getData('/api/5b16b2355d474.html', {})
    data.sort_lsit.unshift({ name: '全部', id:'0'})
    await wxSetData(this, {
      variety: data.sort_lsit,
      varietyIndex: 0,
      resultId: data.sort_lsit[0].id,
      // result: [],
      page: 1
    })
  },

  /**
   * 获取商品
   * @method: GET 
   * @url: /api/5b16b2ab1de15.html
   *
   * @param sortid:int          分类id
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getResult() {
    let data = await getData('/api/5b16b2ab1de15.html', {
      sortid: this.data.resultId,
      page: this.data.page,
      pagenum: this.data.pagenum
    })

    let list = data.shop_list
    let count = this.data.allCount
    for (let i = 0; i < list.length; i++) {
      list[i].fold = true
    }
    let end
    list.length < this.data.pagenum ? end = true : end = false
    let result = [...this.data.result]
    result = this.data.page == 1 ? list : result.concat(list)

    await wxSetData(this, {
      result,
      loadMore: true,
      end,
    })
    this.cartCount();
  },

  /**
   * 选择规格
   */
  chooseSize(e) {
    let i = e.currentTarget.dataset.index
    let list = [...this.data.result]
    list[i].fold = !list[i].fold
    this.setData({
      result: list
    })
  },

  /**
   * 减数量
   */
  async reduceCount(e) {
    let data = e.currentTarget.dataset
    let type = data.type,
      i = data.index,
      gid = parseInt(data.gid),
      pid = parseInt(data.pid),
      price = parseFloat(data.price),
      spec = data.spec,
      gname = data.gname,
      list = [...this.data.result]

    if (!type) {
      if (list[i].nums > 0) {
        this.operaCard(gid, pid, price, spec, -1, gname)
        list[i].nums = list[i].nums - 1
        await wxSetData(this, {
          result: list,
          allCount: this.data.allCount - 1
        })
        if (this.data.allCount <= 0) {
          this.removeCart()
        } else {
          this.cartCount();
        }
      }
    } else {
      let sizeIndex = e.currentTarget.dataset.i
      if (list[i].products_list[sizeIndex].nums > 0) {
        await this.operaCard(gid, pid, price, spec, -1, gname)
        list[i].products_list[sizeIndex].nums = list[i].products_list[sizeIndex].nums - 1
        await wxSetData(this, {
          result: list,
          allCount: this.data.allCount - 1
        })

        if (this.data.allCount <= 0) {
          this.removeCart()
        } else {
          this.cartCount();
        }
      }
    }
  },

  /**
   * 加数量
   */
  async addCount(e) {
    console.log(e)
    let data = e.currentTarget.dataset
    let type = data.type,
      i = data.index,
      gid = parseInt(data.gid),
      pid = parseInt(data.pid),
      price = parseFloat(data.price),
      spec = data.spec,
      gname = data.gname,
      list = [...this.data.result]

    await this.operaCard(gid, pid, price, spec, 1, gname)

    if (!type) {
      list[i].nums = parseInt(list[i].nums) + 1
    } else {
      let sizeIndex = e.currentTarget.dataset.i
      list[i].products_list[sizeIndex].nums = parseInt(list[i].products_list[sizeIndex].nums) + 1
    }

    await wxSetData(this, {
      result: list,
      allCount: this.data.allCount + 1
    })
    this.cartCount();
  },

  /**
   * 购物车加减
   * @method: POST 
   * @url: /api/5b29ad2a751fa.html
   *
   * @param gid:String @require       商品ID
   * @param pid:String @require       规格ID
   * @param price:String @require     价格
   * @param spec:String @require      规格名
   * @param nums:String @require      数量(1或-1)
   * @param gname:String @require     商品名
   * @header[version]                 版本号
   * @header[access-token]            验签
   * @header[user-token]              验签
   */
  async operaCard(gid, pid, price, spec, nums, gname) {
    await postData('/api/5b29ad2a751fa.html',{
      gid, pid, price, spec, nums, gname
    })
  },

  /**
   * 清空购物车
   */
  removeCart() {
    wx.removeTabBarBadge({
      index: 3
    })
  },
  /**
   * 购物车+-1
   */
  cartCount() {
    wx.setTabBarBadge({
      index: 3,
      text: `${this.data.allCount}`
    })
  },

  upper(e){
    console.log('upper')
  },

  goTop() {
    this.setData({
      top: 200
    })
  },
  /* 滚动 */
  scroll(e) {
    app.scroll(e, 200, 'suck', this)
  },

  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  // 选择品类
  async chooseVariety(e) {
    let id = e.currentTarget.dataset.id;
    let i = e.currentTarget.dataset.index;

    await wxSetData(this, {
      varietyIndex: i,
      resultId: id,
      page: 1,
      end: false,
      top: 200,
    })
    this.getResult()
  },

  /**
   * 底部加载更多
   */
  async reachBottom() {

    if (!this.data.loadMore || this.data.end) return

    let page = this.data.page + 1
    await wxSetData(this, { loadMore: false, page })
    this.getResult()
  },

  async load() {
    await this.getVariety();
    this.getResult();
    
  },

  async show() {
    this.getCart()
  },

  /**
   * 购物车数量
   * @method: GET 
   * @url: /api/5b29aaa68d36e.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getCart() {
    let data = await getData('/api/5b29aaa68d36e.html', {})
    let list = data.shoppingcart
    console.log(list)
    let gids = []
    let pids = []
    let count = {}

    for (let i = 0; i < list.length; i++) {
      gids.push(parseInt(list[i].gid))
      pids.push(parseInt(list[i].pid))
      count[`${list[i].gid}_${list[i].pid}`] = parseInt(list[i].nums)
    }

    if(this.data.result.length > 0) {
      let result = [...this.data.result]
      for (let i = 0; i < result.length; i++) {
        if (gids.indexOf(parseInt(result[i].id)) != -1) {
          for (let j = 0; j < result[i].products_list.length; j++) {
            if (pids.indexOf(parseInt(result[i].products_list[j].id)) != -1) {
              if (result[i].products_list.length == 1) {
                result[i].nums = count[`${result[i].products_list[0].goods_id}_${result[i].products_list[0].id}`]
              } else {
                result[i].products_list[j].nums = count[`${result[i].products_list[j].goods_id}_${result[i].products_list[j].id}`]
              }
            } else {
              result[i].products_list[j].nums = 0
            }
          }
        } else {
          if (result[i].products_list.length == 1) {
            result[i].nums = 0
          } else {
            for (let j = 0; j < result[i].products_list.length; j++) {
              result[i].products_list[j].nums = 0
            }
          }
        }
      }
      await wxSetData(this, {result})
    }

    await wxSetData(this, { allCount: data.total_num != null ? data.total_num : 0 })
    wx.setTabBarBadge({
      index: 3,
      text: `${data.total_num != null ? data.total_num : '0'}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(101)
    this.load()
    // this.getVariety();
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
    this.show()
    // this.setData({
    //   cartGid: app.globalData.cartGid,
    //   cartPid: app.globalData.cartPid,
    //   cartcount: app.globalData.cartCount,
    //   cartcount2: JSON.stringify(app.globalData.cartCount),
    // }, () => {
    //   if (this.data.result.length <= 0) return 

    //   let list = [...this.data.result]
    //   for (let i = 0; i < list.length; i++) {
    //     console.log(this.data.cartGid.indexOf(parseInt(list[i].id)))
    //     if (this.data.cartGid.indexOf(parseInt(list[i].id)) != -1) {
    //       for (let j = 0; j < list[i].products_list.length; j++) {
    //         if (this.data.cartPid.indexOf(parseInt(list[i].products_list[j].id)) != -1) {
    //           if (list[i].products_list.length == 1) {
    //             list[i].nums = this.data.cartcount[list[i].products_list[j].goods_id + '_' + list[i].products_list[j].id]
    //           } else {
    //             list[i].products_list[j].nums = this.data.cartcount[list[i].products_list[j].goods_id + '_' + list[i].products_list[j].id]
    //           }
    //         }
    //       }
    //     }
    //   }
    //   console.log(list)
    //   this.setData({
    //     result: list
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // setTimeout(() => {
    //   this.setData({
    //     varietyIndex: 0,
    //     result: []
    //   })
    // }, 1000)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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