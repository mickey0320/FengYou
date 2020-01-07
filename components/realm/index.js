import FenceGroup from "../model/fence-group";
import Judger from "../model/judger";
import Spu from "../../model/spu";
import Cart from "../../model/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String,
  },
  lifetimes: {
    // 不能保证数据已经传递进来
    attached() {
    },
    ready() {
    },
    created() {
    }
  },
  observers: {
    'spu': function (spu) {
      if (!spu) return
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
      this.triggerSpecChange()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    fences: [],
    judger: null,
    previewImg: null,
    title: '',
    price: '',
    discountPrice: '',
    stock: '',
    noSpec: false,
    isSkuIntact: false,
    currentValues: [],
    missingKeys: [],
    outStock: false,
    purchaseCount: Cart.SKU_MIN_COUNT,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec: true,
      })
      this.bindSkuData(spu.sku_list[0])
      this.bindOutStock(spu.sku_list[0].stock)
    },
    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)
      this.bindFenceGroupData(fenceGroup)
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
        this.bindOutStock(defaultSku.stock)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
    },
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      })
    },
    bindSpuData() {
      const {img: previewImg, title, price, discount_price: discountPrice} = this.spu
      this.setData({
        previewImg,
        title,
        price,
        discountPrice,
      })
    },
    bindSkuData(sku) {
      const {img: previewImg, title, price, discount_price: discountPrice, stock} = sku
      this.setData({
        previewImg,
        title,
        price,
        discountPrice,
        stock,
      })
    },
    bindTipData() {
      this.setData({
        isSkuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys(),
      })
    },
    bindOutStock(stock) {
      this.setData({
        outStock: stock < this.data.purchaseCount,
      })
    },
    triggerSpecChange() {
      const {currentValues, missingKeys, isSkuIntact} = this.data
      this.triggerEvent('specchange', {
        noSpec: Spu.isNoSpec(this.properties.spu),
        currentValues,
        missingKeys,
        isSkuIntact
      })
    },
    onCellTap(event) {
      const {cell, x, y} = event.detail
      const judger = this.data.judger
      judger.judge(cell, x, y)
      const isSkuIntact = judger.isSkuIntact()
      if (isSkuIntact) {
        const sku = judger.getFinalSku()
        this.bindSkuData(sku)
        this.bindOutStock(sku.stock)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
      this.triggerSpecChange()
    },
    onSelectCount(event) {
      this.data.purchaseCount = event.detail.count
      const {judger, purchaseCount} = this.data
      if (judger.isSkuIntact()) {
        const sku = judger.getFinalSku()
        this.bindOutStock(sku.stock)
      }
    }
  }
})
