// components/tab-bar/index.js
import {ShoppingWay} from "../../core/emum";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onGoHome(event){
      this.triggerEvent('gohome',{
      })
    },
    onGoToCart(event){
      this.triggerEvent('gotocart',{

      })
    },
    onAddToCart(event){
      this.triggerEvent('addtocart',{
        orderWay: ShoppingWay.CART,
      })
    },
    onBuy(event){
      this.triggerEvent('buy',{
        orderWay: ShoppingWay.BUY,
      })
    },
  }
})
