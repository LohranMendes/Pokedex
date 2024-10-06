const maxPokemon = 151;

async function getBuscaPokemon(input){
    const buscaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const respostaGeneroBusca = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${input}`);

    let resultados = [];

    if (buscaPokemon.ok) {
        const pokemonDados = await buscaPokemon.json(); 

        if (pokemonDados.id <= maxPokemon) {
            const dadosGenerosBusca = await respostaGeneroBusca.json();   
        
            const dadosCacheBusca = {
                nome: pokemonDados.name,
                id: pokemonDados.id,
                genero: dadosGenerosBusca.gender_rate,
                tipos: pokemonDados.types.map(typeInfo => typeInfo.type.name).join(', '),
                sprite: pokemonDados.sprites.other.dream_world.front_default,
                habilidades: pokemonDados.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name).join(', '),
                peso: pokemonDados.weight,
                altura: pokemonDados.height,
            };

            localStorage.setItem(`pokemon-${pokemonDados.id}`, JSON.stringify(dadosCacheBusca));

            resultados.push(dadosCacheBusca);
        
        }
        else {
            return -1;
        }
    }
    else {
        return -1;
    }

    return resultados;
}

async function getPokemonTipos(tipo){
    const respostaTipo = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const dadosTipo = await respostaTipo.json();

    let resultados = [];
    let arrayPokeTipos = dadosTipo.pokemon;

    arrayPokeTipos.forEach(async pokemons => {
        let numPokemonUrl = pokemons.pokemon.url.slice(-8);
        let numPokemonFormat = numPokemonUrl.replace(/\D/g, '');;

        if(numPokemonFormat <= maxPokemon){
            const cachePokesTipos = localStorage.getItem(`pokemon-${numPokemonFormat}`);

            if (cachePokesTipos) {
                resultados.push(JSON.parse(cachePokesTipos));
            } else {
                try {
                    const respostaPokeTipos = await fetch(`https://pokeapi.co/api/v2/pokemon/${numPokemonFormat}`);
                    const dadosPokeTipos = await respostaPokeTipos.json();

                    const respostaGeneroTipos = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${numPokemonFormat}`);
                    const dadosGeneroTipos = await respostaGeneroTipos.json();

                    const dadosCacheTipos = {
                        nome: dadosPokeTipos.name,
                        id: dadosPokeTipos.id,
                        genero: dadosGeneroTipos.gender_rate,
                        tipos: dadosPokeTipos.types.map(typeInfo => typeInfo.type.name).join(', '),
                        sprite: dadosPokeTipos.sprites.other.dream_world.front_default,
                        habilidades: dadosPokeTipos.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name).join(', '),
                        peso: dadosPokeTipos.weight,
                        altura: dadosPokeTipos.height,
                    };

                    localStorage.setItem(`pokemon-${dadosPokeTipos.id}`, JSON.stringify(dadosCacheTipos));

                    resultados.push(dadosCacheTipos);
                } catch (error) {
                    console.error('Ocorreu um erro ao buscar os dados do Pokémon:', error);
                }
            }
        }
        else {
            return;
        }
    });

    return resultados;
}

async function getPokemonsDetalhes(arrayPokemons, numInicial) {
    let resultados = [];

    if(numInicial != 1) {
        numInicial += 1;
    }
    
    for (const array of arrayPokemons) {

        const cacheDados = localStorage.getItem(`pokemon-${numInicial}`);

        if(numInicial <= maxPokemon){
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
    }
    
    return resultados;
}

async function getPokemon(limit = 12, offset = 0){
    const respostaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
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