// pages/pay/pay.js
const app = getApp();
import { pay, getData, postData, login, collectStore } from '../../utils/ajax'
import { wxSetData, wxLogin } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}
  },

  /**
   * 支付
   * @method: GET 
   * @url: /api/5b2fb83ae439c.html
   *
   * @params total:Int          总金额
   * @params yunfei_type:Int    运费类型
   * @params yunfei:Int         运费
   * @params remarks:Int        备注
   * @params payment:Int        1余额支付 4 支付宝支付 7 账期支付 8 微信支付
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async payFor() {
    let data = await postData('/api/5b2fb83ae439c.html', this.data.order)
    console.log()
    let result = await pay(parseInt(data.oid))
    console.log(result)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order = JSON.parse(options.order)
    console.log(order)
    this.setData({
      order
    })
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