// components/hot-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object,
    },

    observers: {
        banner(banner) {
            if (!banner || !banner.items.length) return
            const { items } = banner
            const leftItem = items.find(item => item.name === 'left')
            const rightTopItem = items.find(item => item.name === 'right-top')
            const rightBottomItem = items.find(item => item.name === 'right-bottom')
            this.setData({
                leftItem,
                rightTopItem,
                rightBottomItem,
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
