// pages/me/address/addAddress/addAddress.js
const app = getApp()
import { getData, postData } from '../../../../utils/ajax'
import { wxSetData } from '../../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../../libs/runtime')
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajaxData: {
      realname: '',
      tel: '',
      address: '',
      channel: '',
      province_id: '',
      city_id: '',
      district_id: '',
      short_address: ''
    },
    province: null,
    i1: 0,
    city: null,
    i2: 0,
    county: null,
    i3: 0,
  },

  /**
   * 新增地址
   * @method: POST
   * @url: /api/5b2673319f025.html
   *
   * @param realname:String     真实姓名
   * @param tel:String          手机号
   * @param address:String      详细地址
   * @param channel:String      渠道码
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async saveAddress() {
    if (!this.data.ajaxData.realname) {
      return wx.showToast({
        title: '店铺不能为空',
        icon: 'none'
      })
    } else if (!this.data.ajaxData.tel) {
      return wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!this.data.ajaxData.short_address) {
      return wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
    } else if (!phoneReg.test(this.data.ajaxData.tel)) {
      return wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
    }
    let thisData = this.data
    let address = thisData.province[thisData.i1].name + thisData.city[thisData.i2].name + thisData.county[thisData.i3].name
    await postData('/api/5b2673319f025.html', { ...thisData.ajaxData, address })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 输入框取值
   */
  inputHandler(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value

    this.setData({
      ajaxData: { ...this.data.ajaxData, [key]: value }
    })
  },

  /**
   * 获取省
   * @method: GET
   * @url: /api/5b3ec0a8d89f5.html
   *
   * @param pid:Int                    城市ID pid =0 获取所有的省份 pid 传递省份id 例如1046 获取安徽省下的城市 pid 传递城市id 例如1047 获取合肥市下面的区
   * @header[version]                  版本号
   * @header[access-token]             验签
   * @header[user-token]               验签
   */
  async getProvince() {
    let data1 = await getData('/api/5b3ec0a8d89f5.html', { pid: 0 })
    let provinceId = data1.area_list[0].id
    await wxSetData(this, { province: data1.area_list, ajaxData: { ...this.data.ajaxData, province_id: provinceId } })

    let data2 = await getData('/api/5b3ec0a8d89f5.html', { pid: provinceId })
    let cityId = data2.area_list[0].id
    await wxSetData(this, { city: data2.area_list, ajaxData: { ...this.data.ajaxData, city_id: cityId } })

    let data3 = await getData('/api/5b3ec0a8d89f5.html', { pid: cityId })
    await wxSetData(this, { county: data3.area_list, ajaxData: { ...this.data.ajaxData, district_id: data3.area_list[0].id } })
  },

  /**
   * 选择省
   * 
   * 选择省 -> 获取市数据，市索引、区索引变为0、市id、区id、变为对应索引的id
   */
  async chooseProvince(e) {
    let id = this.data.province[e.detail.value].id

    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, province_id: id }, i1: e.detail.value, i2: 0, i3: 0 })
    let data1 = await getData('/api/5b3ec0a8d89f5.html', { pid: id })
    let cityId = data1.area_list[0].id
    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, city_id: cityId }, city: data1.area_list })

    let data2 = await getData('/api/5b3ec0a8d89f5.html', { pid: cityId })
    let countyId = data2.area_list[0].id
    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, district_id: countyId }, county: data2.area_list })
  },

  /**
   * 选择市
   */
  async chooseCity(e) {
    let id = this.data.city[e.detail.value].id
    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, city_id: id }, i2: e.detail.value, i3: 0 })
    // 通过选择的市id获取区列表
    let data = await getData('/api/5b3ec0a8d89f5.html', { pid: id })
    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, district_id: data.area_list[0].id }, county: data.area_list })
  },

  /**
   * 选择区
   */
  async chooseCounty(e) {
    let id = this.data.county[e.detail.value].id
    await wxSetData(this, { ajaxData: { ...this.data.ajaxData, district_id: id }, i3: e.detail.value })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()
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