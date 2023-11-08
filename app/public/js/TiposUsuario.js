function definirTipoUsuario(tipo) {

    let tipoUsuario 

    if (tipo === 1) {

        tipoUsuario = 1;

        console.log('Tipo de usuário definido como Profissional (1)');

        window.location = "/Cadastro_Profissional_mais_18"

    } else if (tipo === 2) {

        tipoUsuario = 2;

        console.log('Tipo de usuário definido como Cliente (2)');

        window.location = "/Cadastro_Cliente_mais_18"
    }
}

module.exports(
    definirTipoUsuario(tipoUsuario)
)

