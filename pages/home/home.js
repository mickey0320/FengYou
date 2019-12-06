import Theme from "../../model/theme";
import Banner from "../../model/banner";
import Category from "../../model/category";
import Activity from "../../model/activity";
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        categories: [],
        activityD: null,
        themeE: null,
        themeESpuList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initData()
    },

    async initData() {
        const theme = new Theme()
        await theme.getThemes()
        const themeA = theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        const categories = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        const themeE = await theme.getHomeLocationE()
        const themeESpuList = await Theme.getThemeESpuList()
        console.log(themeESpuList);
        this.setData({
            themeA,
            bannerB,
            categories,
            activityD,
            themeE,
            themeESpuList: themeESpuList.spu_list,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})