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

    address2: '',
    objectMultiArray: [],
    multiIndex: [0, 0, 0],
    list: [
      {
        name: '全国',
        id: ''
      },
      {
        name: '上海',
        id: ''
      },
      {
        name: '上海市',
        id: ''
      },
      {
        name: '松江',
        id: ''
      },
    ],
    currentIndex: 0
  },

  checkoutLocation(e) {
    let index = e.currentTarget.dataset.index

    this.setData({
      currentIndex: index
    })
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
      address2: this.data.address2
    }

    switch (e.detail.column) {
      case 0:
        let range = province_range[i]
        data.objectMultiArray[1] = city_range[range.id]
        data.objectMultiArray[2] = district_range[city_range[range.id][0].id]
        data.multiIndex[0] = i;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        data.address2 = range.name + city_range[range.id][0].name + district_range[city_range[range.id][0].id][0].name
        break
      case 1:
        let range2 = data.objectMultiArray[1][i]
        data.objectMultiArray[2] = district_range[range2.id]
        data.multiIndex[1] = i;
        data.multiIndex[2] = 0;
        data.address2 = province_range[data.multiIndex[0]].name + range2.name + district_range[range2.id][0].name
        break
      case 2:
        let range3 = data.objectMultiArray[2][i]
        data.multiIndex[2] = i;
        data.address2 = province_range[data.multiIndex[0]].name + data.objectMultiArray[1][data.multiIndex[1]].name + data.objectMultiArray[2][i].name
        break
    }
    this.setData(data)
  },

  /**
   * 确定
   */
  async chooseLocation() {
    let thisData = this.data
    let objectMultiArray = thisData.objectMultiArray
    let multiIndex = thisData.multiIndex
    let province_id, city_id, district_id;
    province_id = objectMultiArray[0][multiIndex[0]].id
    city_id = objectMultiArray[1][multiIndex[1]].id
    district_id = objectMultiArray[2][multiIndex[2]].id

    app.globalData.province = province_id
    app.globalData.city = province_id
    app.globalData.area = district_id
    app.globalData.areaname = objectMultiArray[2][multiIndex[2]].name
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
    let province_range = app.globalData.province_range
    let city_range = app.globalData.city_range
    let district_range = app.globalData.district_range
    let city = [], district = [], multiIndex = [0, 0, 0], address2 = ''

    city = city_range[province_range[0].id]

    district = district_range[city[0].id]
    address2 = province_range[0].name + city[0].name + district[0].name
    this.setData({
      address2,
      objectMultiArray: [[...province_range], [...city], [...district]],
      multiIndex
    })

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