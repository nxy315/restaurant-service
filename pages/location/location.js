// pages/location/location.js
const app = getApp()
import { getData, postData } from '../../utils/ajax'
import { wxSetData, wxShowLoading } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
var bmap = require('../../libs/bmap-wx/bmap-wx.js')
var wxMarkerData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: 'SFwtGeUpn30BF6a0ETfNOk8QGGgD4ISG',
    address: '',
    province: null,
    province_id: null,
    i1: 0,
    city: null,
    city_id: null,
    i2: 0,
    county: null,
    district_id: null,
    i3: 0,
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
    await wxSetData(this, { province: data1.area_list,province_id: provinceId })

    let data2 = await getData('/api/5b3ec0a8d89f5.html', { pid: provinceId })
    let cityId = data2.area_list[0].id
    await wxSetData(this, { city: data2.area_list, city_id: cityId })

    let data3 = await getData('/api/5b3ec0a8d89f5.html', { pid: cityId })
    await wxSetData(this, { county: data3.area_list, district_id: data3.area_list[0].id })
  },

  /**
   * 选择省
   * 
   * 选择省 -> 获取市数据，市索引、区索引变为0、市id、区id、变为对应索引的id
   */
  async chooseProvince(e) {
    let id = this.data.province[e.detail.value].id

    await wxSetData(this, { province_id: id, i1: e.detail.value, i2: 0, i3: 0 })
    let data1 = await getData('/api/5b3ec0a8d89f5.html', { pid: id })
    let cityId = data1.area_list[0].id
    await wxSetData(this, { city_id: cityId , city: data1.area_list })

    let data2 = await getData('/api/5b3ec0a8d89f5.html', { pid: cityId })
    let countyId = data2.area_list[0].id
    await wxSetData(this, { district_id: countyId, county: data2.area_list })
  },

  /**
   * 选择市
   */
  async chooseCity(e) {
    let id = this.data.city[e.detail.value].id
    await wxSetData(this, { city_id: id, i2: e.detail.value, i3: 0 })
    // 通过选择的市id获取区列表
    let data = await getData('/api/5b3ec0a8d89f5.html', { pid: id })
    await wxSetData(this, { district_id: data.area_list[0].id, county: data.area_list })
  },

  /**
   * 选择区
   */
  async chooseCounty(e) {
    let id = this.data.county[e.detail.value].id
    await wxSetData(this, { district_id: id , i3: e.detail.value })
  },

  /**
   * 确定
   */
  async chooseLocation() {
    app.globalData.province = this.data.province_id
    app.globalData.city = this.data.city_id
    app.globalData.area = this.data.district_id
    app.globalData.areaname = this.data.county[this.data.i3].shortname
    app.globalData.changeArea = true

    wx.navigateBack({
      delta: 1
    })
  },
  
  /**
   * 定位
   */
  async location() {
    await wxSetData(this, {address: ''})
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()

    this.location()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})