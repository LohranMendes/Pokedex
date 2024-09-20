@extends('layout.master')
@section('titulo', 'Início')
@push('js')
    <script src="{{ asset('js/pokedex-api.js')}}"> </script>
    <script src="{{ asset('js/pokemon-random.js')}}"> </script>
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
                    <div>
                        <span class="antecedente">Tipo(s):</span> 
                        <span id="tipo1" class="tipo"></span>
                        <span id="tipo2" class="tipo"></span>
                    </div>
                    <div>
                        <span class="antecedente"> Habilidade(s): </span> <span id="habilidades" class="texto"></span>
                    </div>
                    <div>
                        <span class="antecedente"> Gênero(s): </span> 
                        <span id="spanGeneros" class="texto">
                            <span id="macho">%</span> ♂ — <span id="femea">%</span> ♀ 
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

    <div id="secao_cards_pokemon">
        <div class="top_secao">
            <div>
                <input type="text" class="pesquisa_pokemon" placeholder="Pesquise pelo número ou nome do pokémon">
            </div>
            <div class="top_end">
                <label name="ordemPokemon" class="hidden"></label>
                <select class="ordem_pokemon">
                    <option value=""> Padrão </option>
                </select>
            </div>
        </div>

    </div>

@endsection