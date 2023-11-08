document.addEventListener("DOMContentLoaded", function() {
    var inputCpf = document.getElementById("cpf");
    var inputCep = document.getElementById("cep");
    var inputTelefone = document.getElementById("tel");

    inputCpf.addEventListener("input", formatarCPF);
    inputCep.addEventListener("input", formatarCep);
    inputTelefone.addEventListener("input", formatarTelefone);

    function formatarCPF(e){

        var v=e.target.value.replace(/\D/g,"");

        v=v.replace(/(\d{3})(\d)/,"$1.$2");

        v=v.replace(/(\d{3})(\d)/,"$1.$2");

        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

        e.target.value = v;

    }

    function formatarCep(e) {
        
        var v = e.target.value.replace(/\D/g, "");

        v = v.substring(0, 8); // Limita o comprimento para 8 dígitos

        v = v.replace(/^(\d{5})(\d)/, "$1-$2");

        e.target.value = v;
    }


    /*

        function formatarCep(e) {

        var v = e.target.value.replace(/\D/g, "");

        v = v.substring(0, 8); // Limita o comprimento para 8 dígitos
        
        v = v.replace(/^(\d{8})(\d)/, "$1-$2");

        e.target.value = v;
    }
    
    */

    function formatarTelefone(e){

        var v=e.target.value.replace(/\D/g,"");
        
        v=v.replace(/^(\d\d)(\d)/g,"($1)$2"); 
        
        v=v.replace(/(\d{5})(\d)/,"$1-$2");    
        
        e.target.value = v;
            
    }


    /*

        function formatarTelefone(e){

        var v = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        // Verifica se o número tem 11 dígitos (incluindo o nono dígito) e aplica a máscara adequada
        if (v.length === 11) {

            v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

        } else {

            v = v.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
    
        e.target.value = v;
    }
    */
})




