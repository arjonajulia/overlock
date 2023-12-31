var express = require("express");
var session = require("express-session");
var router = express.Router();
var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();
const fs = require("fs");
const path = require("path");



var UsuarioDAL = require("../models/UsuarioDAL");
var usuarioDAL = new UsuarioDAL(conexao);
var Email = require("../models/email");
var email = new Email();
var ProjetoDAL = require("../models/ProjetoDAL");
var projetoDal = new ProjetoDAL(conexao);
var OrcamentoDal = require("../models/OrcamentoDal");
var orcamentoDal = new OrcamentoDal(conexao);
var PedidoDalDal = require("../models/PedidoDal");
var pedidoDal = new PedidoDalDal(conexao);


var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);

var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,
  verificarUsuAutorizado } = require("../models/autenticador_middlewere");

const { body, validationResult } = require("express-validator");
const { render } = require("ejs");
const { resolve } = require("path");
const { promises } = require("dns");
const { isUndefined } = require("util");
const { isObject } = require("appjs/lib/utils");
//const OrcamentoDal = require("../models/OrcamentoDal");
//const ProjetoDAL = require("../models/ProjetoDAL");

router.get("/", function (req, res) {
  res.locals.erroLogin = null
  res.render("pages/index", {erro:"erro"} );
});

// "user_login":"", "senha_login":""

router.get("/index", function (req, res) {
  res.locals.erroLogin = null
  res.render("pages/index", {erro:"erro"} );
});


router.get("/CadastroUni", function (req, res) {
  res.locals.erroLogin = null
  res.render("pages/CadastroUni", { listaErros: null, dadosNotificacao: null, valores: { user_name: "", nome: "", dataNaci: "", tel: "", end: "", city: "", nul: "", cep: "", cep: "", cpf: "", email: "", senha: "", senha: "", tipo_usuario: req.query.id } });
});

/*
  router.get("/CadastroUni", function (req, res) {
    res.render("pages/CadastroUni");
  });
*/
router.get("/Perfil_Cliente_Profissional", function (req, res) {
  res.render("pages/Perfil_Cliente_Profissional");
});
router.get("/Cadastro_Cliente_mais_18", function (req, res) {
  res.render("pages/Cadastro_Cliente_mais_18");
});
router.get("/Cadastro_cliente-18", function (req, res) {
  res.render("pages/Cadastro_cliente-18");
});
router.get("/Cadastro_Profissional_mais_18", function (req, res) {
  res.render("pages/Cadastro_Profissional_mais_18");
});
router.get("/Cadastro_profissional-18", function (req, res) {
  res.render("pages/Cadastro_profissional-18");
});
router.get("/SalaDeEspera", function (req, res) {
  res.render("pages/SalaDeEspera");
});
router.get("/BoasVindas", function (req, res) {
  res.render("pages/BoasVindas");
});
router.get("/inicial_feed", function (req, res) {
  res.render("pages/inicial_feed");
});
router.get("/9_Editar_perfil_form", async function (req, res) {
  const user = req.session.id_u;
  const usAdmin = JSON.stringify(await usuarioDAL.AdmUsuarios(user));
  res.render("pages/9_Editar_perfil_form", { usAdmin: usAdmin });
});
router.get("/10_Perfil", async function (req, res) {
  const id = parseInt(req.query.id || req.session.id_u);
  const us = await usuarioDAL.GetUsuario(id);
  //req.session.foto_painel = us.foto_perfil_pasta;
  const usuario = us;


 
  return res.render("pages/10_Perfil", { usuario });
});


