// pages/clearing/clearing.js
const app = getApp();
import { getData, postData, login, collectStore } from '../../utils/ajax'
import { wxSetData, wxLogin } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: [],//
    index: 0,//运费类型索引
    address: null,
    remarks: '',//备注
    info: {
      total_num: '',
      total_price: '',
      yunfei: ''
    }
  },

  /**
   * 运费类型
   * @method: GET 
   * @url: /api/5b3338e126884.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getFei() {
    let feiList = await getData('/api/5b3338e126884.html')
    let info = feiList.info
    let list = []
    for(let key in info) {
      list.push({id: key, name:info[key]})
    }
    await wxSetData(this, { times: list })
    this.getYunfei()
  },

  /**
   * 获取地址列表
   * @method: GET 
   * @url: /api/5b266fc349914.html
   *
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getAddress() {
    let data = await getData('/api/5b266fc349914.html', {})
    let list = data.address_list

    if (data.address_list.length <= 0) return
    for (let i = 0; i < list.length; i++) {
      if (list[i].is_default == 1) {
        this.setData({
          address: list[i]
        })
      }
    }
  },

  /**
   * 获取运费，订单
   * @method: GET 
   * @url: /api/5b29afeb2148d.html
   *
   * @params type:Int           运费类型
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getYunfei() {
    let data = await getData('/api/5b29afeb2148d.html', { type: this.data.times[this.data.index].id })
    this.setData({
      info: data
    })
  },

  /**
   * 备注
   */
  handleChange(e) {
    let value = e.detail.value
    this.setData({
      remarks: value
    })
  },

  chooseAddress() {
    wx.navigateTo({
      url: '/pages/me/address/address',
    })
  },

  async bindPickerChange(e) {
    await wxSetData(this, { index: e.detail.value })
    this.getYunfei()
  },

  pay() {
    wx.navigateTo({
      url: `/pages/pay/pay?order=${JSON.stringify({ total: this.data.info.total_price, yunfei_type: this.data.times[this.data.index].id, yunfei: this.data.info.yunfei, remarks: this.data.remarks, payment:8})}`,
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
    this.getAddress()
    this.getFei()
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