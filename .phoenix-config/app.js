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
