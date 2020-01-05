class Matrix{
  m
  constructor(m){
    this.m = m
  }
  get RowCount(){
    return this.m.length
  }
  get ColumnCount(){
    return this.m[0].length
  }
  // 对矩阵进行 转置
  transpose(){
    const ret = []
    const {RowCount: rowCount,ColumnCount: columnCount} = this
    for(let j = 0; j < columnCount; j++){
      ret[j] = []
      for(let i = 0; i < rowCount; i++){
        ret[j][i] = this.m[i][j]
      }
    }
    return ret
  }
}

export default Matrix