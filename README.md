Для Front разработки:

1.  Установить зависимости `npm install`
2.  Работать в папке src, остальные папки не трогать!
3.  Список alias'ов:
    - "@" - путь с папки "src"
    - "@components" - путь с папки "components"
    - "@assets" - путь с папки "assets"
    - "@shared" - путь с папки "shared"
    - "@types" - путь с папки "types"
    - "@img" - путь с папки "img"
    - "@mixins" - доступ к папке sass "mixins.scss"
4.  Для работы с mixin'ами в компонентах, подключать таким образом:

    - @use '@mixins' as mixin;
    - .class {
    - @include mixin.mixinName(values)
    - }

5.  Шрифты, (Если автоматически не подключились):

    - font-family: var(--font-montserrat);
    - font-family: var(--font-inter);

6.  Svg спрайты:
    Чтобы создать svg спрайт нужно, в ваш файл с расширением .svg создать общий тег svg и внутри уже этого тега вставлять иконки вот так:
    - Для png,jpg,jpeg и других не вектроных форматов вставлять вот так:
    -
    -     <symbol id="undefinedPage" viewBox="0 0 24 24">
    -     <image xlink:href="(ваш путь до картинки)" width="24" height="24" />
    -     </symbol>
    -
    - Для векторных форматов:
    -
    -     <symbol id="favorites-icon-dark" viewBox="0 0 20 20">
    -      <path fill="currentColor" d="M9.9986 1.0657C11.5871 0.0114026 13.6972 -0.279863 15.5201 0.333435C19.4853 1.67592 20.7163 6.21412 19.6153 9.8252C17.9164 15.4967 10.6609 19.7272 10.3532 19.9046C10.2438 19.9682 10.1227 20 10.0015 20C9.8804 20 9.76024 19.9692 9.65082 19.9067C9.34505 19.7313 2.14232 15.5633 0.386813 9.82622C0.385836 9.82622 0.385836 9.8252 0.385836 9.8252C-0.716115 6.2131 0.51088 1.67387 4.47224 0.333435C6.33227 -0.298323 8.35935 -0.0203905 9.9986 1.0657ZM4.92162 1.79797C1.71638 2.88303 0.911412 6.50231 1.78184 9.35651C3.15146 13.8301 8.56255 17.4473 10.0006 18.3427C11.4434 17.4381 16.8936 13.7809 18.2193 9.36061C19.0897 6.50334 18.2818 2.88406 15.0717 1.79797C13.5164 1.27389 11.7023 1.59285 10.4499 2.61023C10.1881 2.8215 9.82471 2.8256 9.56095 2.61638C8.23431 1.56926 6.50128 1.26261 4.92162 1.79797ZM14.1339 3.83467C15.4654 4.28695 16.3983 5.52483 16.5126 6.98834C16.5449 7.4119 16.2449 7.78316 15.8415 7.81701C15.821 7.81906 15.8014 7.82008 15.7809 7.82008C15.4029 7.82008 15.0824 7.51549 15.0512 7.11346C14.9867 6.27043 14.4494 5.55867 13.6845 5.2992C13.2986 5.16793 13.0876 4.73411 13.2117 4.33105C13.3377 3.92697 13.747 3.7075 14.1339 3.83467Z" />
    -     </symbol>
    -
    - где path это ваш path векторной картинки
    -
    -
    -
    -
    -
7.  Стили для настройки соотношений сторон
    /_ 1:1 _/
    padding-top: 100%;

    /_ 4:3 _/
    padding-top: 75%;

    /_ 3:2 _/
    padding-top: 66.66%;

    /_ 8:5 _/
    padding-top: 62.5%;

    /_ 16:9 _/
    padding-top: 56.25%;
