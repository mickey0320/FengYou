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
}

export default Fence