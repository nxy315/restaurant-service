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

    address: '',
    objectMultiArray: [],
    multiIndex: [0, 0, 0]
  },

  bindMultiPickerChange(e) {
    console.log(e)
  },
  /**
   * 选择每列的时候
   */
  bindMultiPickerColumnChange(e) {
    let thisData = this.data
    let appData = app.globalData
    let province_range = appData.province_range
    let city_range = appData.city_range
    let district_range = appData.district_range
    let i = e.detail.value
    let data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex: this.data.multiIndex,
      address: this.data.address
    }

    switch (e.detail.column) {
      case 0:
        let range = province_range[i]
        data.objectMultiArray[1] = city_range[range.id]
        data.objectMultiArray[2] = district_range[city_range[range.id][0].id]
        data.multiIndex[0] = i;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        data.address = range.name + city_range[range.id][0].name + district_range[city_range[range.id][0].id].name
        break
      case 1:
        let range2 = data.objectMultiArray[1][i]
        data.objectMultiArray[2] = district_range[range2.id]
        data.multiIndex[1] = i;
        data.multiIndex[2] = 0;
        data.address = province_range[data.multiIndex[0]].name + range2.name + district_range[range2.id][0].name
        break
      case 2:
        let range3 = data.objectMultiArray[2][i]
        data.multiIndex[2] = i;
        data.address = province_range[data.multiIndex[0]].name + data.objectMultiArray[1][data.multiIndex[1]].name + data.objectMultiArray[2][i].name
        break
    }
    this.setData(data)
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
    let objectMultiArray = thisData.objectMultiArray
    let multiIndex = thisData.multiIndex
    let province_id, city_id, district_id;
    province_id = objectMultiArray[0][multiIndex[0]].id
    city_id = objectMultiArray[1][multiIndex[1]].id
    district_id = objectMultiArray[2][multiIndex[2]].id
    await postData('/api/5b2673319f025.html', { ...thisData.ajaxData, address: this.data.address, province_id, city_id, district_id })
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
    let province_range = app.globalData.province_range
    let city_range = app.globalData.city_range
    let district_range = app.globalData.district_range
    let city = [], district = [], multiIndex = [0, 0, 0],address=''

    city = city_range[province_range[0].id]

    district = district_range[city[0].id]
    address = province_range[0].name + city[0].name + district[0].name
    this.setData({
      address,
      objectMultiArray: [[...province_range], [...city], [...district]],
      multiIndex
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

})