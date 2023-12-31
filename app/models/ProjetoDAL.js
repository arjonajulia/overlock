module.exports = class ProjetoDAL{
    constructor(conexao) {
        this.conexao = conexao;
    }


    SetProjetoUsusario(projeto){
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into proposta set ?",
                projeto,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements.insertId);
                });
        });
    }

    UpdateProjetoUsusario(id_proposta, foto_proposta){
        return new Promise((resolve, reject) => {
            this.conexao.query("update proposta set foto_proposta = ? where id_proposta = ?",
                [foto_proposta, id_proposta], 
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements);
                });
        });
    }
    GetPropostas(){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM proposta",
             function (error, elements) {
                if (error) {
                    return reject(error);
                }
                 return resolve(elements);
            });
        });
    }

    GetPropostas(id_usuario){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT p.*," 
                +"(SELECT o.valor_orcamento FROM orcamento AS o WHERE o.id_proposta = p.id_proposta AND o.id_usuario = ?  ORDER BY o.id_orcamento DESC LIMIT 1 )" 
                + " AS orc FROM proposta AS p;", [id_usuario],
             function (error, elements) {
                if (error) {
                    return reject(error);
                }
                 return resolve(elements);
            });
        });
    }



    GetProposta(id){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM orcamento WHERE id_usuario = ?",
            id,
             function (error, elements) {
                if (error) {
                    return reject(error);
                }
                 return resolve(elements);
            });
        });
    }

    GetPropostaById(id){
        const tipoUsuario =  this.conexao.query("SELECT * FROM proposta WHERE id_proposta = ?",id)
        
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM proposta WHERE id_proposta = ?",id,
             function (error, elements) {
                if (error) {
                    return reject(error);
                }
                 return resolve(elements);
            });
        });
    }

    DeleteProposta(id){
        return new Promise((resolve, reject) =>{
            this.conexao.query("DELETE FROM orcamento WHERE id_proposta = ?"),
            id,
            function(error, elements){
                if(error){
                    return reject(error)
                }else{
                    this
                }
            }
        });
    }



}