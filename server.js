const app=require('express')();//引入express库
const http=require('http').Server(app).listen(8080,function () {
    console.log('listening on *;8080')

});//将express库注册到http中
//引入socket
var usocket=[];//全局变量
//当访问根目录时，返回hello world
app.get('/',function (req,res) {
    res.sendFile(__dirname + '/index.html');
})
const io=require('socket.io')(http);
io.on('connection', function(socket){
    console.log('a user connected');
    //监听join事件
    socket.on('join',function (name) {
        usocket[name]=socket;
        io.emit("join",name)//服务器通过广播将新用户名发送给全体群聊成员
    })
    socket.on("message",function (msg) {
        io.emit("message",msg)//将消息广播出去
    })
});