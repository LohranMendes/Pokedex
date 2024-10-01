document.addEventListener('DOMContentLoaded', function(){
    renderizarPokemonCards();
});

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

async function renderizarPokemonCards(dados = null){
    let dadosPokemon;

    if(dados == null){
        dadosPokemon = await getPokemon();
    }
    else {
        dadosPokemon = await dados;
    }

    const divPokedex = document.getElementById('divPokedex');
    divPokedex.innerHTML = '';
    divPokedex.classList.add('pokedex');
    divPokedex.style.display = 'grid';
    divPokedex.style.removeProperty('justify-content');
    divPokedex.style.removeProperty('font-size');


    dadosPokemon.forEach(pokemon => {
        let tipos = pokemon.tipos.split(', ');

        const divCard = document.createElement('div');
        divCard.classList.add('card_pokedex');
        divCard.style.background = colors[tipos[0]];
        
        const divImg = document.createElement('div');
        divImg.classList.add('img_pokedex');

        const imgPoke = document.createElement('img');
        imgPoke.src = pokemon.sprite;

        const spanNum = document.createElement('span');
        spanNum.classList.add('numero_card_pokemon');
        spanNum.textContent = `#${("000" + pokemon.id).slice(-3)}`;

        const spanNome = document.createElement('span');
        spanNome.classList.add('nome_card_pokemon');
        spanNome.textContent = pokemon.nome;

        const divTipos = document.createElement('div');
        divTipos.classList.add('tipos_card');

        const spanTipo1 = document.createElement('span');
        spanTipo1.classList.add('tipo_card');
        divTipos.appendChild(spanTipo1);

        if(tipos.length == 2){
            const spanTipo2 = document.createElement('span');
            spanTipo2.classList.add('tipo_card');
            classTipos(pokemon.tipos, spanTipo1, spanTipo2);
            divTipos.appendChild(spanTipo2);
        }
        else {
            classTipos(pokemon.tipos, spanTipo1);
        }

        divImg.appendChild(imgPoke);

        divCard.appendChild(divImg);
        divCard.appendChild(spanNum);
        divCard.appendChild(spanNome);
        divCard.appendChild(divTipos);

        divPokedex.appendChild(divCard);
    });
};