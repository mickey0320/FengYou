import Pager from '../utils/pager'

export default class SpuPager{
    static pager = new Pager({
        url: `spu/latest`,
    },0,4)
    static getLatest(){
        return SpuPager.pager.getNextPageData()
    }
}