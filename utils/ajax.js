import { wxLogin, wxGetUserInfo } from './wxApi.Pkg'
const regeneratorRuntime = require('../libs/runtime')

const requestUrl = 'https://api.youcanwuchu.com'
const version = 'v2.0'

/**
 * get请求
 */
let getData = async (url, params) => {
  let arr = []
  let paramsStr = ''
  let token = wx.getStorageSync('token')
  if(JSON.stringify(params) != '{}') {
    for(let item in params) {
      arr.push(`${item}=${params[item]}`)
    }
    paramsStr = '?' + arr.join('&')
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      url: requestUrl + url + paramsStr,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': version,
        'user-token': token
      },
      success: response => {
        if(response.data.code == 1) {
          resolve(response.data.data)
        } else if(response.data.code == -14) {
          reject(-14)
        } else {
          reject(response.data.code)
        }
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

let pay = async (oid) => {
  wx.showLoading({
    title: '',
  })
  let res = await wxLogin()
  let data = await getData('/api/5b33064ad13bd.html', { oid })
  let info = JSON.parse(data.info)
  wx.hideLoading()
  wx.requestPayment({
    timeStamp: info.timeStamp,
    nonceStr: info.nonceStr,
    package: info.package,
    signType: info.signType,
    paySign: info.paySign,
    success: res => {
      wx.showToast({
        title: '支付成功',
        icon: 'none',
        duration: 2000
      })
    },
    fail: err => {
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: () => {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/me/orders/orders?index=0',
        })
      }, 2000)
    }
  })
}

/**
 * post请求
 */
let postData = async (url, params) => {
  let token = wx.getStorageSync('token')

  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: requestUrl + url,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': version,
        'user-token': token
      },
      data: params,
      success: response => {
        if(response.data.code == 1) {
          resolve(response.data.data)
        } else if(response.data.code == -14) {
          reject(-14)
        } else {
          reject(response.data.code)
        }
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

/**
 * 更新token
 */
let login = async () => {
  let { code } = await wxLogin()
  let { signature, rawData, encryptedData, iv } = await wxGetUserInfo()
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url:`${requestUrl}/api/5b25e319e44c0.html`,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': version
      },
      data: {
        code, signature, rawData, encryptedData, iv
      },
      success: data => {
        let res = data.data
        if(res.code == 1) {
          wx.setStorageSync('token', data.data.data.user_token)
        }
      },
      complete: () => {
        resolve()
      }
    })
  }) 
}

/**
 * 收藏
 */
let collectStore = async id => {
  let data = await getData('/api/5b29c482c6ce3.html', { id: id })
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

module.exports = {
  login: login,
  pay: pay,
  getData: getData,
  postData: postData,
  collectStore: collectStore
}