async function getPokemonsDetalhes(arrayPokemons, numInicial) {
    let resultados = [];

    for (const array of arrayPokemons) {
        const cacheDados = localStorage.getItem(`pokemon-${numInicial}`);

        if (cacheDados) {
            resultados.push(JSON.parse(cacheDados));
        } else {
            try {
                const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${array.name}`);
                const dadosPokemon = await resposta.json();

                const respostaGenero = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${array.name}`);
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
                };

                localStorage.setItem(`pokemon-${dadosPokemon.id}`, JSON.stringify(dadosCache));

                resultados.push(dadosCache);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os dados do Pokémon:', error);
            }
        }

        numInicial++;
    }

    console.log(resultados);
    return resultados;
}

async function getPokemon(limit = 12, offset = 0){
    const respostaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const jsonPokemons = await respostaPokemon.json();
    let numInicial = offset == 0 ? 1 : offset;

    return getPokemonsDetalhes(jsonPokemons.results, numInicial);
}

async function getPokemonRandom(){
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

            localStorage.setItem(`pokemon-${numAleatorio}`, JSON.stringify(dadosCache))
        
            return dadosCache;
        }   
        catch (error) {
            console.error('Ocorreu um erro ao buscar os dados do Pokémon:', error);
        }
    }
}