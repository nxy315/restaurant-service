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
    
    type: '',//1 编辑餐饮圈过来的

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
        data.address = range.name + city_range[range.id][0].name + district_range[city_range[range.id][0].id][0].name
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
   * 选择头像
   */
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
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
    //   nickname: '',
    //   realname: '',
    //   tel: '',
    //   user_work: '',
    //   address: '',
    //   province_id: null,
    //   city_id: null,
    //   district_id: null,
    //   short_address: ''
    if (!this.data.ajaxData.nickname) {
      return wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.realname) {
      return wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.tel) {
      return wx.showToast({
        title: '昵电话不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.user_work) {
      return wx.showToast({
        title: '公司名称不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.province_id) {
      return wx.showToast({
        title: '省份不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.city_id) {
      return wx.showToast({
        title: '市不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.district_id) {
      return wx.showToast({
        title: '区不能为空',
        icon: 'none'
      })
    } else if(!this.data.ajaxData.address) {
      return wx.showToast({
        title: '地址不能为空',
        icon: 'none'
      })
    }
    await wxShowLoading('保存中')
    let thisData = this.data
    let objectMultiArray = thisData.objectMultiArray
    let multiIndex = thisData.multiIndex
    let province_id, city_id, district_id;
    province_id = objectMultiArray[0][multiIndex[0]].id
    city_id = objectMultiArray[1][multiIndex[1]].id
    district_id = objectMultiArray[2][multiIndex[2]].id
    await postData('/api/5b266d4146e02.html', { ...this.data.ajaxData, address: this.data.address, province_id, city_id, district_id})
    let info = await getData('/api/5b260352d8f9e.html', {})
    app.globalData.userInfo = info.info

    wx.hideLoading()
    if(this.data.type == 1)  {
      app.globalData.changeAddress = true
    }
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type ? options.type : ''
    let { nickname, realname, tel, user_work, address, province_id, city_id, district_id, short_address } = app.globalData.userInfo
    
    this.setData({
      type,
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
    let { nickname, realname, tel, user_work, address, province_id, city_id, district_id, short_address } = app.globalData.userInfo
    let province_range = app.globalData.province_range
    let city_range = app.globalData.city_range
    let district_range = app.globalData.district_range
    let city = [], district = [], multiIndex = [0, 0, 0]

    city = (province_id && province_id != 0) ? city_range[province_id] : city_range[province_range[0].id]
    district = (dcity_id && city_id != 0) ? district_range[city_id] : district_range[city[0].id]

    for (let i = 0; i < province_range.length; i++) {
      if (province_id == province_range[i].id) {
        multiIndex[0] = i
        break
      } else {
        multiIndex[0] = 0
      }
    }

    for (let i = 0; i < city.length; i++) {
      if (city_id == city[i].id) {
        multiIndex[1] = i
        break
      } else {
        multiIndex[1] = 0
      }
    }

    for (let i = 0; i < district.length; i++) {
      if (district_id == district[i].id) {
        multiIndex[2] = i
        break
      } else {
        multiIndex[2] = 0
      }
    }

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