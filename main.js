const { app, BrowserWindow } = require('electron')
const path = require('path') //Node.js

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// SERVER PORTION
const Net = require('net')
const port = 8052

const server = new Net.Server()
server.listen(port, function() {
  console.log(`Listening at port ${port}`)
})

server.on('connection', function(socket) {
  console.log('Established new connection')
  socket.write('hello client')
  socket.on('data', function(chunk) {
    console.log(`Received from client: ${chunk.toString()}`)
  })
  socket.on('error', function(err) {
    console.log(`Error: ${err}`)
  })
})
