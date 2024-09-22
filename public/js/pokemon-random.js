
document.addEventListener('DOMContentLoaded', function(){
    renderizarPokemonRandom();
});

async function renderizarPokemonRandom(){
    const nomePokemon = document.querySelector('.nome_pokemon');
    const numPokemon = document.querySelector('.numero_pokemon');
    const pokemonImg = document.querySelector('.pokemon_random');
    const pokemonFundo = document.querySelector('.fundo_pokemon');
    const tipo1Pokemon = document.getElementById('tipo1');
    const tipo2Pokemon = document.getElementById('tipo2');
    const habPokemon = document.getElementById('habilidades');
    const generoM = document.getElementById('macho');
    const generoF = document.getElementById('femea');
    const pesoPokemon = document.getElementById('peso');
    const alturaPokemon = document.getElementById('altura');

    const random = await getPokemonRandom();

    //Atribui o nome buscado no local
    nomePokemon.textContent = random.nome;

    //Junta 000 com os ids dos pokémons e extrai apenas os últimos 3 dígitos
    numPokemon.textContent = `#${("000" + random.id).slice(-3)}`;

    //Formata os tipos, adicionando cor de fundo e o texto
    classTipos(random.tipos, tipo1Pokemon, tipo2Pokemon, pokemonFundo)

    // Formata as primeiras letras de cada habilidade em maiúsculo
    habPokemon.textContent = capitalizeHabilidades(random.habilidades);

    //Define a imagem em SVG vinda da API
    pokemonImg.src = random.sprite;

    //Define a altura e o peso do Pokémon
    pesoPokemon.textContent = `${random.peso / 10}Kg`
    alturaPokemon.textContent = `${random.altura / 10}m`

    /*
        Verifica se o gênero não é '-1'
        Caso seja: ele define como 'Sem Gênero'
        Caso não: ocorre um cálculo para definir a chance do gênero do pokémon em porcentagem
    */
    if(random.genero == -1){
        const semGenero = document.getElementById('spanGeneros');
        semGenero.textContent = 'Sem Gênero';
    }
    else {    
        let calcGeneroF = (random.genero/8)*100;
        let calcGeneroM = 100 - calcGeneroF;

        generoM.textContent = calcGeneroM + '%';
        generoF.textContent = calcGeneroF + '%';
    }

}

// Função que capitaliza a string
function capitalizeHabilidades(str){
    return str
    .split(', ') // Separa a string de acordo com a vírgula
    .map(habilidade => {
        return habilidade.charAt(0).toUpperCase() + habilidade.slice(1);
    }) // Deixa maíusculo a primeira letra da palavra
    .join(', '); // Junta as string com as vírgulas
}

// Função que define os tipos
function classTipos(str, tipo1Pokemon, tipo2Pokemon = null, pokemonFundo = null){
    // Separa os tipos de acordo com a vírgula
    let tiposArray = str.split(', ');

    // Array que define os tipos de pokémons
    const tiposPokemon = {
        water: { class: 'agua', texto: 'Água', fundo: `url('img/fundos/praia.jpeg') no-repeat center` },
        steel: { class: 'aco', texto: 'Aço', fundo: `url('img/fundos/montanha.jpeg') no-repeat center` },
        dragon: { class: 'dragao', texto: 'Dragão', fundo: `url('img/fundos/sky.jpeg') no-repeat center`},
        electric: { class: 'eletrico', texto: 'Elétrico', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        fairy: { class: 'fada', texto: 'Fada', fundo: `url('img/fundos/campo.jpeg') no-repeat center`},
        ghost: { class: 'fantasma', texto: 'Fantasma', fundo: `url('img/fundos/castelo.jpg') no-repeat center`},
        fire: { class: 'fogo', texto: 'Fogo', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        grass: { class: 'grama', texto: 'Grama', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        ice: { class: 'gelo', texto: 'Gelo', fundo: `url('img/fundos/gelo.jpeg') no-repeat center`},
        bug: { class: 'inseto', texto: 'Inseto', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        fighting: { class: 'lutador', texto: 'Lutador', fundo: `url('img/fundos/ringue.jpg') no-repeat center`},
        normal:  { class: 'normal', texto: 'Normal', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        rock: { class: 'pedra', texto: 'Pedra', fundo: `url('img/fundos/montanha.jpeg') no-repeat center`},
        psychic: { class: 'psiquico', texto: 'Psíquico', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        ground: { class: 'terrestre', texto: 'Terrestre', fundo: `url('img/fundos/montanha.jpeg') no-repeat center`},
        poison: { class: 'veneno', texto: 'Venenoso', fundo: `url('img/fundos/bosque.jpg') no-repeat center`},
        flying: {class: 'voador', texto: 'Voador', fundo: `url('img/fundos/sky.jpeg') no-repeat center`}
    };

    // Percorre os tipos define o fundo, a classe e o texto dos tipos
    tiposArray.forEach((tipo, indice) => {
        if(tiposPokemon[tipo]){
            const op = indice == 0 ? tipo1Pokemon : tipo2Pokemon;
            if(op){
                op.classList.add(tiposPokemon[tipo].class);
                op.textContent = tiposPokemon[tipo].texto;
            }
            

            if(indice == 0 && pokemonFundo){
                pokemonFundo.style.background = tiposPokemon[tipo].fundo;
                pokemonFundo.style.backgroundSize = "cover";
            }
        }
    });
}
