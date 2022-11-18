// Window
Window.getCurrentWindow = function() {
  const windowOptional = Window.focused()
  if (windowOptional !== undefined) {
    return windowOptional
  }
  return App.focused().mainWindow()
}

Window.setWindowCentral = (window) => {
  const screenSize = window.screen().flippedVisibleFrame()
  window.setTopLeft({
    x: (screenSize.width - window.size().width) / 2 + screenSize.x,
    y: (screenSize.height - window.size().height) / 2 + screenSize.y,
  })
}

Window.maximizeWindow = function(window) {
  const screenSize = window.screen().flippedVisibleFrame()
  log(window.size(), "window size")
  log(window.topLeft(), "window position")
  log(screenSize, "screen size")

  window.setTopLeft({
    x: screenSize.x,
    y: screenSize.y,
  })
  window.setSize({
    width: screenSize.width,
    height: screenSize.height,
  })
}

Window.halfLeftWindow =function(window) {
  const windowFrame = window.frame()
  const screenFrame = window.screen().flippedVisibleFrame()

  window.setTopLeft({
      x: screenFrame.x,
      y: windowFrame.y,
  });
  window.setSize({
      width: screenFrame.width / 2,
      height: windowFrame.height,
  });
}

Window.halfRightWindow =function(window) {
  const windowFrame = window.frame()
  const screenFrame = window.screen().flippedVisibleFrame()

  window.setTopLeft({
      x: screenFrame.x + screenFrame.width / 2,
      y: windowFrame.y,
  });
  window.setSize({
      width: screenFrame.width / 2,
      height: windowFrame.height,
  });
}


Window.halfUpWindow =function(window) {
  const windowFrame = window.frame()
  const screenFrame = window.screen().flippedVisibleFrame()

  window.setTopLeft({
      x: windowFrame.x,
      y: screenFrame.y,
  });
  window.setSize({
      width: windowFrame.width,
      height: screenFrame.height / 2,
  });
}

Window.halfDownWindow =function(window) {
  const windowFrame = window.frame()
  const screenFrame = window.screen().flippedVisibleFrame()

  window.setTopLeft({
      x: windowFrame.x,
      y: screenFrame.y + screenFrame.height/ 2,
  });
  window.setSize({
      width: windowFrame.width,
      height: screenFrame.height / 2,
  });
}

Window.smallerWindow = function(window) {
  const originFrame = window.frame()
  const frame = getSmallerFrame(window.frame())
  window.setFrame(frame)
  if (window.frame().width === originFrame.width || window.frame().height === originFrame.height) {
    window.setFrame(originFrame)
  }
}

Window.largerWindow = function(window) {
  const frame = getLargerFrame(window.frame())
  if (frame.width > window.screen().flippedVisibleFrame().width || frame.height > window.screen().flippedVisibleFrame().height) {
    Window.maximizeWindow(window)
  } else {
    window.setFrame(frame)
  }
}

Window.moveLeft = function(window) {
  window.setFrame({
    x: window.frame().x - 100,
    y: window.frame().y,
    width: window.frame().width,
    height: window.frame().height,
  })
}

Window.moveRight = function(window) {
  window.setFrame({
    x: window.frame().x + 100,
    y: window.frame().y,
    width: window.frame().width,
    height: window.frame().height,
  })
}

Window.moveUp = function(window) {
  window.setFrame({
    x: window.frame().x,
    y: window.frame().y - 100,
    width: window.frame().width,
    height: window.frame().height,
  })
}

Window.moveDown = function(window) {
  window.setFrame({
      x: window.frame().x,
      y: window.frame().y + 100,
      width: window.frame().width,
      height: window.frame().height,
  })
}

Window.moveCentral = function(window) {
  const frame = window.screen().flippedVisibleFrame()
  window.setTopLeft({
    x: (frame.width - window.size().width) / 2 + frame.x,
    y: (frame.height - window.size().height) / 2 + frame.y,
  })
}
