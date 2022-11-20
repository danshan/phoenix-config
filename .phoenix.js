Phoenix.notify("Phoenix config loading")

require('phoenix-config/app.js')
require('phoenix-config/frame.js')
require('phoenix-config/window.js')
require('phoenix-config/space.js')

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
const MASH_APP = ["alt"]
const MASH_RESIZE = ["alt", "shift"]
const MASH_MOVE = ["alt", "ctrl"]

// Bindings
keys = []
const bindKey = (key, description, modifiers, fn) => keys.push(Key.on(key, modifiers, fn))
const bindApp = (key, description, appName, orAppName) => bindKey(key, description, MASH_APP, () => App.focusOrStart(appName, orAppName))
const bindResize = (key, description, fn) => bindKey(key, description, MASH_RESIZE, fn)
const bindMove = (key, description, fn) => bindKey(key, description, MASH_MOVE, fn)

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
bindResize("up", "Set current window helf up", () => Window.halfUpWindow(Window.getCurrentWindow()))
bindResize("down", "Set current window helf down", () => Window.halfDownWindow(Window.getCurrentWindow()))
bindResize("left", "Set current window helf left", () => Window.halfLeftWindow(Window.getCurrentWindow()))
bindResize("right", "Set current window helf right", () => Window.halfRightWindow(Window.getCurrentWindow()))

bindMove("k", "Move window up", () => Window.moveUp(Window.getCurrentWindow()))
bindMove("j", "Move window down", () => Window.moveDown(Window.getCurrentWindow()))
bindMove("h", "Move window left", () => Window.moveLeft(Window.getCurrentWindow()))
bindMove("l", "Move window right", () => Window.moveRight(Window.getCurrentWindow()))
bindMove("m", "Move window central", () => Window.moveCentral(Window.getCurrentWindow()))
bindMove("i", "Move window to next space", () => Window.moveToSpace(Window.getCurrentWindow(), (space) => space.next()))
bindMove("o", "Move window to previous space", () => Window.moveToSpace(Window.getCurrentWindow(), (space) => space.previous()))
bindMove("n", "Move window to next screen", () => Window.moveWindowToScreen(Window.getCurrentWindow(), (window) => window.screen().next()))
bindMove("p", "Move window to previous screen", () => Window.moveWindowToScreen(Window.getCurrentWindow(), (window) => window.screen().previous()))
