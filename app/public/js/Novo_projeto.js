let imagemInput = document.getElementById("imagemInput");

let imagemExibida = document.getElementById("imagemExibida");

    imagemInput.addEventListener("change", function (event) {

        let file = event.target.files[0]

        if (file) {

            let reader = new FileReader()

            reader.onload = function (e) {

                imagemExibida.src = e.target.result;
                document.getElementById('imagem64').value = imagemExibida.src
            }
            reader.readAsDataURL(file)
        }
    })

    const itemSpan = document.getElementById('Item');

    const radioButtons = document.querySelectorAll('input[name="item"]');

    radioButtons.forEach(function(radioButton) {
        
        radioButton.addEventListener('change', function() {

            if (radioButton.checked) {

                const labelText = document.querySelector('label[for="' + radioButton.id + '"]').textContent;

                itemSpan.innerText = labelText;
            }
        });
    });

    const itemSpan2 = document.getElementById('fazer');

    const radioButtons2 = document.querySelectorAll('input[name="fazer"]');

    radioButtons2.forEach(function(radioButton) {

        radioButton.addEventListener('change', function() {

            if (radioButton.checked) {

                const labelText = document.querySelector('label[for="' + radioButton.id + '"]').textContent;

                itemSpan2.innerText = labelText;
            }
        });
    });


var voltar = document.getElementById('voltar');

voltar.addEventListener('click', function() {

    window.history.back();

});

function EnviarItem(id){
     
    document.getElementById('tipo_item').value = id;
    const btn = document.getElementById('Item');
    btn.value = "Limpar Seleção de Itens";
    
}

function EnviarFazer(id){
    document.getElementById('tipo_fazer').value = id;
    const btn = document.getElementById('fazer');
    btn.value = "Limpar Seleção de Serviços";
}

function LimparSelecaoServicos(){
    const grupo_itens = document.getElementsByName('servico');
    let cont = 0;
    grupo_itens.forEach((item)=>{
        if(item.checked){
            item.checked = false;
        }
    });
    document.getElementById('fazer').value = 'Nenhum serviço selecionado';
}

function LimparSelecao(){
    const grupo_itens = document.getElementsByName('tipos');
    let cont = 0;
    grupo_itens.forEach((item)=>{
        item.checked = false;
    });
    document.getElementById('Item').value = 'Nenhum item selecionado';
    
}














