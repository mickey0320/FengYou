import Cell from "./cell";
import {CELLSTATUS} from "../../core/emum";

class SkuPending {
  pending = []
  size

  constructor(size) {
    this.size = size
  }

  // init(sku){
  //  sku.specs.forEach((spec,i) => {
  //    this.insertCell(new Cell(spec), i)
  //  })
  // }
  isIntact(){
    for(let i = 0; i < this.pending.length; i++){
      if(this.isEmpty(i)){
        return false
      }
    }
    return true
  }
  isEmpty(i){
    return !this.pending[i]
  }
  getSkuCode(){
    let ret = []
    this.pending.forEach(cell => {
     if(!cell) return
      ret.push(cell.getCellCode())
    })
    return ret.join('#')
  }
  getCurrentSpecValues(){
    return this.pending.map(cell => {
      if(!cell) return null
      return cell.title
    })
  }
  getMissingSpecKeysIndex(){
    const indexArr = []
    for (let i = 0; i < this.pending.length; i++) {
      if(this.pending[i] == null){
        indexArr.push(i)
      }
    }
    return indexArr
  }
  insertCell(cell, x) {
    this.pending[x] = cell
  }

  removeCell(cell, x){
   this.pending[x] = null
  }

  getSelectedCell(x){
    return this.pending[x]
  }
}

export default SkuPending