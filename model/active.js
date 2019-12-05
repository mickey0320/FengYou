import {Http} from "../utils/http";

export default class Activity{
    static locationD = 'a-2'
    static async getLocationD(){
        return Http.request({
            url: `activity/name/${Activity.locationD}`,
        })
    }
}