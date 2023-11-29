window.onload = function(){
    let url = window.location.href.split('?')
    msn = url[1].split('=')
    if(msn[1] == 'msn'){
        document.getElementById('msn').style.display = 'Block'
        OffMSn();
    }
}

function OffMSn(){
    setTimeout(() => {
        document.getElementById('msn').style.opacity = 1.5;
        document.getElementById('msn').style.transition = 'opacity 1.5s';

        document.getElementById('msn').style.display = 'none'
      }, "3500");
}