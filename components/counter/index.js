import Cart from "../../model/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type: Number,
      value: Cart.SKU_MIN_COUNT,
    },
    min:{
      type: Number,
      value: Cart.SKU_MIN_COUNT,
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onOverStep(event){
      const outType = event.detail.type
      if (outType === 'overflow_max'){
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: '超出最大购买数量',
        })
      }
      if(outType === 'overflow_min'){
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: `最少需要购买${Cart.SKU_MIN_COUNT}件哦`
        })
      }
    }
  }
})
