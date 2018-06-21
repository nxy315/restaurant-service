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
    } else {
      if (e.detail.scrollTop <= height) {
        that.setData({
          [data]: false
        })
      }
    }
  },

  
  globalData: {
    userInfo: null,
    imgUrl: 'http://www.youcanwuchu.com/Public/Uploads/',//图片拼接路径
  }
})