@extends('layout.master')
@section('titulo', 'Início')

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
                <img src="{{asset('img/pokemons/bulbasaur.png')}}" class="pokemon_random">
            </div>
            <div class="info_pokemon">
                <div class="id_pokemon">
                    <span class="nome_pokemon"> Bulbassauro </span>
                    <span class="numero_pokemon"> #0001 </span>
                </div>
                <div class="detalhes_pokemon">
                    <div>
                        <span class="antecedente">Tipo(s):</span> <span class="tipo_grama">Grama</span> <span class="tipo_veneno">Veneno</span>
                    </div>
                    <div>
                        <span class="antecedente"> Habilidade(s): </span> <span class="texto">Chicote de videira, Crescimento, Folha de navalha, Síntese </span>
                    </div>
                    <div>
                        <span class="antecedente"> Gênero(s): </span> <span class="texto">87,5% ♂ — 12,5% ♀ </span>
                    </div>
                    <div class="conteudos_detalhes_pokemon">
                        <div class="conteudo_pokemon">
                            <span class="conteudo_pokemon_num"> 0.7m </span>
                            <span class="conteudo_pokemon_subtitulo"> Altura </span>
                        </div>
                        <div class="conteudo_pokemon">
                            <span class="conteudo_pokemon_num"> 6.9Kg </span>
                            <span class="conteudo_pokemon_subtitulo"> Peso </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mais_detalhes_pokemon">
            <div class="secao_detalhes_pokemon">
                <div class="secao_card">
                    <span class="secao_titulo_card"> Descrição </span>
                </div>
                <div class="triangulo"></div>
            </div>
            <div class="secao_detalhes_pokemon">
                <div class="secao_card">
                    <span class="secao_titulo_card"> Atributos </span>
                </div>
                <div class="triangulo"></div>
            </div>
            <div class="secao_detalhes_pokemon">
                <div class="secao_card">
                    <span class="secao_titulo_card"> Efetividade </span>
                </div>
                <div class="triangulo"></div>
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