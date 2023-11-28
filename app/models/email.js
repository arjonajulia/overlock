const nodemailer = require('nodemailer');
const { promises } = require('nodemailer/lib/xoauth2');

module.exports = class email {

    constructor() {
        this.email =  "overlock.site@gmail.com";
        
        this.transporter = nodemailer.createTransport({
          service: 'Hotmail',
            auth: {
              user: 'overlock.site@gmail.com',
              pass: 'overlock12345'
            }
        });
    }

    EnviarEmail(email, titulo, valor){
        return new Promise  ((resolve, reject) => {
            const email_ = {
                from: this.email,
                to: email,
                subject: titulo,
                html: '<h3>Overlock</h3><br/> <h4>Proposta enviado no valor de '+ valor +'</h4><br/><br/>Atenciosamente<br/>Overlock'
            
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