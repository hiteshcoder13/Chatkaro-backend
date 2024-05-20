const express = require('express')
const http  = require('http')
const Server  = require("socket.io").Server
const app = express()
const path  = require('path')
const PORT = process.env.PORT || 5000
const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})


const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../build");

app.use(express.static(buildPath));
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "build")));
res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})




io.on("connection" , (socket) => {
   console.log('We are connected')

   socket.on("chat" , chat => {
      io.emit('chat' , chat)
   } )

   socket.on('disconnect' , ()=> {
    console.log('disconnected')
   })
})



server.listen(PORT , () => console.log('Listening to port 5000'))