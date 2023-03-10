const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var danhSachNguoiGui = [];
io.on("connection", (socket) => {
  danhSachNguoiGui.push({ id: socket.id, soLanNoiBay: 0 });
  socket.on("chat message", (msg) => {
    for (let i = 0; i < danhSachNguoiGui.length; i++) {
      if (danhSachNguoiGui[i].id == socket.id) {

        console.log("id: " + socket.id);


        let soLanNoiBayCuaNguoiGuiHienTai = danhSachNguoiGui[i].soLanNoiBay;
        if (soLanNoiBayCuaNguoiGuiHienTai < 3) {
          if (msg == "fuck you") {
            io.emit("chat message", "****");
            soLanNoiBayCuaNguoiGuiHienTai++;
            danhSachNguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiGuiHienTai;
          }
           else {
            var chuoiMoi = "";
            for (let i = 0; i < msg.length; i++) {
              if (msg[i] == 'y' && msg[i + 1] == 'e' && msg[i + 2] == 'u') {
                chuoiMoi += '❤';
                i += 2;
                
              } else {
                chuoiMoi += msg[i]
              }
    
            }
            console.log(chuoiMoi);
            io.emit("chat message", chuoiMoi);
          }
        } else {
          io.emit("chat message", {
            thongBao: "Tai khoan cua ban da bị khoa",
            idNguoiBiKhoa: socket.id,
          });
          danhSachNguoiGui[i].soLanNoiBay = 0;
        }

      
  

      }
    }

  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
