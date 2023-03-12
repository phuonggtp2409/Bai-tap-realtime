// Chat bot tu dong cac cau tra loi voi "Xin chao"

var resXinChao = ["Chao ban, toi co the giup gi cho ban", "Chao ban nhe", "Chao buoi sang ban"]
if (msg.includes("xin chao")){
const random = Math.floor(Math.random() * resXinChao.length)
console.log(random, resXinChao[random])};
io.emit("chat message", resXinChao[random]);
