var galeria = document.getElementById('galeria-container');
var imagens = galeria.querySelectorAll('.foto');

function rolarImagens() {
    imagens.forEach(function(imagem) {
        imagem.scrollBy({
            top: 0,
            left: 100, // Altere este valor para ajustar a quantidade de rolagem horizontal
            behavior: 'smooth' // Adiciona um efeito de rolagem suave
        });
    });
}

setInterval(rolarImagens, 5000); 