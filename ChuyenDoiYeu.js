// Chuyển đổi "yeu" => "<3"
var msg = "emmm yeu!";
var chuoiMoi = "";
   for (let i=0; i<msg.length; i++){
    
     if (msg[i] == 'y' && msg[i+1] == 'e' && msg[i+2] == 'u'){
     chuoiMoi += '<3'; 
       i += 2;
     } else {
      chuoiMoi += msg[i]
     }}
 console.log(chuoiMoi)