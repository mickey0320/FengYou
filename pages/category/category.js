// pages/category/category.js
import {getWindowHeight, getWindowSize} from "../../utils/system";
import Categories from "../../model/categories";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: null,
    segmentHeight: Number,
    currentBannerImg: String,
    roots: Array,
    currentSubs: Array,
    defaultRootId: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setSegmentHeight()
    this.initSegmentData()
  },

  async setSegmentHeight() {
    const h = await getWindowHeight()
    this.setData({
      segmentHeight: h - 60 - 20 - 2
    })
  },

  async initSegmentData() {
    const categories = new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.roots
    const defaultRoot = this._getDefaultRoot(roots)
    const currentSubs = categories.getSubsByRootId(defaultRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img,
    })
  },

  _getDefaultRoot(roots) {
    let defaultRoot = roots.find(root => root.id === this.data.defaultRootId)
    if(!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  onGotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onChangeRoot(event){
    const rootId = +event.detail.activeKey
    const root = this.data.roots.find(root => root.id === rootId)
    const currentSubs = this.data.categories.getSubsByRootId(rootId)
    this.setData({
      currentSubs,
      currentBannerImg: root.img,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})