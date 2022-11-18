Phoenix.notify("Phoenix config loading")

// Preferences
Phoenix.set({
  daemon: false,
  openAtLogin: true,
})

let log = function (o, label = "obj: ") {
  Phoenix.log(`${(new Date()).toISOString()}:: ${label} => ${JSON.stringify(o)}`)
}

// Helpers
_.mixin({
  flatmap(list, iteratee, context) {
    return _.flatten(_.map(list, iteratee, context))
  }
})

// Globals
const HIDDEN_DOCK_MARGIN = 3
const INCREMENT = 0.05
const MASH_APP = ["alt"]
const MASH_RESIZE = ["alt", "shift"]
const MASH_MOVE = ["alt", "ctrl"]

// Relative Directions
const LEFT = 'left'
const RIGHT = 'right'
const CENTRE = 'centre'

// Cardinal Directions
const NW = 'nw'
const NE = 'ne'
const SE = 'se'
const SW = 'sw'

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

// Applications
App.focusOrStart = (name, orName) => {
  _.each(App.all(), a => console.log("found app: " + a.name()))

  const window = Window.getCurrentWindow()
  let app = App.launch(name)
  if (app === undefined && orName) {
    app = App.launch(orName)
  }
  if (app == undefined) {
    return
  }

  if (window !== undefined && app.mainWindow() != undefined && window.hash() === app.mainWindow().hash()) {
    return 
  }

  app.focus()
}

// Bindings
keys = []
const bindKey = (key, description, modifiers, fn) => keys.push(Key.on(key, modifiers, fn))
const bindApp = (key, description, appName, orAppName) => bindKey(key, description, MASH_APP, () => App.focusOrStart(appName, orAppName))
const bindResize = (key, description, fn) => bindKey(key, description, MASH_RESIZE, fn)

bindApp("`", "Launch iTerm", "iTerm")
bindApp(",", "Launch Craft", "Craft")
bindApp(".", "Launch Postman", "Postman")
bindApp("/", "Launch Finder", "Finder")
bindApp(";", "Launch Preview", "Preview")
bindApp("1", "Launch Microsoft Edge", "Microsoft Edge")
bindApp("2", "Launch Safari", "Safari")
bindApp("3", "Launch Feishu", "Lark")
bindApp("4", "Launch WeChat", "WeChat")
bindApp("5", "Launch WeCom", "企业微信")
bindApp("a", "Launch iStatistica", "iStatistica Pro")
bindApp("d", "Launch WebStorm", "WebStorm")
bindApp("e", "Launch Sublime Text", "Sublime Text")
bindApp("m", "Launch Spotify", "Spotify")
bindApp("n", "Launch Telegram", "Telegram")
bindApp("p", "Launch PyCharm", "PyCharm Community Edition")
bindApp("r", "Launch Reminders", "Reminders")
bindApp("s", "Launch IntelliJ IDEA", "IntelliJ IDEA")
bindApp("t", "Launch Tweetbot", "Tweetbot")
bindApp("v", "Launch Visual Studio Code", "Visual Studio Code")
bindApp("w", "Launch KeePassXC", "KeePassXC")


bindResize("m", "Maximize current window", () => Window.maximizeWindow(Window.getCurrentWindow()))
bindResize("-", "Set current window smaller", () => Window.smallerWindow(Window.getCurrentWindow()))
bindResize("=", "Set current window bigger", () => Window.largerWindow(Window.getCurrentWindow()))
