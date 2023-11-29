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
                sql_string = "SELECT u.*, p.*, uc.nome AS nomeuc, uc.telefone AS telefoneUc, uc.email AS emailUc from pedido AS p "
                           + "INNER JOIN usuario AS u ON u.id_usuario = p.id_usuario_prof "
                           + "INNER JOIN usuario AS uc ON uc.id_usuario = p.id_usuario WHERE p.id_usuario = ? AND p.status_pedido <> 0";
            }else{
                sql_string = "SELECT u.*, p.*, uc.nome AS nomeuc, uc.telefone AS telefoneUc, uc.email AS emailUc from pedido AS p "
                           + "INNER JOIN usuario AS u ON u.id_usuario = p.id_usuario_prof "
                           + "INNER JOIN usuario AS uc ON uc.id_usuario = p.id_usuario WHERE p.id_usuario_prof = ? AND p.status_pedido <> 0";
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
    GetPedidoByPedido(id_pedido){
        const sql = "SELECT u.*, p.*, uc.nome AS nomeuc, uc.telefone AS telefoneUc, uc.email AS emailuc from pedido AS p"
                  + " INNER JOIN usuario AS u ON u.id_usuario = p.id_usuario_prof"
                  + " INNER JOIN usuario AS uc ON uc.id_usuario = p.id_usuario WHERE p.id_pedido = ? AND p.status_pedido <> 0" 
        
        
        return new Promise((resolve, reject) => {
                this.conexao.query(sql, [id_pedido], function(error, elements){
                    if(error){
                        return reject(error);
                    }
                        return resolve(elements)
                })
        }) 
    }
    
    FinalizaPedido(id_pedido){
        const sql = "UPDATE pedido SET status_pedido = 0 WHERE id_pedido = ?"
        
        
        return new Promise((resolve, reject) => {
                this.conexao.query(sql, [id_pedido], function(error, elements){
                    if(error){
                        return reject(error);
                    }
                        return resolve(elements)
                })
        }) 
    }

}