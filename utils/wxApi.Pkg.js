
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
