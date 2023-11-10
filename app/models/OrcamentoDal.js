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
            this.conexao.query("SELECT * FROM proposta p INNER JOIN orcamento o ON o.id_proposta = p.id_proposta INNER JOIN usuario u on u.id_usuario = o.id_usuario WHERE p.id_proposta = ?",
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
            this.conexao.query("SELECT *, o.id_usuario AS id_pro, p.id_usuario AS id_cliente FROM proposta p INNER JOIN orcamento o ON o.id_proposta = p.id_proposta WHERE id_orcamento = ?",
                [orcamento],
                function (error, elements) {
                    if (error) {
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
                    conexao.query("delete from proposta WHERE id_proposta = ?"),
                    id_proposta;
                    if(error){
                        return reject(error);
                    }
                     return resolve();
                });
        });
    }

   










}
