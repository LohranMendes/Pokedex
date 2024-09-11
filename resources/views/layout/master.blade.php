<!DOCTYPE html>
<html>
    <head>
        @include('layout.head')
        <title>@yield('titulo')</title>
        @stack('js')
    </head>

    <body>
        @include('layout.header')

        @yield('conteudo')

        @include('layout.footer')
    </body>
</html>