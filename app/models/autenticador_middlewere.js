const { validationResult } = require("express-validator");
const UsuarioDAL = require("./UsuarioDAL");
const sessao = require("express-session");




function verificarUsuAutenticado(req, res, next) {
    console.log("Passou por aqui auth")
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
    } else {
        var autenticado = { autenticado: null };
    }
    req.session.autenticado = autenticado;
    console.log(req.session.autenticado);
    next();
}


function VerificarUsuario(U, p ){
    console.log("Passou por aqui auth");
    const resul = UsuarioDAL.authUser(user, pass);
    return resul;

}

function limparSessao(req, res, next) {
    req.session.destroy();
    next()
}


function gravarUsuAutenticado(usuarioDAL, bcrypt) {
    console.log("Passou por aqui authmid")
    return async (req, res, next) => {
        erros = validationResult(req)
        console.log(erros);
        if (erros.isEmpty()) {
            var dadosForm = {
                user_name: req.body.user_login,
                senha: req.body.senha_login,
            };
            var results = await usuarioDAL.findUserEmail(dadosForm);
            var total = Object.keys(results).length;
            console.log(results)
            console.log(dadosForm)
            if (total == 1) {
                if (bcrypt.compareSync(dadosForm.senha, results[0].senha)) {
                    var autenticado = {
                        autenticado: results[0].nome,
                        id: results[0].id_usuario,
                        tipo: results[0].tipo_usuario,
                        foto_perfil_banco:results[0].foto_perfil_banco,
                        foto_perfil_pasta:results[0].foto_perfil_pasta
                    };
                }
            } else {
                var autenticado =  null ;
            }
        } else {
            var autenticado = null ;
            //tratar os erros no campo do formulário
        }
        req.session.autenticado = autenticado;
        next();
    }
}


function verificarUsuAutorizado(tipoPermitido, destinoFalha) {
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null &&
            tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha);
        }
    };
}


module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado,
    VerificarUsuario,
 
};
