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
        let soLanNoiBayCuaNguoiGuiHienTai = danhSachNguoiGui[i].soLanNoiBay;
        if (soLanNoiBayCuaNguoiGuiHienTai < 3) {
          if (msg == "fuck you") {
            io.emit("chat message", "****");
            soLanNoiBayCuaNguoiGuiHienTai++;
            danhSachNguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiGuiHienTai;
          } else {
            io.emit("chat message", msg);
          }
        } else {
          io.emit("chat message", {
            thongBao: "Tai khoan cua ban da bị khoa",
            idNguoiBiKhoa: socket.id,
          });
          danhSachNguoiGui[i].soLanNoiBay = 0;
        }
      }
      // var msg = "anh yeu em"
      var chuoiMoi = "";
      for (let i = 0; i < msg.length - 1; i++) {
        if (msg[i] == "y" && msg[i + 1] == "e" && msg[i + 2] == "u") {
          // var traiTim = msg[i]+msg[i+1]+msg[i+2]
          chuoiMoi += "<3";
        }
        var traiTim = "<3";
        for (let i = 0; i < traiTim; i++) {
          chuoiMoi += msg[i];
        }
        for (let j = traiTim; j < msg.length - 1; j++) {
          chuoiMoi += msg[j];
        }
      }
    }
    io.emit("chat message", chuoiMoi);

    // kí tự dảo ngược
    // var reverse = " "
    // for (let i= msg.length - 1; i >= 0; i--){
    // reverse += msg[i]
    // }io.emit('chat message',reverse)

    // var veTrai = ""
    // var vePhai = ""
    // if (msg.length % 2 == 0){
    //   for (let i = 0; i < (msg.length/2); i++){
    //     veTrai += msg[i]
    //   }
    //   for (let i = msg.length-1; i >= (msg.length/2); i--){
    //     vePhai += msg[i]
    //   }
    //     io.emit('chat message', vePhai + veTrai)
    //   } else {
    //   let center = (msg.length-1)/2
    //   for (let i = 0; i < center ; i++){
    //     veTrai += msg[i]
    //   }
    //   for (let i = msg.length-1; i > center; i--){
    //     vePhai += msg[i]
    //   }
    //     io.emit('chat message', vePhai + msg[center] + veTrai)
    // }
  });

  // var tinNhan = "anh khong yeu"
  // var chuoiMoi = ""

  // if (tinNhan.length % 2 == 0){
  //   for (let i= tinNhan.length-1; i >= tinNhan.length/2; i--) {
  //     chuoiMoi += tinNhan[i]
  //   }

  //   for (let j=0; j < tinNhan.length/2; j++) {
  //     chuoiMoi += tinNhan[j]
  //   }
  // } else {
  //   let viTriTrungTam = (tinNhan.length-1)/2
  //   for (let i= tinNhan.length-1; i >= viTriTrungTam; i--) {
  //     chuoiMoi += tinNhan[i]
  //   }
  //   for (let j=0; j < viTriTrungTam; j++) {
  //     chuoiMoi += tinNhan[j]
  //   }
  // }

  // console.log(chuoiMoi)

  // var dem = 0
  // socket.on('chat message', msg => {
  //     if (msg == 'fuck you') {
  //       if (dem > 2) {
  //         io.emit ('chat message', 'tai khoan cua ban bị khoa')
  //       } else {
  //       io.emit('chat message', '*****')
  //       dem ++
  //     }
  //     }
  //   });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
