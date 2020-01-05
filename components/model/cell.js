import {CELLSTATUS} from "../../core/emum";

class Cell {
  title
  id
  status = CELLSTATUS.WAITING
  spec

  constructor(spec) {
    this.id = spec.value_id
    this.title = spec.value
    this.spec = spec
  }
  changeCellStatus(status){
    this.status = status
  }

  getCellCode(){
    return `${this.spec.key_id}-${this.spec.value_id}`
  }
}

export default Cell