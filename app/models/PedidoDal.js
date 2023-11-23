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
    
    GetPedidoByUser(id, id_tipo){
        return new Promise((resolve, reject) =>{

            let sql_string = ""

            if(id_tipo == 1){
                sql_string = "SELECT * FROM pedido WHERE id_usuario = ?"
            }else{
                sql_string = "SELECT * FROM pedido WHERE id_usuario_prof = ?"
            }

            if(id_tipo == 3){
                id = 0
                "SELECT * FROM pedido WHERE id_usuario > ?"
            }
            
            this.conexao.query(sql_string, parseInt(id),
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