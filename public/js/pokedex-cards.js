document.addEventListener('DOMContentLoaded', function(){
    const divPokedex = document.getElementById('divPokedex');
    divPokedex.style.display = 'flex';
    divPokedex.style.justifyContent = 'center';
    divPokedex.innerHTML = `<i title="carregando..." class="carregar_pokebola"></i>`

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
    poison: '#DDA0DD',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#FFB6C1',
    flying: '#6495ED',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    ghost: '#B484FA',
    ice: ' #ADD8E6',
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
        imgPoke.title = pokemon.nome;
        imgPoke.onclick = () => renderizarModal(pokemon);
        imgPoke.style.cursor = 'pointer';


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

function renderizarModal(pokemon){
    let tipos = pokemon.tipos.split(', ');

    const divModal = document.getElementById('modal');
    divModal.classList.add('divModal');

    const modalPokemon = document.createElement('div');
    modalPokemon.classList.add('modal_pokemon');
    modalPokemon.style.background = colors[tipos[0]];

    const modalTop = document.createElement('div');
    modalTop.classList.add('modal-top')

    const modalTitulo = document.createElement('div');
    modalTitulo.classList.add('modal-titulo');

    const divSeparador1 = document.createElement('div');

    const nomeModal = document.createElement('span');
    nomeModal.style.fontWeight = 600;
    nomeModal.textContent = pokemon.nome;
    nomeModal.style.textTransform = 'capitalize';

    const numModal = document.createElement('span');
    numModal.style.color = 'rgb(94, 94, 94)';
    numModal.textContent = ` #${("000" + pokemon.id).slice(-3)}`;

    const divSeparador2 = document.createElement('div');

    const modalTipo1 = document.createElement('span');
    modalTipo1.classList.add('tipo_card');
    divSeparador2.appendChild(modalTipo1);

    if(tipos.length == 2){
        const modalTipo2 = document.createElement('span');
        modalTipo2.classList.add('tipo_card');
        classTipos(pokemon.tipos, modalTipo1, modalTipo2);
        divSeparador2.appendChild(modalTipo2);
    }
    else {
        classTipos(pokemon.tipos, modalTipo1);
    }

    const btnFechar = document.createElement('button');
    btnFechar.classList.add('btn_fechar');
    btnFechar.innerHTML = '<i class="bi bi-x-lg"></i>';
    btnFechar.onclick = () => {
        divModal.removeChild(modalPokemon);
        divModal.classList.remove('divModal');
    };

    const modalDivImg = document.createElement('div');
    modalDivImg.classList.add('img_pokedex');

    const modalImg = document.createElement('img');
    modalImg.src = pokemon.sprite;
    modalImg.title = pokemon.nome;

    const modalMeio = document.createElement('div');
    modalMeio.classList.add('modal-meio-detalhes');

    const modalHab = document.createElement('div');
    modalHab.classList.add ('habilidade_modal');

    const tituloHab = document.createElement('span');
    tituloHab.style.fontWeight = 600;
    tituloHab.textContent = 'Habilidade(s):'
    
    const modalHabs = document.createElement('span');
    modalHabs.textContent = capitalizeHabilidades(pokemon.habilidades);
    modalHabs.classList.add('habilidades_centralizar')

    const modalInfo = document.createElement('div');
    modalInfo.classList.add('info_modal');

    const modalConteudo1 = document.createElement('div');
    modalConteudo1.classList.add('conteudo_pokemon');

    const modalConteudoNum1 = document.createElement('div');
    modalConteudoNum1.classList.add('conteudo_pokemon_num');
    modalConteudoNum1.textContent = `${pokemon.altura / 10}m`

    const modalConteudoSub1 = document.createElement('div');
    modalConteudoSub1.classList.add('conteudo_pokemon_subtitulo')
    modalConteudoSub1.textContent = 'Altura';

    const modalConteudo2 = document.createElement('div');
    modalConteudo2.classList.add('conteudo_pokemon');

    const modalConteudoNum2 = document.createElement('div');
    modalConteudoNum2.classList.add('conteudo_pokemon_num');
    modalConteudoNum2.textContent = `${pokemon.peso / 10}Kg`

    const modalConteudoSub2 = document.createElement('div');
    modalConteudoSub2.classList.add('conteudo_pokemon_subtitulo')
    modalConteudoSub2.textContent = 'Peso';

    const modalBottom = document.createElement('div');
    modalBottom.classList.add('modal-bottom');

    divSeparador1.appendChild(nomeModal);
    divSeparador1.appendChild(numModal);

    modalTitulo.appendChild(divSeparador1);
    modalTitulo.appendChild(divSeparador2);

    modalTop.appendChild(modalTitulo);
    modalTop.appendChild(btnFechar);

    modalDivImg.appendChild(modalImg);

    modalHab.appendChild(tituloHab);
    modalHab.appendChild(modalHabs);

    modalConteudo1.appendChild(modalConteudoNum1);
    modalConteudo1.appendChild(modalConteudoSub1);

    modalConteudo2.appendChild(modalConteudoNum2);
    modalConteudo2.appendChild(modalConteudoSub2);

    modalInfo.appendChild(modalConteudo1);
    modalInfo.appendChild(modalConteudo2);

    if(pokemon.genero == -1){
        const modalConteudo3 = document.createElement('div');
        modalConteudo3.classList.add('conteudo_pokemon');

        const modalConteudoNum3 = document.createElement('div');
        modalConteudoNum3.classList.add('conteudo_pokemon_num');
        modalConteudoNum3.textContent = 'Sem Gênero';

        const modalConteudoSub3 = document.createElement('div');
        modalConteudoSub3.classList.add('conteudo_pokemon_subtitulo')
        modalConteudoSub3.textContent = 'Gênero';

        modalConteudo3.appendChild(modalConteudoNum3);
        modalConteudo3.appendChild(modalConteudoSub3);
        modalInfo.appendChild(modalConteudo3);
    }
    else {    
        let calcGeneroF = (pokemon.genero/8)*100;
        let calcGeneroM = 100 - calcGeneroF;

        const modalConteudo3 = document.createElement('div');
        modalConteudo3.classList.add('conteudo_pokemon');

        const modalConteudoNum3 = document.createElement('div');
        modalConteudoNum3.classList.add('conteudo_pokemon_num');
        modalConteudoNum3.textContent = calcGeneroM + '%';

        const modalConteudoSub3 = document.createElement('div');
        modalConteudoSub3.classList.add('conteudo_pokemon_subtitulo')
        modalConteudoSub3.textContent = 'Macho';

        const modalConteudo4 = document.createElement('div');
        modalConteudo4.classList.add('conteudo_pokemon');

        const modalConteudoNum4 = document.createElement('div');
        modalConteudoNum4.classList.add('conteudo_pokemon_num');
        modalConteudoNum4.textContent = calcGeneroF + '%';

        const modalConteudoSub4 = document.createElement('div');
        modalConteudoSub4.classList.add('conteudo_pokemon_subtitulo')
        modalConteudoSub4.textContent = 'Fêmea';
        
        modalConteudo3.appendChild(modalConteudoNum3);
        modalConteudo3.appendChild(modalConteudoSub3);
        modalInfo.appendChild(modalConteudo3);
    
        modalConteudo4.appendChild(modalConteudoNum4);
        modalConteudo4.appendChild(modalConteudoSub4);
        modalInfo.appendChild(modalConteudo4);
    }

    modalMeio.appendChild(modalHab);
    modalMeio.appendChild(modalInfo);

    modalPokemon.appendChild(modalTop);
    modalPokemon.appendChild(modalDivImg);
    modalPokemon.appendChild(modalMeio);
    modalPokemon.appendChild(modalBottom);

    divModal.appendChild(modalPokemon);
}