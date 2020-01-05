import {combination} from "../../utils/util";

class SkuCode {
  code
  segments = []
  spuId

  constructor(code) {
    this.code = code
    this.splitToSegments()
  }
  splitToSegments(){
    const spuAndSpec = this.code.split('$')
    this.spuId = spuAndSpec[0]
    const spuCodes = spuAndSpec[1].split('#')
    spuCodes.forEach((c, i) => {
      const newSegments = combination(spuCodes, i + 1).map(segs => segs.join('#'))
      this.segments = this.segments.concat(newSegments)
    })
  }
}

export default SkuCode