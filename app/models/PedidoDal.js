module.exports = class PedidoDal{
    constructor(conexao) {
        this.conexao = conexao;
    }

    Add(pedido){
        
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into pedido set ?",
                pedido,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                     return resolve(elements.insertId);
                });
        });
    }
    
    GetPedidoByUser(id){
        return new Promise((resolve, reject) =>{
            this.conexao.query("SELECT * FROM pedido WHERE id_usuario = ?", parseInt(id),
                 function(error, elements){
                    if(error){
                        return reject(error);
                    }
                    return resolve(elements);
                 }
            
            )
        })
    }


}