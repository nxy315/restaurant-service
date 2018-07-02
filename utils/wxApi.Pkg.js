
/**
 * 微信登录
 */
export function wxLogin() {
    return new Promise((resolve) => {
        wx.login({
            success: res => {
                if(res.code) {
                    resolve(res)
                }
            }
        })
    })
}

/**
 * 获取用户信息
 */
export function wxGetUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: true,
            success: res => {
                resolve(res)
            },
            fail: e => {
                reject(e)
            }
        })
    })
}

/**
 * 设置数据
 */
export function wxSetData(_this, obj) {
    return new Promise(resolve => {
        _this.setData(obj, () => {
            resolve()
        })
    })
}

/**
 * 去设置
 */
export function wxOpenSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      complete: () => {
        resolve()
      }
    })
  })
}

/**
 * 获取权限
 */
export function wxGetSetting(scope) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting[scope]) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

/**
 * 加载loading
 */
export function wxShowLoading(title) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title,
      success: res => {
        resolve()
      }
    })
  })
}

/**
 * 获取坐标
 */
export function wxGetLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success: res => {
        resolve(res)
      },
    })
  })
}

/**
 * 预览图片
 */
export function wxPreview(i, urls) {
  return new Promise((resolve, reject) => {
    wx.previewImage({
      current: urls[i],
      urls,
      success: () => {
        resolve()
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

