import Matrix from "./matrix";
import Fence from "./fence";

class FenceGroup {
  spu
  skuList
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list

  }

  initFences() {
    const matrix = this._createMatrix()
    const AT = matrix.transpose()
    AT.forEach((specs) => {
      const fence = this._createFence(specs)
      fence.init()
      if(this._hasSketchFence() && this._isSketchFence(fence.id)){
        fence.setFenceSketch(this.skuList)
      }
      this.fences.push(fence)
    })
  }

  each(cb) {
    const {fences} = this
    for (let i = 0; i < fences.length; i++) {
      for (let j = 0; j < fences[i].cells.length; j++) {
        cb(fences[i].cells[j], i, j)
      }
    }
  }

  getFenceTitle(index){
    return this.fences[index].title
  }

  getDefaultSku() {
    const defaultSku = this.spu.default_sku_id
    if (!defaultSku) {
      return null
    }
    return this.skuList.find(sku => sku.id == defaultSku)
  }

  setCellStatusByID(cellId, status) {
    this.each((cell, i, j) => {
      if (cell.id === cellId) {
        cell.status = status
      }
    })
  }

  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status
  }

  getFinalSku(code){
    const spuId = this.spu.id
    return this.skuList.find(sku => sku.code === `${spuId}$${code}`)
  }

  findCellByID(cellId) {
    let ret = null
    this.each(cell => {
      if(cell.id === cellId) {
        ret = cell
      }
    })
    return ret
  }

  getCellCode(x,y){
    return this.fences[x].cells[y].getCellCode()
  }
  _hasSketchFence(){
    return this.spu.sketch_spec_id ? true : false
  }
  _isSketchFence(fenceId){
   return this.spu.sketch_spec_id === fenceId
  }
  _createFence(specs) {
    return new Fence(specs)
  }

  _createMatrix() {
    const m = []
    this.skuList.forEach((sku) => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }
}

export default FenceGroup