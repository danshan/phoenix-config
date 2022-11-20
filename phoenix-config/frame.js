// Frame
const getResizeFrame = function(frame, ratio) {
  return {
      x: Math.round(frame.x + frame.width / 2 * (1 - ratio)),
      y: Math.round(frame.y + frame.height / 2 * (1 - ratio)),
      width: Math.round(frame.width * ratio),
      height: Math.round(frame.height * ratio),
  }
}

const getSmallerFrame = function(frame) {
  return getResizeFrame(frame, 0.9)
}

const getLargerFrame = function(frame) {
  return getResizeFrame(frame, 1.1)
}