router.get("/11_Pagina_inicial_feed", async function (req, res) {

  const cam = await usuarioDAL.GetUsuario(req.session.id_u);
  //let caminho = cam[0].foto_perfil_pasta;
  const propostas = JSON.stringify(await projetoDal.GetPropostas());
  //req.session.foto_painel = "img/perfil/" + caminho;

  res.render("pages/11_Pagina_inicial_feed",{propostas: propostas });
});
router.get("/12_Novo_projeto", function (req, res) {
  res.render("pages/12_Novo_projeto");
});
router.get("/13_Meus_pedidos", function (req, res) {

  res.render("pages/13_Meus_pedidos");
});
router.get("/14_Aceitar_proposta", function (req, res) {
  res.render("pages/14_Aceitar_proposta");
});
router.get("/15_historico_proposta", function (req, res) {
  res.render("pages/15_historico_proposta");
});
router.get("/16_Chat_negociacao", function (req, res) {
  res.render("pages/16_Chat_negociacao");
});
router.get("/17_Mensagem_overlock", function (req, res) {
  res.render("pages/17_Mensagem_overlock");
});
router.get("/18_Notificacao_geral", function (req, res) {
  res.render("pages/18_Notificacao_geral");
});
router.get("/19_Chat", function (req, res) {
  res.render("pages/19_Chat");
});
router.get("/20_Denuncia_cliente", function (req, res) {
  res.render("pages/20_Denuncia_cliente");
});
router.get("/21_Sair_cliente", function (req, res) {
  res.render("pages/21_Sair_cliente");
});
router.get("/22_Politica_de_privacidade_cliente", function (req, res) {
  res.render("pages/22_Politica_de_privacidade_cliente");
});
router.get("/23_Projeto_usuario_ja_feito", function (req, res) {
  res.render("pages/23_Projeto_usuario_ja_feito");
});
router.get("/24_Meus_pedidos_geral", async function (req, res) {
  const id = req.session.id_u;
  const tipo = parseInt(req.session.id_tipo_usuario);
  const pedido = await pedidoDal.GetPedidoByUser(id, tipo);
  res.render("pages/24_Meus_pedidos_geral", {pedido});
});
router.get("/25_Avaliacao", function (req, res) {
  res.render("pages/25_Avaliacao");
});
router.get("/31_Pacotes_geral", function (req, res) {
  res.render("pages/31_Pacotes_geral");
});
router.get("/32_pacotes_plus_mensal", function (req, res) {
  res.render("pages/32_pacotes_plus_mensal");
});
router.get("/33_Pacotes_plus_anual", function (req, res) {
  res.render("pages/33_Pacotes_plus_anual");
});
router.get("/34_Pacotes_premium_mensal", function (req, res) {
  res.render("pages/34_Pacotes_premium_mensal");
});
router.get("/35_Pacotes_premium_anual", function (req, res) {
  res.render("pages/35_Pacotes_premium_anual");
});
router.get("/36_Escolher_pagamento", function (req, res) {
  res.render("pages/36_Escolher_pagamento");
});

router.get("/37_pix", async function (req, res) {
  const planos = req.query.id_c;
  const dados = req.session.dados;
  dados.id_planos = parseInt(planos);
  const dados_p = req.session.dados_prof;
  const id_r = await usuarioDAL.SalvarProfissional(dados);
  const ser = usuarioDAL.AddServicos(dados_p, id_r)
  res.render("pages/37_pix");
});
router.get("/38_Cartao", function (req, res) {
  res.render("pages/38_Cartao");
});
router.get("/39_Pagina_do_parabens", function (req, res) {
  res.render("pages/39_Pagina_do_parabens");
});
router.get("/40_Editar_perfil", function (req, res) {
  res.render("pages/40_Editar_perfil");
});
router.get("/41_Publicacao_form_principal", function (req, res) {
  res.render("pages/41_Publicacao_form_principal");
});
router.get("/42_Perfil", function (req, res) {
  res.render("pages/42_Perfil");
});
router.get("/43_Publicacao", function (req, res) {
  res.render("pages/43_Publicacao");
});
router.get("/44_Pagina_inicial_feed", async function (req, res) {
  const id_usuario = req.session.id_u;
  const proposta = await projetoDal.GetPropostas(parseInt(id_usuario));
  const resposta = "Erros"
  res.render("pages/44_Pagina_inicial_feed", { proposta: proposta});
});


