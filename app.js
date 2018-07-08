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
    province: null,
    city: null,
    area: null,
    changeArea: false,
    areaname: '',
    userInfo: null,
    imgUrl: 'http://www.youcanwuchu.com/Public/Uploads/',//图片拼接路径
  }
})