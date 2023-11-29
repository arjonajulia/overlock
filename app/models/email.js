const nodemailer = require('nodemailer');
const { promises } = require('nodemailer/lib/xoauth2');

module.exports = class email {

    constructor() {
        this.email =  "overlock.site@gmail.com";
        
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
            auth: {
              user: 'overlock.site@gmail.com',
              pass: 'mnmh ygbv gege ntrj'
            }
        });
    }

    EnviarEmail(email, titulo, valor){
        return new Promise  ((resolve, reject) => {
            const email_ = {
                from: this.email,
                to: email,
                subject: titulo,
                html: '<h3>Overlock</h3><br/> <h4>Proposta enviado no valor de R$ '+ valor +'</h4><br/><br/>Atenciosamente<br/>Overlock'
            
            }
            
            this.transporter.sendMail(email_, (err, result)=>{
                if(err)  {
                    reject(err)
                }
                console.log('Mensagem enviada!!!! ' + result);
                    resolve("OK")
            })
        }) 
    }

    EnviarEmailPedido(email, titulo, valor){
        return new Promise  ((resolve, reject) => {
            const email_ = {
                from: this.email,
                to: email,
                subject: titulo,
                html: '<h3>Overlock</h3><br/> <h4>Pedido aceito no valor de R$'+ valor +'</h4><br/><br/>Atenciosamente<br/>Overlock'
            
            }
            
            this.transporter.sendMail(email_, (err, result)=>{
                if(err)  {
                    reject(err)
                }
                console.log('Mensagem enviada!!!! ' + result);
                    resolve("OK")
            })
        }) 
    }

    EnviarEmailFinal(email, email_prof, titulo, id){
        return new Promise  ((resolve, reject) => {
            const email_ = {
                from: this.email,
                to: email,
                cc: email_prof,
                subject: titulo,
                html: '<h3>Overlock</h3><br/> <h4>Seu Pedido #' + id + ' foi entregue</h4><br/><h5>Obrigado por usar a Overlock</h5> <br/><br/>Atenciosamente<br/>Overlock'
            
            }
            
            this.transporter.sendMail(email_, (err, result)=>{
                if(err)  {
                    reject(err)
                }
                console.log('Mensagem enviada!!!! ' + result);
                    resolve("OK")
            })
        }) 
    }


  


}