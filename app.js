//app.js
App({
  onLaunch: function () {

  },
  
  /**
   * 页面滚动(吸顶条固定)
   */
  scroll(e, height, data, that) {
    // console.log(e)
    let direction = e.detail.deltaY
    if (direction < 0) {
      if (e.detail.scrollTop >= height) {
        that.setData({
          [data]: true
        })
      }

      if (e.detail.scrollTop >= 1500) {
        that.setData({
          toTop: true
        })
      }
    } else {
      if (e.detail.scrollTop <= height) {
        that.setData({
          [data]: false
        })
      }

      if (e.detail.scrollTop <= 1500) {
        that.setData({
          toTop: false
        })
      }
    }

    
  },

  
  globalData: {
    province: null,//餐饮圈选择完城市后需要
    city: null,//餐饮圈选择完城市后需要
    area: null,//餐饮圈选择完城市后需要
    changeArea: false,//餐饮圈选择完城市后需要
    areaname: '',//餐饮圈选择完城市后需要
    userInfo: null,//用户信息
    changeAddress: false,//餐饮圈修改地址
    update: false,//发布圈子或者修改完之后，触发更新列表
    imgUrl: 'http://www.youcanwuchu.com/Public/Uploads/',//图片拼接路径
  }
})