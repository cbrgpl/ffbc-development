# General project rules:

	- Принцип именования actions:
		- actionName
			Значит, что значение полученное из сервиса будет прокидываться в store

		- outActionName
			Значит, что значение полученное из сервиса будет возвращаться вызывающей функции


	- Принцип именования файлов в .../router/helpers/:
		- Если файл экспортирует guard, то название генерируются следующим паттерном:
			guardName.guard

		- Если файл экспортирует сервисы для guard, то название генерируется следующим паттерном:
			guardName + ExportFunctionalName = guardNameExportFunctionalName

		- Пример:
			auth.guard.js
			authUpdateTokens.js

	- Использование браузерных storage(sessionStorage, localStorage):
		В случае необходимости использования какого-то ключа для storage используйте один из ключей объект
		STORAGE_NAMES, который является полем consts; В случае если необходимого ключа там нет, создайте новую пару
		storageNameMeaning: storageNameValue;

		Пример:
		REFRESH_TOKEN: 'var_refreshToken'

		ИСПОЛЬЗОВАНИЕ УСТАНОВКИ КЛЮЧА ПРИ ПОМОЩИ СТРОКИ СТРОГО ЗАПРЕЩАЕТСЯ!

</br></br></br></br>

# Project run:

</br>

### Для запуска в режиме разработчика `npm run serve`

<br>

### Чтобы сбилдить проект `npm run build`

</br></br></br></br>

# Linters:

</br>

### Фикс vue-cli-service `npm run lint`

<br>

### Проверка stylelint `npm run stylelint`

<br>

### Фикс stylelint `npm run stylelint-fix`

</br></br></br></br>

# Project directory map:

- src/
	- assets/
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
		- schemas - дирректория для JSON-схем
		- consts.js - файл со список констант для проекта
		- tailwindConfig.colors.js - список цветов в tailwind
	- helpers/ - вспомогательный функционал
		- app_configuration/ - вспомогательные функции для конфигурации глобальных состояний
		- classes/ - вспомогательные классы
		- command/ - Классы Комманды, использующися для комплексных операций[^complex_operation]
			- base_commands - псевдо-абстрактные[^pseudo_abstract_class] команды
		- directives/
		- errors/
			- base_errors/ - псевдо-абстрактные[^pseudo_abstract_class] ошибки
		- filters/
		- functions/ - функции, не относящиеся к другим категориям
		- js_utils/ - функции для работы с JS-типами данных
		- mixins/
		- plugins/ - самописные плагины для Vue
		- validators/
	- layouts/
		- DialogLayout/
			- partial/ - дирректория в которой содержатся все диалоги
			DialogLayout.vue
		- EmptyLayout/ - layout без элементов
		- MainLayout/ - главный layout
		- ...
	- router/
		- helpers/ - вспомогательный функционал для роутера
		- index.js
	- services/
		- service_metadata/ - дирректория для файлов, экспортирующих объекты описывающие метаданные сервиса, для его создания. 1 объект = 1 сервис
		- index.js
	- store/
		- modules/ - модули
		- index.js
	- views/
		- Shop/ - директория для views, относящихся к shop

</br></br></br></br>

# Git Rules:

</br>

## Issues:

</br>

1. Если Issue успешно закрывается: </br>
	Перед закрытием указывайте коммит, в котором она была решена, можно использовать следующий паттерн: </br>
	Поправил в коммите 986ee1a

2. Если Issue закрывается не успешно: </br>
	Повесьте лэйбл wontfix и объясните причину закрытия issue

3. Если Issue была исправлена кем-то другим и вы не знаете где искать этот коммит: </br>
	Напишите, что Issue уже была исправлена, ссылка на коммит потеряна

</br></br>

## Возможные task-type:

</br>

	- fix
	- feat
	- rework

</br></br>

## Branches:

1. При создании новой ветки используйте следующий паттер "task-type/name"

</br></br>

## Commits:

</br>

1. При коммите используйте следующий паттерн "task-type(область работы): сообщение" </br>

</br></br>

## Pull Requests:

</br>

1. В случае, если вы начали работу над одним функционалом и плавно незаметно выполнили еще несколько задач, то разделите всю работу на несколько веток вручную, после чего создайте несколько Pull Request'ов. Не нужно перегружать один пулл огромными массивами кода.

**Инструкция будет позже...**

</br></br></br></br>

# Project service classes API:

## Console

</br>

#### object( object, title 	)

</br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| object | Object | undefined | Object that should be displayed in console |
| title | String | empty string | String before object |

</br></br>

#### log( message )

</br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| message | string | undefined | Message that should be displayed in console |

</br></br>

#### error ( message ); warn ( message )

</br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| message | string | undefined | Message with separators that should be highlighted and displayed in console |

**separator by default is "^"**

Use **Console.separator** property to change separator symbol;

</br></br>

</br></br></br></br>

[^complex_operation]:
	Цепочка действий или запросов, смысл которой можно объяснить одни действием. </br>
	**Пример:** </br>
	*getUser* разделяется на 3 действия: getUserInfo; getUserOrders; getUserCart

[^pseudo_abstract_class]:
	Так как в JS нет механизма для создания абстрактного класса, то используется такое семантическое обозначение для классов, которые не должны использоваться в клиентском коде. Использование таких классов заключается в наследовании от них и создании разных вариаций потомков.
