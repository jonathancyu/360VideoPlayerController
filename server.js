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
