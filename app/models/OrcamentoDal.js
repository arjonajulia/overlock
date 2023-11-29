const UsuarioDAL = require("./UsuarioDAL");

module.exports = class OrcamentoDal{
    constructor(conexao) {
        this.conexao = conexao;
    }

    Add(orcamento){
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into orcamento set ?",
                orcamento,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements.insertId);
                });
        });
    }

    GetPropostasOrcamentos(orcamento){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM proposta p LEFT JOIN orcamento o ON o.id_proposta = p.id_proposta LEFT JOIN usuario u on u.id_usuario = o.id_usuario WHERE p.id_proposta = ?",
                [orcamento],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
        });
    }

    GetByPropostas(orcamento){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT *, o.id_usuario AS id_pro, p.id_usuario AS id_cliente FROM proposta p INNER JOIN orcamento o ON o.id_proposta = p.id_proposta WHERE p.id_proposta = ?",
                [orcamento],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
        });
    }
    GetPropostaById(id_usuario){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM orcamento o INNER JOIN proposta p ON o.id_proposta =  p.id_proposta WHERE o.id_usuario = ?",
                [id_usuario],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
        });
    }

    GetPropostaByUsuario(id_usuario, id_tipo){
        return new Promise((resolve, reject) => {
                           
            if(id_tipo == 1){
                this.conexao.query("SELECT * FROM proposta where id_usuario = ? Order By id_proposta desc",
                id_usuario,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
            }else{
                this.conexao.query("SELECT * FROM orcamento AS orc INNER JOIN proposta AS prop ON orc.id_proposta = prop.id_proposta WHERE orc.id_usuario = ?",
                [id_usuario],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
            }



        })
    
    }

    GetIdOrcamento(id_proposta, id_usuario){
        return new Promisse((resolve, reject) =>{
             this.conexao.query("SELECT id_orcamento FROM orcamento WHERE id_proposta = ? AND id_usuario = ?", 
             [id_proposta, id_usuario],
             function (error, elements) {
                 if(error){
                    return reject(error);
                }
                 return resolve(elements);
            });
             
        });
    }

    DeleteOrcamento(id_proposta){
        const conexao = this.conexao;
        return new Promise((resolve, reject) => {
            conexao.query("DELETE FROM orcamento WHERE id_proposta = ?",
                [id_proposta],
                function (error) {
                    if (error) {
                        return reject(error);
                    }
                    if(error){
                        return reject(error);
                    }
                     return resolve("OK");
                });
        });
    }

    DeleteOrcamento(id_proposta, valor){
        const conexao = this.conexao;
        return new Promise((resolve, reject) => {
            conexao.query("DELETE FROM orcamento WHERE id_proposta = ? AND valor_orcamento = ?",
                [id_proposta, valor],
                function (error) {
                    if (error) {
                        return reject(error);
                    }
                    if(error){
                        return reject(error);
                    }
                     return resolve("OK");
                });
        });
    }

    
    DeleteByProposta(id_proposta){
        const conexao = this.conexao;
        return new Promise((resolve, reject) => {
            conexao.query("DELETE FROM orcamento WHERE id_proposta = ?",
                [id_proposta],
                function (error) {
                    if (error) {
                        return reject(false);
                    }
                 conexao.query("DELETE FROM proposta WHERE id_proposta = ?",
                    [id_proposta],
                    function (error) {
                        if (error) {
                            return reject(false);
                        }
                         return resolve(true);
                    });
                });
        });
    }

   










}
