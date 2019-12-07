import { Http } from './http'

export default class Pager {
    start
    count
    locked = false
    reqOption
    rawUrl
    hasNextPageData = true
    accumulator = []

    // start表示请求第几页,count表示一次数据返回多少条
    constructor(reqOption, start = 0, count = 10) {
        this.reqOption = reqOption
        this.rawUrl = reqOption.url
        this.start = start
        this.count = count
    }

    async getNextPageData() {
        if (!this._getLock()) {
            return
        }
        if(!this.hasNextPageData){
           return
        }

        const data = await this._requestData()
        this._releaseLock()

        return data
    }

    async _requestData() {
        // if (!this._hasNextPageData()) {
        //     return {
        //         empty: true,
        //         data: [],
        //         hasMoreData: false,
        //         accumulator:[],
        //     }
        // }
        this.reqOption.url = this._handleUrl()
        const result = await Http.request(this.reqOption)
        if (!result) {
            return null
        }
        // 处理服务端没数据的情况
        if (result.total === 0) {
            return {
                empty: true,
                data: [],
                hasNextPageData: false,
                accumulator: [],
            }
        }
        this.hasNextPageData = this._hasNextPageData(result.page, result.total_page)
        if(this.hasNextPageData){
            this.start += this.count
        }
        this.accumulator = this.accumulator.concat(result.items)
        return {
            empty: false,
            data: result.items,
            hasNextPageData: this.hasNextPageData,
            accumulator: this.accumulator,
        }
    }

    _handleUrl() {
        const {start, count, rawUrl} = this
        let url = rawUrl
        const queryString = `start=${start}&count=${count}`
        if (url.includes('?')) {
            url = `${url}&${queryString}`
        } else {
            url = `${url}?${queryString}`
        }

        return url
    }

    _getLock() {
        if (this.locked) {
            return false
        }
        this.locked = true
        return true
    }

    _releaseLock() {
        this.locked = false
    }


    _hasNextPageData(pageIndex, totalPage) {
        return pageIndex < totalPage - 1
    }
}