router.get("/45_Proposta_Individual", async function (req, res) {
  const proposta = (await orcamentoDal.GetPropostasOrcamentos(parseInt(req.query.id)));
  res.render("pages/45_Proposta_Individual", { proposta });
});
router.get("/46_Propostas_em_andamento", async function (req, res) {
  const proposta = (await projetoDal.GetPropostaById(parseInt(req.query.id)));
  res.render("pages/46_Propostas_em_andamento", { proposta });
});
router.get("/47_Minhas_propostas_geral", async function (req, res) {
  const id = req.session.id_u;
  const id_tipo = req.session.id_tipo_usuario;
  const propostas = JSON.stringify(await orcamentoDal.GetPropostaByUsuario(id, id_tipo));
  res.render("pages/47_Minhas_propostas_geral", { propostas: propostas });
});
router.get("/48_Politica_de_privacidade", function (req, res) {
  res.render("pages/48_Politica_de_privacidade");
});
router.get("/49_Sair_profissional", function (req, res) {
  res.render("pages/49_Sair_profissional");
});
router.get("/50_Mensagens_Overlock", function (req, res) {
  res.render("pages/50_Mensagens_Overlock");
});
router.get("/51_Chat", function (req, res) {
  res.render("pages/51_Chat");
});
router.get("/52_Denuncia_profissional", function (req, res) {
  res.render("pages/52_Denuncia_profissional");
});
router.get("/53_Notificacao_geral", function (req, res) {
  res.render("pages/53_Notificacao_geral");
});
router.get("/54_Pagina_inicial_feed", function (req, res) {
  res.render("pages/54_Pagina_inicial_feed");
});
router.get("/55_Meus_Pedidos", async function (req, res) {
  const id_user = req.session.id_u;
  const tipo_usuario = req.session.id_tipo_usuario;
  const id_pedido = parseInt(req.query.id); 
  var pedido = ""
  if(tipo_usuario == 2){
       pedido = await pedidoDal.GetPedidoByUser(id_user, tipo_usuario);
  }
  if(tipo_usuario == 1){
       pedido = await pedidoDal.GetPedidoByPedido(id_pedido);
  }
  
  res.render("pages/55_Meus_Pedidos", {pedido});
})
router.get("/Administracao", async function (req, res) {
  const usAdmin = JSON.stringify(await usuarioDAL.AdmUsuarios(req.session.id_tipo_usuario));
  res.render("pages/Administracao", { usAdmin: usAdmin });
});
router.get("/ExcluirUsuario", function (req, res) {

});

router.get("/EditarCadastro", async function (req, res) {
  
  

})

router.post("/Editar_Perfil", function(req,res){

     const id = req.session.id_u;
     const caminho = id +".jpg";
     const usuario = {
      id_tipo_usuario: parseInt(req.body.tipo_usuario),
      user_name: req.body.user_name,
      nome: req.body.nome,
      telefone: req.body.tel,
      data_nasc: req.body.dataNaci,
      cep: req.body.cep,
      cidade: req.body.city,
      numero: req.body.nul,
      rua: req.body.end,
      cpf: req.body.cpf,
      email: req.body.email,
      foto_perfil_pasta : caminho,
      senha: bcrypt.hashSync(req.body.senha, salt),
      status_usuario: 1,
      id_planos: 1
     }
     
     usuarioDAL.update(usuario, id);

     res.redirect("/11_Pagina_inicial_feed");


})


