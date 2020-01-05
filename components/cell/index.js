// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number,
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
    onCellTap(event){
      const { cell, x, y} = this.properties
      this.triggerEvent('celltap',{
        cell,
        x,
        y,
      }, {
        bubbles: true,
        composed: true,
      })
    }
  }
})
