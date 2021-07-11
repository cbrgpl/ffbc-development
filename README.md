
# That is base vue3 tailwind project

#### Project structure

- src/
	- assets/
		- fonts/
		- icons/
		- images/
		- scss/
	- components/
		- atomic/ - атомарные компоненты
		- composite/ - компоненты, состоящие из других компонентов
	- enums/ - папка для структур, содержащих какие-то фиксированные опции
		- custom/ - любой другой
		- info/ - для отображения информации
		- nav/ - для навигации
		- CONSTS.js
	- helpers/ - каждая дирректория содержить index.js, который агреггирует весь функционал
		- classes/ - вспомогательные классы
		- directives/
		- filters/
		- functions/ - функции, не относящиеся к другим категориям
		- mixins/
		- validators/
	- layouts/
		- LayoutEmpty
		- LayoutMain
	- router/
		- helpers/ - вспомогательный функционал для роутера
		- index.js
	- services/
		- types/ - типы сервисов
		- endpoits.js
		- index.js
	- store/
		- modules/ - модули
		- index.js
	- views/