router.get("/SalvarPedido", async function (req, res) {

  const id_orc = req.query.id_orc;
  const propostapedido = await orcamentoDal.GetByPropostas(parseInt(id_orc));
  const pp = propostapedido[0];
  const usuario = await usuarioDAL.GetUsuario(pp.id_pro);
  const pedido = {
    tipo_roupa: pp.tipo_roupa,
    categoria: pp.categoria,
    descricao: pp.descricao,
    foto_proposta: pp.foto_proposta,
    valor_pedido: pp.valor_orcamento,
    id_usuario: pp.id_cliente,
    id_usuario_prof: pp.id_pro,
    status_pedido : 1
  }
  const pedidoRetorno = await pedidoDal.Add(pedido);
  if (pedidoRetorno > 1) {
       
        if(await orcamentoDal.DeleteByProposta(pp.id_proposta)){
          await email.EnviarEmailPedido(usuario[0].email, "Pedido Aceito", pedido.valor_pedido);
          res.redirect("/47_Minhas_propostas_geral?id=msn");
        }else{
          res.redirect("/45_Proposta_Individual?id=" + id_orc);
        }
       
  }


})
router.get("/RecusarPedido", async function (req, res) {
 
  const id_orc = parseInt(req.query.id_orc);
  const valor = req.query.valor;
  const id_usuario = req.session.id_u;
  const ret = await orcamentoDal.DeleteOrcamento(id_orc, valor);
  res.redirect("/47_Minhas_propostas_geral")


})

router.get("/EditarUsuario", async function (req, res) {

  const id = parseInt(req.query.id);

  if (req.session.adm || (req.session.id_u === id)) {

    const valores = JSON.stringify(await usuarioDAL.GetUsuario(id));
    return res.render("pages/9_Editar_perfil_form", { valores: valores });
  } else {
    res.redirect("/index");
  }


});

router.get("/DeletarPerfil", async function (req, res) {

  const id = parseInt(req.query.id);
  
  if (req.session.adm || (req.session.id_u == id)) {
    const retorno = await usuarioDAL.deleteCompleto(id);

    if (!req.session.adm) {
      req.session.destroy();
      res.redirect("/index");
    } else {
      res.redirect("/Administracao?id=msn-delete-perfil");
    }

  } else {
    res.redirect("/index");
  }




})
router.post("/EditarFoto", async function (req, res) {

  const id = parseInt(req.body.id_usuario == '0' ? req.session.id_u : req.body.id_usuario);
  let usuario = await usuarioDAL.GetUsuario(id);
  const img64 = req.body.usuarioFoto.split(';base64,').pop();

  const criarFoto = () => {
    return new Promise((resolve, reject) => {
      const caminho_fotos = path.resolve(__dirname + "/../public/img/perfil/" + id + ".jpg");

      fs.writeFile(caminho_fotos, img64, { encoding: 'base64' }, err => {

        if (err) {
          console.log("Erro ao criar arquivo no caminho: " + caminho_fotos);
          reject();

        } else {
          resolve(id + ".jpg")
          res.redirect("/10_Perfil?id=" + id);
        }
      })

    })

  }

  const updatecaminho = await criarFoto();
  usuario[0].foto_perfil_pasta = updatecaminho;
  await usuarioDAL.update(usuario[0], id);

})
router.post("/56_Finalizar_Pedido", async function(req, res){
     const id_pedido = req.body.id_pedido;
     const usuario = await pedidoDal.GetPedidoByPedido(id_pedido);
     await email.EnviarEmailFinal(usuario[0].emailuc, usuario[0].email, "Pedido Finalizado", id_pedido );
     const proposta = pedidoDal.FinalizaPedido(parseInt(id_pedido));
     



     res.redirect("/44_Pagina_inicial_feed?id=msn-email");
})
router.post("/SalvarOrcamento", async function (req, res) {

  const id_usuario = req.session.id_u;
  const preco = parseFloat(req.body.preco);
  const id_proposta = parseInt(req.body.id_proposta);
  const usuario = await usuarioDAL.GetUsuarioByProposta(id_proposta);
  const orc = {
    valor_orcamento: preco,
    id_usuario,
    id_proposta
  }
  const retorno = await orcamentoDal.Add(orc)
  await email.EnviarEmail(usuario[0].email, "Novo Orçamento", preco);
   
  res.redirect("/44_Pagina_inicial_feed?id=msn");
})

