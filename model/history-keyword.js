class HistoryKeyword{
  static MAX_ITEM_COUNT = 20
  static KEY = 'keywords'
  keywords = []
  constructor(){
   this.keywords = this.getLocalKeywords()
  }
  save(keyword){
    if(!keyword) return
    if(this._isExisted(keyword)) return
    if (this.keywords.length > HistoryKeyword.MAX_ITEM_COUNT) {
      this.keywords.pop()
    }
    this.keywords.unshift(keyword)
    this._refreshLocalKeywords()
  }
  _isExisted(keyword){
    return this.keywords.find(k => k === keyword)
  }
  _refreshLocalKeywords(){
    wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
  }
  getLocalKeywords(){
    return wx.getStorageSync(HistoryKeyword.KEY) || []
  }
  clear(){
    this.keywords = []
    this._refreshLocalKeywords()
  }
}

export default HistoryKeyword