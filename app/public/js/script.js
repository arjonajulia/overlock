function login() {

    if(document.getElementById("login_x")) {

        document.getElementById("login_x").id = "login"

    } else if (document.getElementById("login")) {

        document.getElementById("login").id = "login_x"

    }
    
}

function menu() {
    if(document.getElementById("menuA")) {
        
        document.getElementById('menuA').id = 'menuAx'
        document.getElementById('menuF').id = 'menuFx'

        document.getElementById('menu').id = 'menu_x'

    } else if (document.getElementById("menuFx")) {

        document.getElementById('menuAx').id = 'menuA'
        document.getElementById('menuFx').id = 'menuF'
        document.getElementById('menu_x').id = 'menu'
    }
}

/*
const ejsLint = require('ejs-lint');

function notify(titulo, texto, tipo, posicao) {
    new Notify({
        status: tipo,
        title: titulo,
        text: texto,
        effect: 'fade',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position:posicao 
    })
}

let myNotify

function pushNotify() {
  myNotify = new Notify({
    status: 'success',
    title: 'Notify Title',
    text: 'notify text',
    effect: 'slide',
    type: 3
  })
}

function close() {
  myNotify.close()
}
*/

function validacaoProficional() {

    let nome = window.document.getElementById('name').value
    let dataNaci = window.document.getElementById('dataNaci').value
    let tel = window.document.getElementById('tel').value
    let endereco = window.document.getElementById('end').value
    let city = window.document.getElementById('city').value
    let nul = window.document.getElementById('nul').value
    let cep = window.document.getElementById('cep').value
    let cpf = window.document.getElementById('cpf').value
    let email = window.document.getElementById('email').value
    let senha = window.document.getElementById('senha').value
    let consenha = window.document.getElementById('consenha').value

    let box = window.document.getElementById('checkbox').value

    let hoje = new Date()
    let dataFinal = new Date(dataNaci)
    let media = hoje - dataFinal
    let convercao = 365 * 24 * 60 * 60;
    let final = media / convercao
    final.toFixed(2)
    let resutado = final.toFixed(2).slice(0,2)

    if( nome == "" || dataNaci == "" || tel == "" || endereco == "" || city == "" || nul == "" || cep == "" || cpf =="" || email === "" || senha == "" || consenha == "" ){
        if ( nome == "" ){
            alert(" Nome nao preenchido completamente ")
        } else if ( dataNaci == "" ){
            alert(" data nao preenchido completamente  ")
        } else if ( tel == "" ){
            alert(" telefone nao preenchido completamente  ")
        } else if ( endereco == "" ){
            alert(" endereco nao preenchido completamente  ")
        } else if ( city == "" ){
            alert(" cidade nao preenchido completamente  ")
        } else if ( nul == "" ){
            alert(" numero nao preenchido completamente  ")
        } else if ( cep == "" ){
            alert(" cep nao preenchido completamente  ")
        } else if ( cpf == "" ){
            alert(" cpf nao preenchido completamente  ")
        } else if ( email === "" ){
            alert(" email nao preenchido completamente  ")
        } else if ( senha == "" ){
            alert(" senha nao preenchido completamente  ")
        } else if ( consenha == "" ){
            alert(" confirme a senha nao preenchido completamente  ")
        }
    } else if( senha === consenha ){

        if( resutado >= 18 ){

            window.location = "/Cadastro_Proficional+18"
    
        } else if( resutado < 18 ){
    
            window.location ="/Cadastro_proficional-18"
    
        }

    } else if( senha != consenha ){

        alert("Senhas nao exatas")
    
    }
        
}
function validacaoCliente() {

    let nome = window.document.getElementById('name').value
    let dataNaci = window.document.getElementById('dataNaci').value
    let tel = window.document.getElementById('tel').value
    let endereco = window.document.getElementById('end').value
    let city = window.document.getElementById('city').value
    let nul = window.document.getElementById('nul').value
    let cep = window.document.getElementById('cep').value
    let cpf = window.document.getElementById('cpf').value
    let email = window.document.getElementById('email').value
    let senha = window.document.getElementById('senha').value
    let consenha = window.document.getElementById('cconsenha').value

    let box = window.document.getElementById('checkbox').value

    let hoje = new Date()
    let dataFinal = new Date(dataNaci)
    let media = hoje - dataFinal
    let convercao = 365 * 24 * 60 * 60;
    let final = media / convercao
    final.toFixed(2)
    let resutado = final.toFixed(2).slice(0,2)

    if( nome == "" || dataNaci == "" || tel == "" || endereco == "" || city == "" || nul == "" || cep == "" || cpf =="" || email === "" || senha == "" || consenha == "" ){
        if ( nome == "" ){
            alert(" Nome nao preenchido completamente ")
        } else if ( dataNaci == "" ){
            alert(" data nao preenchido completamente  ")
        } else if ( tel == "" ){
            alert(" telefone nao preenchido completamente  ")
        } else if ( endereco == "" ){
            alert(" endereco nao preenchido completamente  ")
        } else if ( city == "" ){
            alert(" cidade nao preenchido completamente  ")
        } else if ( nul == "" ){
            alert(" numero nao preenchido completamente  ")
        } else if ( cep == "" ){
            alert(" cep nao preenchido completamente  ")
        } else if ( cpf == "" ){
            alert(" cpf nao preenchido completamente  ")
        } else if ( email === "" ){
            alert(" email nao preenchido completamente  ")
        } else if ( senha == "" ){
            alert(" senha nao preenchido completamente  ")
        } else if ( consenha == "" ){
            alert(" confirme a senha nao preenchido completamente  ")
        }
    } else if( senha === consenha ){

        if( resutado >= 18 ){

            window.location.href = "/app/view/Cadastro_Cliente+18.html"
    
        } else if( resutado < 18 ){
    
            window.location.href = "/app/view/Cadastro_Cliente-18.html"
    
        }

    } else if( senha != consenha ){

        alert("Senhas nao exatas")
    
    }
        
}


function BemVindoProficional(){

    let nivel = 0 + 1
    nivel

    let ajustes = window.document.getElementById('aju').value
    let personali = window.document.getElementById('per').value
    let criacao = window.document.getElementById('cri').value

    let tipos = []
    tipos.push(ajustes)
    tipos.push(personali)
    tipos.push(criacao)

    window.location.href = "/app/view/BoasVindas.html"

}

function BemVindoCliente(){

    let nivel = 0
    nivel

    let femininas = window.document.getElementById('femininas').value
    let masculinas = window.document.getElementById('masculinas').value
    let infantis = window.document.getElementById('infantis').value

    let tipos = []
    tipos.push(femininas)
    tipos.push(masculinas)
    tipos.push(infantis)

    window.location.href = "/app/view/BoasVindas.html"

}