router.post("/31_Pacotes_geral", function (req, res) {
  var dados_prof = [];
  dados_prof.push(req.body.aju);
  dados_prof.push(req.body.per);
  dados_prof.push(req.body.cri);
  req.session.dados_prof = dados_prof;
  res.render("pages/31_Pacotes_geral");
});

router.post("/administracao", function (req, res) {

})

router.post("/novo_projeto", async function (req, res) {

  const t = req.body.item;
  const tt = req.body[0];
  const ta = req.body.descricao;
  const img64 = req.body.imagem64.split(';base64,').pop()
  const usuario = req.session.id_u;



  const projeto = {
    id_usuario: usuario,
    tipo_roupa: req.body.tipo_item,
    categoria: req.body.tipo_fazer,
    descricao: req.body.descricao,
    foto_proposta: ""
  }

  const id_projeto = await projetoDal.SetProjetoUsusario(projeto);

  const criarFoto = () => {
    return new Promise((resolve, reject) => {
      const caminho_fotos = path.resolve(__dirname + "/../public/img/fotos_propostas/" + usuario + "-" + id_projeto + ".jpg");

      fs.writeFile(caminho_fotos, img64, { encoding: 'base64' }, err => {

        if (err) {
          console.log("Erro ao criar arquivo no caminho: " + caminho_fotos);
          reject();

        } else {
          resolve(usuario + "-" + id_projeto + ".jpg")
          res.redirect("/47_Minhas_propostas_geral");
        }
      })

    })

  }



  const updatecaminho = await criarFoto();
  await projetoDal.UpdateProjetoUsusario(id_projeto, updatecaminho);

})

router.post("/EditarUsuario", function (req, res) {

});
router.post("/ExcluirUsuario", function (req, res) {

});
router.post(
  "/CadastroUni",

  body("user_name").isLength({ min: 3, max: 20 }),
  body("nome").isLength({ min: 3, max: 45 }),
  body("tel").isLength({ max: 45 }),
  body("dataNaci").isLength({ max: 45 }),
  body("cep").isLength({ max: 45 }),
  body("city").isLength({ max: 45 }),
  body("nul").isLength({ max: 45 }),
  body("end").isLength({ max: 45 }),
  body("cpf").isLength({ max: 45 }),
  body("email").isLength({ max: 100 }),
  body("senha").isLength({ max: 45 }),
  body("tipo").isLength({ max: 100 }),

  async function (req, res) {

    var dadosForm = {
      id_tipo_usuario: parseInt(req.body.tipo_usuario),
      user_name: req.body.user_name,
      nome: req.body.nome,
      telefone: req.body.tel,
      data_nasc: req.body.dataNaci,
      cep: req.body.cep,
      cidade: req.body.city,
      numero: req.body.nul,
      rua: req.body.end,
      cpf: req.body.cpf,
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, salt),
      status_usuario: 1,
      foto_perfil_pasta: "perfil/",
      id_planos: 1

    }
    console.log(dadosForm)

    const erros = validationResult(req);

    console.log(erros)

    if (!erros.isEmpty()) {
      console.log("Vai dar erro 2")
      return res.render("pages/CadastroUni", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      if (dadosForm.id_tipo_usuario == '1') {
        let insert = await usuarioDAL.create(dadosForm);
        console.log(insert);
        console.log("Cadastro Certo")
        let hoje = new Date()
        let dataFinal = new Date(req.body.dataNaci)
        let media = hoje - dataFinal
        let resutado = media / (1000*60*60*24);
        if (resutado >= 6574) {
          await usuarioDAL.SalvarProfissional(dadosForm);
          return res.render("pages/101_Pagina_do_parabens");

          //return res.render("pages/Cadastro_Profissional_mais_18", { listaErros:null, dadosNotificacao: null, valores: {"user_login":"", "senha_login":""}})
        } else {
          req.session.dados = dadosForm;
          return res.render("pages/Cadastro_profissional_menos_18")
        }
      }
      if (dadosForm.id_tipo_usuario == '2') {
        let hoje = new Date()
        let dataFinal = new Date(req.body.dataNaci)
        let media = hoje - dataFinal
        let convercao = 365 * 24 * 60 * 60;
        let final = media / convercao
        let resutado = media / (1000*60*60*24);
        if (resutado >= 6574) {
          req.session.dados = dadosForm;
          res.render("pages/Cadastro_Profissional_mais_18");
        } else {
          req.session.dados = dadosForm;
          return res.render("pages/Cadastro_profissional_menos_18")
        }
      }



    } catch (e) {
      console.log(e + 'console')
      console.log("catch")
      res.render("pages/CadastroUni", {
        listaErros: erros, dadosNotificacao: { titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error" },
        valores: req.body
      })
    }

  })

router.post("/CadastrarMenor_18", function(req, res){

   const dados = req.session.dados;
   const arquivo = req.body.file;



})



/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const multer = require('multer');
const path = require('path');
// ****************** Versão com armazenamento em diretório
// Definindo o diretório de armazenamento das imagens
var storagePasta = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './app/public/img/0_Perfil/') // diretório de destino  
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //renomeando o arquivo para evitar duplicidade de nomes
  }
})

