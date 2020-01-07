import Cell from "./cell";

class Fence {
  specs = []
  cells = []
  id
  title

  constructor(specs) {
    this.specs = specs
    this.id = specs[0].key_id
    this.title = specs[0].key
  }

  init(){
    this._initCells()
  }

  _initCells(){
    this.specs.forEach(spec => {
      const isExist = this.cells.some(c => c.id === spec.value_id)
      if(!isExist){
        const cell = new Cell(spec)
        this.cells.push(cell)
      }
    })
  }
  setFenceSketch(skuList){
    this.cells.forEach(cell => {
      cell.skuImg =this._getSketchImg(skuList, cell.id)
    })
  }
  _getSketchImg(skuList, cellId){
    for (let i = 0; i < skuList.length; i++) {
      for (let j = 0; j < skuList[i].specs.length; j++) {
        if(cellId === skuList[i].specs[j].value_id) {
          return skuList[i].img
        }
      }
    }
  }
}

export default Fence