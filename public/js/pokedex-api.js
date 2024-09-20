

function getPokemonRandom(){

}

async function getPokemon(){
    let numAleatorio = Math.floor(Math.random() * 151) + 1;
    const cacheDados = localStorage.getItem(`pokemon-${numAleatorio}`);

    if (cacheDados){
        return JSON.parse(cacheDados);
    }
    else {
        try {
            const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numAleatorio}`);
            const dadosPokemon = await resposta.json();

            const respostaGenero = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${numAleatorio}`);
            const dadosGenero = await respostaGenero.json();

            const dadosCache = {
                nome: dadosPokemon.name,
                id: dadosPokemon.id,
                genero: dadosGenero.gender_rate,
                tipos: dadosPokemon.types.map(typeInfo => typeInfo.type.name).join(', '),
                sprite: dadosPokemon.sprites.other.dream_world.front_default,
                habilidades: dadosPokemon.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name).join(', '),
                peso: dadosPokemon.weight,
                altura: dadosPokemon.height,
            }

            console.log(dadosPokemon);
            console.log(dadosCache);

            localStorage.setItem(`pokemon-${numAleatorio}`, JSON.stringify(dadosCache))
        
            return dadosCache;
        }   
        catch (error) {
            console.error('Ocorreu um erro ao buscar os dados do Pokémon:', error);
        }
    }
}