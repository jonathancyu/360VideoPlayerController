const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path") //Node.js

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile("index.html")
}

app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

// SETUP SERVER

const Net = require("net")
const port = 8052

const server = new Net.Server()
server.listen(port, function() {
  console.log(`Listening at port ${port}`)
})

server.on("connection", function(socket) {
  console.log("Established new connection")
  socket.write("hello client")
  socket.on("data", function(chunk) {
    console.log(`Received from client: ${chunk.toString()}`)
  })
  socket.on("error", function(err) {
    console.log(`Error: ${err}`)
  })
})

//SET UP BUTTONS
ipcMain.handle("set-new-vid-id", function(event, arg) {
  socket.write(`changeVideo ${arg}`)
})
ipcMain.handle("set-new-subject-id", function(event, arg) {
  socket.write(`changeSubject ${arg}`)
})

ipcMain.handle("play", () => {
  socket.write("play")
})

ipcMain.handle("stop", () => {
  socket.write("stop")
})
