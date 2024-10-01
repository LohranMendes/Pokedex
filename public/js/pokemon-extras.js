const menu = document.getElementById('menuBotão');
const menuTipos = document.getElementById('menuTipos')
const lista = document.getElementById('listaTipos');
let buscaDados; 

menu.addEventListener('click', function(){
    menuTipos.classList.toggle('active');
    menu.classList.toggle('active');
});

lista.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
        const tipoSelecionado = event.target.id;
        let resultTipos = getPokemonTipos(tipoSelecionado);
        renderizarPokemonCards(resultTipos);
    }

    if(event.target.tagName === 'LI'){
        renderizarPokemonCards();
    }
});

async function clickEnter(event){
    if(event.key == 'Enter'){
        if(event.target.value != ''){
            buscaDados = getBuscaPokemon(event.target.value);
            if(await buscaDados != -1){
                renderizarPokemonCards(buscaDados);
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
            }
        }
        else {
            renderizarPokemonCards();
        }

    }
}

