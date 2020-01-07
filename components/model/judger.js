import SkuCode from "./sku-code";
import {CELLSTATUS} from "../../core/emum";
import SkuPending from "./sku-pending";

class Judger {
  fenceGroup
  pathDictionary = []
  skuPending

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initPathDic()
    this._initSkuPending()
  }

  _initSkuPending() {
    const size = this.fenceGroup.fences.length
    this.skuPending = new SkuPending(size)
    const defaultSku = this.fenceGroup.getDefaultSku()
    defaultSku.specs.forEach((spec, i) => {
      const cell = this.fenceGroup.findCellByID(spec.value_id)
      this.fenceGroup.setCellStatusByID(cell.id, CELLSTATUS.SELECTED)
      this.skuPending.insertCell(cell, i)
    })
    this.judge(null, null, null, true)
  }

  isSkuIntact() {
    return this.skuPending.isIntact()
  }

  getFinalSku() {
    const code = this.skuPending.getSkuCode()
    const sku = this.fenceGroup.getFinalSku(code)

    return sku
  }

  _initPathDic() {
    this.fenceGroup.spu.sku_list.forEach(fence => {
      const skuCode = new SkuCode(fence.code)
      this.pathDictionary = this.pathDictionary.concat(skuCode.segments)
    })
  }

  judge(cell, x, y, init = false) {
    if (!init) {
      this._changeCurrentCellStatus(cell, x, y)
    }
    this.fenceGroup.each((cell, x, y) => {
      const potentialPath = this._findPotentialPath(cell, x, y)
      if (!potentialPath) return
      if (this._isInDictionary(potentialPath)) {
        this.fenceGroup.setCellStatusByXY(x, y, CELLSTATUS.WAITING)
      } else {
        this.fenceGroup.setCellStatusByXY(x, y, CELLSTATUS.FORBIDDEN)
      }
    })
  }

  _findPotentialPath(cell, x, y) {
    const {fences} = this.fenceGroup
    const pathArr = []
    for (let i = 0; i < fences.length; i++) {
      const selectedCell = this.skuPending.getSelectedCell(i)
      if (x === i) {
        if (selectedCell && selectedCell.id === cell.id) {
          return null
        }
        const code = this.fenceGroup.getCellCode(x,y)
        pathArr.push(code)
      } else {
        if (selectedCell) {
          const selectedCellCode = selectedCell.getCellCode()
          pathArr.push(selectedCellCode)
        }
      }
    }

    return pathArr.join('#')
  }

  getCurrentValues(){
    return this.skuPending.getCurrentSpecValues()
  }

  getMissingKeys(){
    return this.skuPending.getMissingSpecKeysIndex().map(index => {
      return this.fenceGroup.getFenceTitle(index)
    })
  }

  _isInDictionary(path) {
    return this.pathDictionary.includes(path)
  }

  _changeCurrentCellStatus(cell, x, y) {
    const currentCell = this.fenceGroup.fences[x].cells[y]
    if (cell.status === CELLSTATUS.WAITING) {
      this.fenceGroup.setCellStatusByXY(x, y, CELLSTATUS.SELECTED)
      this.skuPending.insertCell(currentCell, x)
    } else if (cell.status === CELLSTATUS.SELECTED) {
      this.fenceGroup.setCellStatusByXY(x, y, CELLSTATUS.WAITING)
      this.skuPending.removeCell(currentCell, x)
    }
  }
}

export default Judger