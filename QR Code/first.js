// accessing the divs through their id's
const QRinput = document.getElementById("qrInput");
const QRimage = document.getElementById("QRimgbox");
const Codeimage = document.getElementById("codeImg");

// adding functions
function generateQR (){
    if(QRinput.value.length > 0) {
    Codeimage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" +  QRinput.value;

    QRimgbox.classList.add("show-img");
    }
}