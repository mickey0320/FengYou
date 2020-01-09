import Tag from "../../model/tag";
import HistoryKeyword from "../../model/history-keyword";
import Search from "../../model/search";
const historyKeyword = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: Array,
    hotTags: Array,
    isSearch: false,
    items: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = historyKeyword.keywords
    const hotTags = await Tag.getSearchTags()
    this.setData({
      hotTags,
      historyTags,
    })
  },
  async onSearch(event){
    this.setData({
      isSearch: true,
    })
    const keyword = event.detail.value || event.detail.name
    if(!keyword.trim()){
      return
    }
    historyKeyword.save(keyword)
    this.setData({
      historyTags: historyKeyword.getLocalKeywords(),
    })
    const data = await Search.search(keyword)
    if(data.accumulator.length > 0){
      this.setData({
        items: data.accumulator,
      })
    }
  },
  onCancel(){
    this.setData({
      isSearch: false,
      items: [],
    })
  },
  onDeleteHistoryTag(){
    historyKeyword.clear()
    this.setData({
      historyTags: [],
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})