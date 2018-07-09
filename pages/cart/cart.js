// pages/cart/cart.js
const app = getApp();
import { getData, postData } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    cartList: [],//购物车列表数据结构

    checkAll: true,
    money: 0,//合计
    noData: false,
    allCount: 0,
    pending: false,
    timer: null,
  },

  /**
   * 购物车列表
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
    
    await wxSetData(this, { noData: true, allCount: data.total_num != null ? data.total_num : 0 })
    wx.setTabBarBadge({
      index: 3,
      text: `${this.data.allCount}`
    })

    if(list.length <= 0) {
      await wxSetData(this, { noData: true })
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].check = true
      }
      await wxSetData(this, { noData: false, cartList: data.shoppingcart });

      this.calc();
    }
  },

  /**
   * 去结算页
   */
  toClear() {
    wx.navigateTo({
      url: '/pages/clearing/clearing',
    })
  },

  /**
   * 去逛逛
   */
  qugg() {
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  },

  // 选择\取消产品
  async chooseItem(e) {
    let i = e.currentTarget.dataset.index;
    let list = [...this.data.cartList];
    let check = list[i].check
    let count = list[i].nums
    if (!check && list[i].nums == 0) {
      list[i].nums = 1
    }
    list.splice(i, 1, {...list[i], check: !list[i].check})
    
    await wxSetData(this, { cartList: list })
    this.judgeFn(list[i].check)
  },

  /**
   * 减
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
      list = [...this.data.cartList]

    if(this.data.pending) return
    await wxSetData(this, {pending: true})

    try{
      await postData('/api/5b29ad2a751fa.html', {
        gid, pid, price, spec, nums: -1, gname
      })

      list[i].nums = parseInt(list[i].nums) - 1
      if (list[i].nums <= 0) {
        list.splice(i, 1)
      } else {
        list.splice(i, 1, { ...list[i], nums: list[i].nums })
      }
  
      await wxSetData(this, { cartList: list, allCount: (parseInt(this.data.allCount) - 1) <= 0 ? 0 : (parseInt(this.data.allCount) - 1)})
      wx.setTabBarBadge({
        index: 3,
        text: `${this.data.allCount}`
      })
      this.calc()
      // 留给小程序渲染时间500毫秒
      clearTimeout(this.data.timer)
      this.data.timer = setTimeout(async () => {
        await wxSetData(this, {pending: false})
      }, 500)
      // 判断减掉之后数据的长度，如果长度为0，设置noData为true
      if (list.length <= 0) {
        await wxSetData(this, { noData: true })
        return false
      }
    } catch(e) {
      wx.showToast({
        title: '操作失败'
      })
    }
  },

  /**
   * 加
   */
  async plusCount(e) {
    if (this.data.pending) return
    let data = e.currentTarget.dataset
    let type = data.type,
      i = data.index,
      gid = parseInt(data.gid),
      pid = parseInt(data.pid),
      price = parseFloat(data.price),
      spec = data.spec,
      gname = data.gname,
      list = [...this.data.cartList]

    await wxSetData(this, { pending: true })

    try{
      await postData('/api/5b29ad2a751fa.html', {
        gid, pid, price, spec, nums: 1, gname
      })

      list[i].nums = parseInt(list[i].nums) + 1
      list.splice(i, 1, {...list[i]})

      await wxSetData(this, { cartList: list, allCount: parseInt(this.data.allCount) + 1})
      wx.setTabBarBadge({
        index: 3,
        text: `${this.data.allCount}`
      })
      this.calc()
      // 留给小程序渲染时间500毫秒
      clearTimeout(this.data.timer)
      this.data.timer = setTimeout(async () => {
        await wxSetData(this, {pending: false})
      }, 500)
    } catch(e) {
      await wxSetData(this, {pending: false})
      wx.showToast({
        title: '操作失败'
      })
    }
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
    await postData('/api/5b29ad2a751fa.html', {
      gid, pid, price, spec, nums, gname
    })
  },

  /**
   * 删除购物车
   */
  async delThis(e) {
    let data = e.currentTarget.dataset
    let i = data.index,
      nums = parseInt(data.nums),
      cid = parseInt(data.cartid),
      list = [...this.data.cartList]
    try{
      wx.showLoading({
        title: ''
      })
      let data = await getData('/api/5b29af242231d.html', {cartid: cid})
      wx.hideLoading()

      list.splice(i, 1)
      await wxSetData(this, {cartList: list})
      wx.showToast({
        title: '删除成功',
        icon: 'none'
      })
      await wxSetData(this, {allCount: parseInt(this.data.allCount) - nums, noData: (parseInt(this.data.allCount) - nums) <= 0 ? true : false})
      wx.setTabBarBadge({
        index: 3,
        text: `${this.data.allCount}`
      })
      this.calc()
    } catch(e) {
      wx.hideLoading()
      return wx.showToast({
        title: '删除失败',
        icon: 'none'
      })
    }
  },

  judgeFn(check) {
    this.calc();

    if(check) {
      if(this.checkStatus()) {
        this.setData({
          checkAll: true
        })
      } else {
        this.setData({
          checkAll: false
        })
      }
    } else {
      this.setData({
        checkAll: false
      })
    }
  },

  // 计算总价
  calc() {
    let list = [...this.data.cartList];
    let money = 0;
    for(let i = 0; i < list.length; i++) {
      if(!list[i].check) continue
      money += parseInt(list[i].nums)*parseFloat(list[i].price)
    }

    this.setData({
      money
    })
  },

  // 检查状态
  checkStatus() {
    let list = [...this.data.cartList]
    for(let i = 0; i < list.length; i++) {
      if(!list[i].check) return false
    }

    return true
  },

  // 购物车跳转详情页
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  /**
   * 清空购物车
   * @method: GET
   * @url: /api/5b29af242231d.html
   *
   * @header[version]                 版本号
   * @header[access-token]            验签
   * @header[user-token]              验签
   */
  async clear() {
    let data = await getData('/api/5b29af242231d.html', {})

    if(data.status == 1) {
      wx.showToast({
        title: '购物车已清空',
        icon: 'success'
      })
      wx.setTabBarBadge({
        index: 3,
        text: '0'
      })
      await wxSetData(this, { cartList: [], noData: true })
    }

    // let list = [...this.data.cartList];
    // this.setData({
    //   checkAll: !this.data.checkAll
    // }, () => {
    //   for(let i = 0; i < list.length; i++) {
    //     list[i].check = this.data.checkAll
    //     if(this.data.checkAll && list[i].count == 0) list[i].count = 1
    //   }

    //   this.setData({
    //     cartList: list
    //   }, () => {
    //     this.calc();
    //   })
    // })
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
    this.getCart()
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