var upload = multer({ storage: storagePasta });

*/

router.get("/", verificarUsuAutenticado, function (req, res) {
  req.session.autenticado.login = req.query.login;
  res.render("pages/index", req.session.autenticado);
});

router.get("/sair", limparSessao, function (req, res) {

  res.redirect("/index");
});

router.post("/Tipo_Usuario", (req, res) => {
  var id = req.session.id_u;
  if (req.body.tipo_usuario == 1) {
    res.redirect("/CadastroUni?id=" + id)
    console.log(1);
  }
  if (req.body.tipo_usuario == 2) {
    res.redirect("/CadastroUni?id=" + id)
    console.log(2);
  }

})








// -//////////////////////////////////////////////////////


// -//////////////////////////////////////////////////////
// -//////////////////////////////////////////////////////
// -//////////////////////////////////////////////////////

// login

router.post("/login", async (req, res) => {
  const erro = "";

  //const user = req.body;
 
  const usuario_login = (req.body.user).split("-");
  
  const user = {
    user_login : usuario_login[0],
    user_senha : usuario_login[1].split('=')[1]
  }
  
  if (!user.user_login == '' || user.user_senha == '') {
    const senha = bcrypt.hashSync(user.user_senha, salt);
    const erros = validationResult(req);

    var usuario;

    usuario = await usuarioDAL.authUser(user.user_login);
    us = JSON.stringify(usuario);
    uss = JSON.parse(us);
    if (us == '[]') {
      //{ listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }}
      return res.send()
    }
    var id_user = uss[0].id_usuario;

    if (bcrypt.compareSync(user.user_senha, uss[0].senha)) {
      req.session.id_u = id_user;
      req.session.id_tipo_usuario = parseInt(uss[0].id_tipo_usuario);
      req.session.foto_painel = "img/perfil/" + uss[0].foto_perfil_pasta;
      req.session.adm = parseInt(uss[0].id_tipo_usuario) == 3 ? true : false;
      //res.render("pages/11_Pagina_inicial_feed", {uss} );
      res.send(usuario)
      //redirect("/11_Pagina_inicial_feed?perfil=" + uss[0].foto_perfil_pasta);


    } else {
      res.send()
      //return res.redirect("/login?erro=error")
    }
  } else {
    res.send()
    //return res.redirect("/index?erro=error")
  }

  /*
          gravarUsuAutenticado(usuarioDAL, bcrypt),
          function (req, res) {
           
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
             console.log("Caminho 1")
              return res.render("pages/index", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }})
            }
            if (req.session.autenticado != null) {
             console.log("Caminho 2")
              //mudar para página de perfil quando existir
              res.redirect("/Perfil_Cliente_Profissional?login=logado");
            } else {
              console.log("Caminho 3")
              res.render("pages/index", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" } })
            }
          }*/
});

