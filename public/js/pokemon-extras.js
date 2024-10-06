const menu = document.getElementById('menuBotão');
const menuTipos = document.getElementById('menuTipos')
const lista = document.getElementById('listaTipos');
const btnA = document.getElementById('btnAnt');
const btnP = document.getElementById('btnProx');
const limit = 12;
let buscaDados, offset = 0, dadosCards; 

menu.addEventListener('click', function(){
    menuTipos.classList.toggle('active');
    menu.classList.toggle('active');
});

lista.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
        tela_carregar();

        const tipoSelecionado = event.target.id;
        let resultTipos = getPokemonTipos(tipoSelecionado);
        renderizarPokemonCards(resultTipos);
        btnP.style.display = 'none';
        btnA.style.display = 'none';
        
    }

    if(event.target.tagName === 'LI'){
        renderizarPokemonCards();
        btnP.style.display = 'block';
        btnA.style.display = 'block';
    }
});

async function clickEnter(event){
    if(event.key == 'Enter'){
        if(event.target.value != ''){
            buscaDados = getBuscaPokemon(event.target.value);
            if(await buscaDados != -1){
                renderizarPokemonCards(buscaDados);
                btnP.style.display = 'none';
                btnA.style.display = 'none';
            }
            else {
                let divPokedex = document.getElementById('divPokedex');
                divPokedex.innerHTML = '';
                Object.assign(divPokedex.style, {
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 'clamp(1rem, 5vw, 2rem)'
                });
                

                let spanNF = document.createElement('span');
                spanNF.textContent = 'Nenhum pokémon encontrado.';

                divPokedex.appendChild(spanNF);
                btnP.style.display = 'none';
                btnA.style.display = 'none';
            }
        }
        else {
            renderizarPokemonCards();
            btnP.style.display = 'block';
        }
    }
}

btnP.addEventListener('click', async function(){
    tela_carregar();
    offset += 12;
    if(offset > (maxPokemon - limit)){
        const novoOffset = maxPokemon - limit;
        dadosCards = getPokemon(limit, novoOffset);
        renderizarPokemonCards(dadosCards);
        btnA.style.display = 'block';
        btnP.style.display = 'none';
    }
    else {
        dadosCards = getPokemon(limit, offset);
        renderizarPokemonCards(dadosCards);
        btnA.style.display = 'block';
    }
});

btnA.addEventListener('click', async function(){
    offset -= 12;
    tela_carregar();

    if(offset > 0){
        dadosCards = getPokemon(limit, offset);
        renderizarPokemonCards(dadosCards);
        btnA.style.display = 'block';
        btnP.style.display = 'block';
    }
    else {
        const novoOffset = 0;
        dadosCards = getPokemon(limit, novoOffset);
        renderizarPokemonCards(dadosCards);
        btnA.style.display = 'none';
        btnP.style.display = 'block';
    }
});

function tela_carregar(){
    const divPokedex = document.getElementById('divPokedex');
    divPokedex.style.display = 'flex';
    divPokedex.style.justifyContent = 'center';
    divPokedex.innerHTML = `<i title="carregando..." class="carregar_pokebola"></i>`;
}