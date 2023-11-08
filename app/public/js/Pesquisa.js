// Obtém o formulário de pesquisa
var formPesquisa = document.getElementById("formPesquisa");

// Adiciona um ouvinte de evento para o evento de submit do formulário
formPesquisa.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Obtém o valor de pesquisa do campo de entrada
    var termoPesquisa = formPesquisa.querySelector(".pesquisa").value.toLowerCase();

    // Obtém a lista de usuários
    var usuarios = document.querySelectorAll(".users");

    // Itera sobre a lista de usuários e mostra apenas os usuários que começam com o termo de pesquisa
    usuarios.forEach(function(usuario) {
        var nomeUsuario = usuario.textContent.toLowerCase();
        if (nomeUsuario.startsWith("@" + termoPesquisa)) {
            usuario.parentElement.style.display = "block";
        } else {
            usuario.parentElement.style.display = "none";
        }
    });
});