/*
body("user_login")
  .isLength({ min: 4, max: 45 }),
body("senha_login")
  .isStrongPassword(),
*/





/*
 
// -//////////////////////////////////////////////////////
// -//////////////////////////////////////////////////////
// -//////////////////////////////////////////////////////

router.get("/perfil", verificarUsuAutorizado([1, 2, 3], "pages/1_Restrito"), async function (req, res) {
 
try {
  let results = await usuarioDAL.findID(req.session.autenticado.id);
  console.log(results);
  let campos = {
    user_name: results[0].user_nameario, 
    email_usu: results[0].email_usuario,
    foto_perfil_pasta: results[0].foto_perfil_pasta, 
    foto_perfil_banco: results[0].foto_perfil_banco,
    user_name: results[0].user_name, 
    fone_usu: results[0].fone_usuario, 
    senha: ""
  }
  res.render("pages/9_Editar_perfil_form", { listaErros: null, dadosNotificacao: null, valores: campos })
} catch (e) {
  res.render("pages/9_Editar_perfil_form", {
    listaErros: null, 
    dadosNotificacao: null, 
    valores: {
      foto_perfil_banco: "",
      foto_perfil_pasta: "", 
      user_name: "", 
      email: "", 
      fone_usu: "", 
      senha: ""
    }
  })
}
});


router.post("/perfil_form", upload.single('imagem-perfil_usu'),
body("user_name")
  .isLength({ min: 3, max: 50 }).withMessage("Mínimo de 3 letras e máximo de 50!"),
body("user_name")
  .isLength({ min: 8, max: 30 }).withMessage("Nome de usuário deve ter de 8 a 30 caracteres!"),
body("email_usu")
  .isEmail().withMessage("Digite um e-mail válido!"),
body("fone_usu")
  .isLength({ min: 12, max: 13 }).withMessage("Digite um telefone válido!"),
verificarUsuAutorizado([1, 2, 3], "pages/1_Restrito"),
async function (req, res) {
  const erros = validationResult(req);
  console.log(erros)
  if (!erros.isEmpty()) {
    return res.render("pages/9_Editar_perfil_form", { listaErros: erros, dadosNotificacao: null, valores: req.body })
  }
  try {
    var dadosForm = {
      user_name: req.body.user_name,
      email: req.body.email,
      foto_perfil_banco: null,
      tipo_usuario: 1,
      status_usuario: 1
    };
    console.log("senha: " + req.body.senha)
    if (req.body.senha != "") {
      dadosForm.senhaario = bcrypt.hashSync(req.body.senha, salt);
    }
    if (!req.file) {
      console.log("Falha no carregamento");
    } else {
      caminhoArquivo = "img/0_Perfil/" + req.file.filename;
      dadosForm.foto_perfil_pasta = caminhoArquivo
    }
    console.log(dadosForm);

    let resultUpdate = await usuarioDAL.update(dadosForm, req.session.autenticado.id);
    if (!resultUpdate.isEmpty) {
      if (resultUpdate.changedRows == 1) {
        var result = await usuarioDAL.findID(req.session.autenticado.id);
        var autenticado = {
          autenticado: result[0].user_nameario,
          id: result[0].id_usuario,
          tipo: result[0].tipo_usuario,
          foto_perfil_banco: result[0].foto_perfil_banco,
          foto_perfil_pasta: result[0].foto_perfil_pasta
        };
        req.session.autenticado = autenticado;
        var campos = {
          user_name: result[0].user_nameario, 
          email_usu: result[0].email_usuario,
          foto_perfil_pasta: result[0].foto_perfil_pasta, 
          foto_perfil_banco: result[0].foto_perfil_banco,
          user_name: result[0].user_name,
          senha: ""
        }
        res.render("pages/9_Editar_perfil_form", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
      }
    }
  } catch (e) {
    console.log(e)
    res.render("pages/9_Editar_perfil_form", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
  }

});
 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

module.exports = router;