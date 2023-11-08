module.exports = class UsuarioDAL {

    constructor(conexao) {
        this.conexao =  conexao;

    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.user_name, u.nome, " +
                "u.telefone, u.data_nasc, u.cep," +
                "u.cidade, u.rua, u.numero," +
                "u.cpf, u.email, u.senha," +
                "t.tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                "t.id_tipo_usuario", function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    AdmUsuarios(id){
        const tipo_usuario = this.conexao.query("SELECT id_tipo_usuario FROM usuario WHERE id_usuario = ? and ", parseInt(id));
        if(tipo_usuario.values == 3){
            return new Promise((resolve, reject) =>{
                  this.conexao.query("SELECT id_usuario, foto_perfil_pasta, user_name, nome, cpf, tu.nome_tipo FROM usuario AS u " +
                  "INNER JOIN tipo_usuario AS tu ON tu.id_tipo_usuario = u.id_tipo_usuario", 
                  function(error, elements){
                       if(error){
                        return reject(error);
                       }
                       return resolve(elements);
                  })
            });
        }else{
            return erro;
        }
        
    }


    SalvarProfissional(dados){
        
       
        const usuario = this.authUser(dados.user_name);    

        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?",
                dados,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements.insertId);
                });
        });
    }

    AddServicos(dados_p, id){
        var servicos = [];
        servicos[0] = parseInt(dados_p[0] == "on" ? 1 : 0);
        servicos[1] = parseInt(dados_p[1] == "on" ? 1 : 0);
        servicos[2] = parseInt(dados_p[2] == "on" ? 1 : 0);
        servicos[3] = parseInt(id);
        new Promise((resolve,reject) =>{
            this.conexao.query("INSERT INTO servicos (ajuste, person, criacao, id_usuario) VALUES (?,?,?,?)",
              [servicos[0],servicos[1],servicos[2],servicos[3]],
                function (error, e) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(1);
                });
        });
    }
   

    /*
        findAll() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                "u.senha_usuario, u.email_usuario, u.fone_usuario, u.tipo_usuario," +
                " u.status_usuario, t.tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                " u.tipo_usuario = t.id_tipo_usuario", function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };
    */

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE user_name = ? and status_usuario <> 0",
            [camposForm.user_name],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.user_name, u.nome, " +
                "u.senha, u.email, u.telefone, t.tipo_usuario," +
                "u.foto_perfil_pasta, u.foto_perfil_banco, " +
                "u.status_usuario, t.tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t where u.status_usuario <> 0 and " +
                "t.id_tipo_usuario and u.id_usuario = ?", [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };
    GetUsuario(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE id_usuario = ? and status_usuario <> 0", parseInt(id), function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };


    authUser(user)  {
        return new Promise((resolve, reject) =>{
            this.conexao.query("Select * from usuario Where user_name = ? and status_usuario <> 0",
            user,
            function(error, elements){
                if(error){
                    console.log(reject)
                }
                return resolve(elements);
            });
        })
    }
    

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?",
                camposJson,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }
    
    /*
    create(dadosForm) {
    return new Promise((resolve, reject) => {
        this.conexao.query("insert into usuario set ?",
            dadosForm,
            function (error, elements) {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
    });
    }
    */
    update(camposJson, id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET ? WHERE id_usuario = ?",
            [camposJson, id],
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET status_usuario = 0 WHERE id_usuario = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

    deleteCompleto(id) {
        const conexao = this.conexao;
        return new Promise((resolve, reject) => {
            conexao.query("DELETE FROM orcamento WHERE id_usuario = ?", id, function (error, results) {
                if (error) {
                    return reject(error);
                }
                console.log(conexao);

                conexao.query("DELETE FROM usuario_has_pedido WHERE id_usuario = ?", id, function (error, results) {
                    if (error) {
                        return reject(error);
                    }

                   conexao.query("DELETE FROM proposta WHERE id_usuario = ?", [id], function (error, results) {
                        if (error) {
                            return reject(error);
                        }

                        conexao.query("DELETE FROM servicos WHERE id_usuario = ?", [id], function (error, results) {
                            if (error) {
                                return reject(error);
                            }
                            console.log(conexao);

                            conexao.query("DELETE FROM pedido WHERE id_usuario = ?", [id], function (error, results) {
                                if (error) {
                                    return reject(error);
                                }
                                    conexao.query("DELETE FROM usuario WHERE id_usuario = ?", [id], function (error, results) {
                                    if (error) {
                                        return reject(error);
                                    }
                                
                                        return resolve("OK");
                                    });

                                
                            });
                        });
                    });
                });
            });
        });
    }


}

