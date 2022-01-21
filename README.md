# General project rules:

	- При создании новой ветки используйте следующий паттер "task-type/name"
	- При коммите используйте следующий паттерн "task-type(область работы): сообщение"
	- Возможные типы задач:
		- fix
		- feat
		- rework

<br>
<br>
<br>

# Project run:

### Для запуска в режиме разработчика `npm run serve`
<br>

### Чтобы сбилдить проект `npm run build`




<br>
<br>
<br>

# Project directory map:

- src/
	- assets/
		- fonts/
		- icons/
		- images/
		- scss/
			- libs/ - дирректория для подключения scss/css библиотек
	- components/
		- atomic/ - атомарные компоненты
		- composite/ - компоненты, состоящие из других компонентов
		- icons/ - дирректория для списка иконок
	- enums/ - папка для структур, содержащих какие-то фиксированные опции
		- info/ - для
		- nav/ - для навигации
		- schemas - диррктория для JSON-схем
		- consts.js - файл со список констант для проекта
		- tailwindConfig.colors.js - список цветов в tailwind
	- helpers/ - вспомогательный функционал
		- app_configuration/ - вспомогательные функции для конфигурации глобальных состояний
		- classes/ - вспомогательные классы
		- directives/
		- filters/
		- functions/ - функции, не относящиеся к другим категориям
		- js_utils/ - функции для работы с JS-типами данных
		- mixins/
		- validators/
	- layouts/
		- LayoutEmpty - layout без элементов
		- LayoutMain/ - главный layout
		- ...
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
