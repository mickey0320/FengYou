import {Http} from '../utils/http'

export default class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    async getThemes() {
        const {locationA, locationE, locationF, locationH} = Theme
        const names = `${locationA},${locationE},${locationF},${locationH}`
        this.themes = await Http.request({
            url: 'theme/by/names',
            data: {
                names,
            }
        })

    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }
    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }

    static getThemeESpuList() {
        return Theme.getThemeSpuListByName(Theme.locationE)
    }

    static getThemeSpuListByName() {
        return Http.request({
            url: `theme/name/${Theme.locationE}/with_spu`
        })
    }
}
