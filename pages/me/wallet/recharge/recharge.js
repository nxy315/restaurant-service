// pages/me/wallet/recharge/recharge.js
const app = getApp()
import { getData, pay, postData, login } from '../../../../utils/ajax'
import { wxSetData } from '../../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: [],
    index: 0,
    money: null
  },

  /**
   * 充值下单
   * @method: POST 
   * @url: /api/5b3333808c1e4.html
   * 
   * @params total: float       充值金额
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async recharge() {
    let data = await postData('/api/5b3333808c1e4.html', {total: this.data.money})
    pay(data.oid)
  },

  /**
   * 获取充值类型
   * @method: GET 
   * @url: /api/5b333609090a0.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getChoice() {
    let data = await getData('/api/5b333609090a0.html', {})
    let list = data.info
    let choice = []
    for(let key in list) {
      choice.push({money: key, name: list[key], check: false})
    }
    choice[0].check = true
    this.setData({
      choice,
      money: choice[0].money
    })
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
      choice: list,
      money: list[index].money
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChoice()
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