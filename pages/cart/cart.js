// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],//购物车列表数据结构

    checkAll: true,
    money: 0,//合计
  },

  /**
   * 购物车列表
   * @method: GET 
   * @url: /api/
   * 
   * @param keyword :String     关键词
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  getCart() {
    // app.get('', {}, data => {})
    this.setData({
      cartList: [
        { id: 1, name: '脆皮乳猪1', price: 200.0, unit: '头', count: 1, des: '烤乳猪烤乳猪烤乳猪烤乳猪烤乳猪', check: true },
        { id: 2, name: '脆皮乳猪2', price: 201.0, unit: '只', count: 1, des: '烤乳猪烤乳猪烤乳猪烤乳猪烤乳猪', check: true },
        { id: 3, name: '脆皮乳猪3', price: 202.0, unit: '盒', count: 1, des: '烤乳猪烤乳猪烤乳猪烤乳猪烤乳猪', check: true },
        { id: 4, name: '脆皮乳猪4', price: 203.0, unit: '根', count: 1, des: '烤乳猪烤乳猪烤乳猪烤乳猪烤乳猪', check: true },
        { id: 5, name: '脆皮乳猪5', price: 204.1, unit: '条', count: 1, des: '烤乳猪烤乳猪烤乳猪烤乳猪烤乳猪', check: true },
      ]
    }, () => {
      wx.setTabBarBadge({
        index: 3,
        text: `${this.data.cartList.length}`
      })
      this.calc();
    })
  },

  // 结算
  toClear() {
    wx.navigateTo({
      url: '/pages/clearing/clearing',
    })
  },

  // 选择\取消产品
  chooseItem(e) {
    let i = e.currentTarget.dataset.index;
    let list = [...this.data.cartList];
    let check = list[i].check
    let count = list[i].count
    if(!check && count == 0) {
      count = 1
    }
    list.splice(i, 1, {...list[i], count, check: !list[i].check})
    
    this.setData({
      cartList: list
    }, () => {
      this.calc();
      this.judgeFn(list[i].check)
    })
  },

  // 减
  reduceCount(e) {
    let i = e.currentTarget.dataset.index
    if(this.data.cartList[i].count <= 0) return

    let list = [...this.data.cartList]
    let count = list[i].count - 1
    if(count > 0) {
      list.splice(i, 1, {...list[i], count, check: true})
    } else {
      list.splice(i, 1, {...list[i], count, check: false})
    }

    this.setData({
      cartList: list
    }, () => {
      this.calc();
      this.judgeFn(list[i].check)
    })
  },

  // 加
  plusCount(e) {
    let i = e.currentTarget.dataset.index;

    let list = [...this.data.cartList];
    let count = list[i].count + 1
    list.splice(i, 1, {...list[i], count, check: true})
    this.setData({
      cartList: list
    }, () => {
      this.judgeFn(list[i].check)
    })
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

  // 计算价格
  calc() {
    let list = [...this.data.cartList];
    let money = 0;
    for(let i = 0; i < list.length; i++) {
      if(!list[i].check) continue
      money += list[i].count*list[i].price
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
      url: '/pages/detail/detail',
    })
  },

  /**
   * 全选、取消全选
   */ 
  handleAll() {
    let list = [...this.data.cartList];
    this.setData({
      checkAll: !this.data.checkAll
    }, () => {
      for(let i = 0; i < list.length; i++) {
        list[i].check = this.data.checkAll
        if(this.data.checkAll && list[i].count == 0) list[i].count = 1
      }

      this.setData({
        cartList: list
      }, () => {
        this.calc();
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