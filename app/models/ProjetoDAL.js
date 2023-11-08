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
    GetProposta(){
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




}