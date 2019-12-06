import {Http} from '../utils/http'

export default class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    async getThemes() {
        const { locationA, locationE,locationF,locationG } = Theme
        const names = `${locationA},${locationE},${locationF},${locationG}`
        this.themes = await Http.request({
            url: 'theme/by/names',
            data: {
                names,
            }
        })

    }

    getHomeLocationA(){
        return this.themes.find(t => t.name === Theme.locationA)
    }

    getHomeLocationE(){
        return this.themes.find(t => t.name === Theme.locationE)
    }

    static getThemeESpuList(){
        return Theme.getThemeSpuListByName(Theme.locationE)
    }

    static getThemeSpuListByName(){
        return Http.request({
            url: `theme/name/${Theme.locationE}/with_spu`
        })
    }
}
