import Spu from "../../model/spu";
import SaleExplain from "../../model/sale-explain";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: Object,
    realmVisible: false,
    spec: Object,
    explain: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { pid } = options
    const spu = await Spu.getDetail(pid)
    const explain = await SaleExplain.getFixed()
    this.setData({
      spu,
      explain,
    })
  },
  onGoHome(){
    wx.switchTab({
     url: '/pages/home/home',
   })
  },
  onGoToCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  onAddToCart(event){
    this.setData({
      realmVisible: true,
      orderWay: event.detail.orderWay,
    })
  },
  onBuy(event){
    this.setData({
      realmVisible: true,
      orderWay: event.detail.orderWay,
    })
  },
  onSpecChange(event){
    this.setData({
      spec: event.detail,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})