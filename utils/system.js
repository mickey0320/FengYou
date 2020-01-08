import {promisify} from "./util";

const getWindowSize = async function () {
  const res = await promisify(wx.getSystemInfo)()
  const {windowWidth, windowHeight, screenWidth, screenHeight} = res

  return {
    windowWidth,
    windowHeight,
    screenWidth,
    screenHeight,
  }
}

const getWindowHeight = async function () {
  const res = await getWindowSize()
  return (750 / res.windowWidth) * res.windowHeight
}

export {
  getWindowSize,
  getWindowHeight,
}