// pages/me/userinfo/userinfo.js
const app = getApp()
import { getData, postData } from '../../../utils/ajax'
import { wxSetData, wxShowLoading } from '../../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: '',
    ajaxData: {
      nickname: '',
      realname: '',
      tel: '',
      user_work: '',
      address: '',
      province_id: null,
      city_id: null,
      district_id: null,
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
    let userInfo = app.globalData.userInfo//取全局userinfo

    let data1 = await getData('/api/5b3ec0a8d89f5.html', { pid: 0 })//获取省份数据

    let provinceId = userInfo.province_id ? userInfo.province_id : data1.area_list[0].id//判断用户是否有保存的省份id
    for (let i = 0; i < data1.area_list.length; i++) {
      if (provinceId == data1.area_list[i].id) {//循环省份数据，找到对应的id，并设置省份索引：i1
        await wxSetData(this, {i1: i})
      }
    }
    await wxSetData(this, { province: data1.area_list, ajaxData: { ...this.data.ajaxData, province_id: provinceId } })//设置省份数据
    
    let data2 = await getData('/api/5b3ec0a8d89f5.html', { pid: provinceId })//获取市数据
    let cityId = userInfo.city_id ? userInfo.city_id : data2.area_list[0].id
    for (let i = 0; i < data2.area_list.length; i++) {
      if (cityId == data2.area_list[i].id) {//循环市数据，找到对应的id，并设置市份索引：i2
        await wxSetData(this, { i2: i })
      }
    }
    await wxSetData(this, { city: data2.area_list, ajaxData: { ...this.data.ajaxData, city_id: cityId } })//设置市数据

    let data3 = await getData('/api/5b3ec0a8d89f5.html', { pid: cityId })//获取区数据
    let districtId = userInfo.district_id ? userInfo.district_id : data3.area_list[0].id
    for (let i = 0; i < data3.area_list.length; i++) {
      if (districtId == data3.area_list[i].id) {//循环区数据，找到对应的id，并设置区索引：i3
        await wxSetData(this, { i3: i })
      }
    }
    await wxSetData(this, { county: data3.area_list, ajaxData: { ...this.data.ajaxData, district_id: districtId } })//设置区数据
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
   * 选择头像
   */
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths
        let token = wx.getStorageSync('token')
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: 'https://api.youcanwuchu.com/api/5b2b65086fd13.html',
          filePath: tempFilePaths[0],
          header: {
            'content-type': 'multipart/form-data',
            'version': 'v2.0',
            'user-token': token
          },
          name: 'user_pic',
          success: rs => {
            let data = JSON.parse(rs.data)
            if(data.code == 1) {
              this.setData({
                cover: JSON.parse(rs.data).data.info
              })
            }
          }
        })
      }
    })
  },

  /**
   * 保存用户信息
   * @method: POST
   * @url: /api/5b266d4146e02.html
   *
   * @param nickname:String            昵称
   * @param realname:String            真实姓名
   * @param tel:String                 电话号码
   * @param user_work:String           公司名称
   * @param address:String             地址
   * @header[version]                  版本号
   * @header[access-token]             验签
   * @header[user-token]               验签
   */
  async saveInfo() {
    if (!this.data.ajaxData.nickname) {
      return wx.showToast({
        title: '填写您的昵称',
        icon: 'none'
      })
    }
    await wxShowLoading('保存中')
    let thisData = this.data
    let short_address = thisData.province[thisData.i1].name + thisData.city[thisData.i2].name + thisData.county[thisData.i3].name
    let data = await postData('/api/5b266d4146e02.html', { ...this.data.ajaxData, short_address})
    let info = await getData('/api/5b260352d8f9e.html', {})
    app.globalData.userInfo = info.info

    wx.hideLoading()
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()
    let { nickname, realname, tel, user_work, address, province_id, city_id, district_id, short_address } = app.globalData.userInfo
    this.setData({
      cover: app.globalData.userInfo.user_pic,
      ajaxData: { nickname, realname, tel, user_work, address, province_id, city_id, district_id, short_address }
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