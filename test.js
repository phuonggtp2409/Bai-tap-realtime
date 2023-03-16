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
          } else {
            var chuoiMoi = "";
            for (let i = 0; i < msg.length; i++) {
              if (msg[i] == "y" && msg[i + 1] == "e" && msg[i + 2] == "u") {
                chuoiMoi += "<3";
                i += 2;
              } else {
                chuoiMoi += msg[i];
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

        // var resXinChao = ["Chao ban, toi co the giup gi cho ban", "Chao ban nhe", "Chao buoi sang ban"]
        // if (msg.includes("xin chao")){
        // const random = Math.floor(Math.random() * resXinChao.length)
        // console.log(random, resXinChao[random]);
        // io.emit("chat message", resXinChao[random]);
        // }
      }
    }
    const mangCauTraLoiChoYDinhChaoHoi = [
      "Chào bạn",
      "Chào buổi sáng bạn",
      "Chào",
    ];
    const mangCauTraLoiChoYDinhThoiGian = [
      "Bây giờ là 21:40",
      "Bạn muốn hỏi ngày âm lịch hay dương lịch",
    ];

    // teencode
    const mangCauHoiYDinhChaoHoi = ["chào", "Chao", "ck"];
    var cauHoi = "ck bạn";
    var laCauHoiChaoHoi = false;
    for (let i = 0; i < mangCauHoiYDinhChaoHoi.length; i++) {
      if (cauHoi.toLowerCase().includes(mangCauHoiYDinhChaoHoi[i])) {
        laCauHoiChaoHoi = true;
        break;
      }
    }
    if (!laCauHoiChaoHoi) {
      console.log("bot tra loi: Bạn nói gì tôi không hiểu");
      io.emit("chat message", "bot tra loi: Bạn nói gì tôi không hiểu");
    } else {
      const viTriNgauNhien = Math.floor(
        Math.random() * mangCauTraLoiChoYDinhChaoHoi.length
      );
      io.emit("chat message","bot tra loi:" + mangCauTraLoiChoYDinhChaoHoi[viTriNgauNhien]
      );
    }

    //   Thời tiết
    const mangCauTraLoiChoYDinhThoiTiet = ["thời tiết hà nội hiện tại đang là 20 độ C", "Thời tiết hôm nay nắng đẹp lắm"]
    var cauHoi = "Thời tiết hôm nay thế nào"
    if (cauHoi.toLowerCase().includes("thời tiết")) {
      const random = Math.floor(Math.random() * mangCauTraLoiChoYDinhThoiTiet.length
      );
      console.log(mangCauTraLoiChoYDinhThoiTiet[random]);
      io.emit ("chat message","bot tra loi:" + mangCauTraLoiChoYDinhThoiTiet[random] )
    }

    const cauHoi1 = "xin chào";
    var mangSoNguyenCauHoi1 = [];

    for (let i = 0; i < cauHoi1.length; i++) {
      mangSoNguyenCauHoi1.push(cauHoi1[i].charCodeAt(0));
    }

    const cauHoi2 = "xin cháo";
    var mangSoNguyenCauHoi2 = [];
    for (let i = 0; i < cauHoi2.length; i++) {
      mangSoNguyenCauHoi2.push(cauHoi2[i].charCodeAt(0));
    }

    console.log(mangSoNguyenCauHoi1);
    console.log(mangSoNguyenCauHoi2);

    function dotp(x, y) {
      function dotp_sum(a, b) {
        return a + b;
      }
      function dotp_times(a, i) {
        return x[i] * y[i];
      }
      return x.map(dotp_times).reduce(dotp_sum, 0);
    }

    function cosineSimilarity(A, B) {
      var similarity =
        dotp(A, B) / (Math.sqrt(dotp(A, A)) * Math.sqrt(dotp(B, B)));
      return similarity;
    }

    var doTuongDong = cosineSimilarity(
      mangSoNguyenCauHoi1,
      mangSoNguyenCauHoi2
    );

    console.log("Diem do tuong dong cua 2 cau hoi: " + doTuongDong);

    // if (cauHoi.includes ("thời tiết")){
    //   const random = Math.floor(Math.random() * mangCauTraLoiChoYDinhThoiTiet.length)
    //   console.log (random, mangCauTraLoiChoYDinhThoiTiet[random])
    // }

    // "Anh chào bạn ta" => "Anh chao ban ta"
    // var tinNhan = "Anh chào bạn ta"
    // var tinNhanMoi = ""
    // for (let i = 0; i < tinNhan.length; i++){
    //   if (tinNhan[i] == "à" || tinNhan[i] == "á" || tinNhan[i] == "ả" || tinNhan[i] == "ã" || tinNhan[i] == "ạ"){
    //     tinNhanMoi += "a";
    //   } else {
    //     tinNhanMoi += tinNhan[i]
    //   }
    // }
    // console.log(tinNhanMoi)

    // Cách 1
    // const cauHoi1 = "aba"
    // var mangSoNguyenCauHoi1 = []
    // for (let i=0; i< cauHoi1.length; i++) {
    //   switch (cauHoi1[i]) {
    //     case 'a':
    //       mangSoNguyenCauHoi1.push(1)
    //       break
    //     case 'b':
    //       mangSoNguyenCauHoi1.push(2)
    //       break
    //     default:
    //       mangSoNguyenCauHoi1.push(0)
    //   }
    // }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
