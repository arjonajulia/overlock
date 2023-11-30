window.onload = function(){
    let url = window.location.href.split('?')
    msn = url[1].split('=')
    if(msn[1] == 'msn'){
        document.getElementById('mensagem').innerHTML = "ORÇAMENTO ENVIADO COM SUCESSO !"
        document.getElementById('msn').style.display = 'Block'
        document.getElementById('msn').style.paddingTop = '20px';
        document.getElementById('msn').style.height = '150px';
        
        
        OffMSn();
    }
    if(msn[1] == 'msn-email'){
        document.getElementById('mensagem').innerHTML = "PROPOSTA FINALIZADA, CLIENTE E PROFISSIONAL NOTIFICADOS"
        document.getElementById('msn').style.display = 'Block'
        document.getElementById('msn').style.paddingTop = '10px';
        document.getElementById('msn').style.height = '180px';
        OffMSn();
    }
    if(msn[1] == 'msn-delete-perfil'){
        document.getElementById('mensagem').innerHTML = "USUÁRIO DELETADO COM SUCESSO !"
        document.getElementById('msn').style.display = 'Block'
        document.getElementById('msn').style.paddingTop = '20px';
        document.getElementById('msn').style.height = '150px';
        document.getElementById('msn').style.marginTop = '30px';
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