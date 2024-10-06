@extends('layout.master')
@section('titulo', 'Início')
@push('js')
    <script src="{{ asset('js/pokedex-api.js')}}"> </script>
    <script src="{{ asset('js/pokemon-random.js')}}"> </script>
    <script src="{{ asset('js/pokedex-cards.js')}}"> </script>
@endpush

@section('conteudo')
    <div class="container_capa">
        <img src="{{asset('img/pokebolas/wpp_pokemon_1.jpg')}}" class="img_capa">
        <div class="camada_capa"></div>
        <img src="{{asset('img/logo_pokemon.png')}}" class="logo_capa">
    </div>

    <div id="divPokemon">
        <div class="pokemon_random_card">
            <img src="{{asset('img/pokebolas/fundo_pokebola.png')}}" class="pokebola_detalhe">
            <div class="fundo_pokemon">
                <img src="{{asset('img/interrogacao.png')}}" class="pokemon_random">
            </div>
            <div class="info_pokemon">
                <div class="id_pokemon">
                    <span class="nome_pokemon"></span>
                    <span class="numero_pokemon"></span>
                </div>
                <div class="detalhes_pokemon">
                    <div class="conjunto_detalhes">
                        <div>
                            <span class="antecedente">Tipo(s):</span> 
                            <span id="tipo1" class="tipo"></span>
                            <span id="tipo2" class="tipo"></span>
                        </div>
                        <div>
                            <span class="antecedente"> Habilidade(s): </span> <span id="habilidades" class="texto"></span>
                        </div>
                    </div>
                    <div class="conjunto_detalhes">
                        <div>
                            <span class="antecedente"> Gênero(s): </span> 
                            <span id="spanGeneros" class="texto">
                                <span id="macho">%</span>♂ — <span id="femea">%</span>♀ 
                            </span>
                        </div>
                        <div class="conteudos_detalhes_pokemon">
                            <div class="conteudo_pokemon">
                                <span id="altura" class="conteudo_pokemon_num"></span>
                                <span class="conteudo_pokemon_subtitulo"> Altura </span>
                            </div>
                            <div class="conteudo_pokemon">
                                <span id="peso" class="conteudo_pokemon_num"></span>
                                <span class="conteudo_pokemon_subtitulo"> Peso </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="secao_cards_pokemon">
        <div class="top_secao">
            <div class="top_inicio">
                <input onkeypress="clickEnter(event)" type="text" title="barra de pesquisa" class="pesquisa_pokemon" placeholder="Pesquise pelo número ou nome do pokémon">
            </div>
            <div class="top_titulo">
                Pokédex
            </div>
            <div class="top_end">
                <button id="menuBotão" title="tipos" type="menu" class="ordem_pokemon">
                    Tipos
                    <i class="bi bi-caret-down-fill"></i>
                </button>
                <div id="menuTipos" class="menu_tipos">
                    <ol id="listaTipos" class="lista_tipos">
                        <li> <span id="grass" title="grama" class="grama item"></span> </li>
                        <li> <span id="poison" title="veneno" class="veneno item"></span> </li>
                        <li> <span id="flying" title="voador" class="voador item"></span> </li>
                        <li> <span id="fire" title="fogo" class="fogo item"></span> </li>
                        <li> <span id="water" title="agua" class="agua item"></span> </li>
                        <li> <span id="normal" title="normal" class="normal item"></span> </li>
                        <li> <span id="electric" title="eletrico" class="eletrico item"></span> </li>
                        <li> <span id="ice" title="gelo" class="gelo item"></span> </li>
                        <li> <span id="ground" title="terrestre" class="terrestre item"></span> </li>
                        <li> <span id="fighting" title="lutador" class="lutador item"></span> </li>
                        <li> <span id="psychic" title="psíquico" class="psiquico item"></span> </li>
                        <li> <span id="rock" title="pedra" class="pedra item"></span> </li>
                        <li> <span id="bug" title="inseto" class="inseto item"></span> </li>
                        <li> <span id="ghost" title="fantasma" class="fantasma item"></span> </li>
                        <li> <span id="steel" title="aco" class="aco item"></span> </li>
                        <li> <span id="dragon" title="dragao" class="dragao item"></span> </li>
                        <li> <span id="fairy" title="fada" class="fada item"></span> </li>
                        <li id="tipoTodos" class="item"> Todos </li>
                    </ol>
                </div>
            </div>
        </div>

        <div id="divPokedex" class="pokedex"></div>
        <div class="divPagina">
            <button id="btnAnt" class="btn_pagina hidden" title="Anterior"> <i class="bi bi-arrow-left-circle-fill icon_pagina"></i> Anterior </button>
            <button id="btnProx" class="btn_pagina" title="Próximo"> Próximo <i class="bi bi-arrow-right-circle-fill icon_pagina"></i> </button>
        </div>
    </div>

    <div id="modal"></div>
    

@push('js-baixo')
    <script src="{{ asset('js/pokemon-extras.js')}}"> </script>
@endpush

@endsection