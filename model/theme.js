import {Http} from '../utils/http'

export default class Theme{
    static async getHomeLocationA(){
        return await Http.request({
            url: 'theme/by/names',
            data: {
                names: 't-1',
            }
        })
    }
}
