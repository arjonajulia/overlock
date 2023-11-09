let imagemInput = document.getElementById("imagemInput");

let imagemExibida = document.getElementById("imagemExibida");

    imagemInput.addEventListener("change", function (event) {

        let file = event.target.files[0]

        if (file) {

            let reader = new FileReader()

            reader.onload = function (e) {

                imagemExibida.src = e.target.result;
                alert("testes")
            }
            reader.readAsDataURL(file)
        }
    })

let imagemInput2 = document.getElementById("imagemInput2");

let imagemExibida2 = document.getElementById("imagemExibida2");

    imagemInput2.addEventListener("change", function (event) {

        let file = event.target.files[0]

        if (file) {

            let reader = new FileReader()

            reader.onload = function (e) {

                imagemExibida2.src = e.target.result;
                document.getElementById('usuarioFoto').value =  e.target.result;
                if( window.location.search.split("=").length > 1){
                    document.getElementById('id_usuario').value = window.location.search.split("=")[1];
                }
                
             }
            reader.readAsDataURL(file)
        }
    })




/*
    document.getElementById('picture').addEventListener('change', function() {
        document.getElementById('picture__image').textContent = this.files[0].name
    })
*/

/*
    const inputFile = 
        document.querySelector('#picture__input')
    const pictureImage = 
        document.querySelector('.picture__image')

    insputFile.addEventListener('change', function(e) {
        const inputTarget = e.target
        console.log(inputTarget)
        const file = inputTarget.files[0]

        if(file) {
            const reader = new FileReader()

            reader.addEventListener('load', function(e) {
                const readerTarget = e.target

                const img = document.createElement('img')
                img.src = readerTarget.result
                img.classList.add('.picture__img')

                pictureImage.appendChild(img)
            })

            reader.readAsDataURL(file)
        } else {
            pictureImage.innerHTML = pictureImage
        }
    console.log(file)
})
*/