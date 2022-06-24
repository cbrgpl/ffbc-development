# General project rules:

	- Принцип именования actions:
		- actionName
			Значит, что значение полученное из сервиса будет прокидываться в store

		- outActionName
			Значит, что значение полученное из сервиса будет возвращаться вызывающей функции

	- Использование браузерных storage(sessionStorage, localStorage):
		В случае необходимости использования какого-то ключа для storage используйте один из ключей объект
		STORAGE_NAMES, который является полем consts; В случае если необходимого ключа там нет, создайте новую пару
		storageNameMeaning: storageNameValue;

		Пример:
		REFRESH_TOKEN: 'var_refreshToken'

		ИСПОЛЬЗОВАНИЕ УСТАНОВКИ КЛЮЧА ПРИ ПОМОЩИ СТРОКИ СТРОГО ЗАПРЕЩАЕТСЯ!

<br><br><br><br>

# Project run:

<br>

### Для запуска в режиме разработчика `npm run serve`

<br>

### Чтобы сбилдить проект `npm run build`

<br><br><br><br>

# Linters:

<br>

### Фикс vue-cli-service `npm run lint`

<br>

### Проверка stylelint `npm run stylelint`

<br>

### Фикс stylelint `npm run stylelint-fix`

<br><br><br><br>

# Project directory map:

- src/
	- assets/
		- images/
		- scss/
			- libs/ - дирректория для подключения scss/css библиотек

	- components/
		- atomic/ - атомарные компоненты
		- composite/ - компоненты, состоящие из других компонентов

	- enums/ - папка для структур, содержащих какие-то фиксированные опции
		- info/ - наборы статичных данных на сайте
		- icons/
		- nav/
			- router.* - файлы, экспортирующие объекты для описания навигации с помощью роутера
			- tabs.* - файлы, экспортирующие объекты для описания навигации между вкладками
		- consts.js - файл со список констант для проекта

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
		- partials/ - составные слои
		- singletons/ - слои-синглтоны
			- DialogLayout/
				- partial/ - дирректория в подсистемах

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

<br><br><br><br>

# Git Rules:

<br>

## Issues:

<br>

1. Если Issue успешно закрывается: <br>

2. Если Issue закрывается не успешно: <br>
	Повесьте лэйбл wontfix и объясните причину закрытия issue

3. Если Issue была исправлена кем-то другим и вы не знаете где искать этот коммит: <br>
	Напишите, что Issue уже была исправлена, ссылка на коммит потеряна

<br><br>

## Возможные task-type:

<br>

	- fix
	- feat
	- rework

<br><br>

## Branches:

1. При создании новой ветки используйте следующий паттер "task-type/name"

<br><br>

## Commits:

<br>

1. При коммите используйте следующий паттерн "task-type(область работы): содержание" <br>

<br><br>

## Pull Requests:

<br>

1. В случае, если вы начали работу над одним функционалом и плавно незаметно выполнили еще несколько задач, то разделите всю работу на несколько веток вручную, после чего создайте несколько Pull Request'ов. Не нужно перегружать один пулл огромными массивами кода.

**Инструкция будет позже...**

<br><br><br><br>

# Project util services API:

## Console

<br>

#### **object( object, title 	)**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| object | Object | undefined | Object that should be displayed in console |
| title | String | empty string | String before object |

<br><br>

#### **log( message )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| message | string | undefined | Message that should be displayed in console |

<br><br>

#### **error ( message )**; **warn ( message )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| message | string | undefined | Message with separators that should be highlighted and displayed in console |

**separator by default is "^"**

Use **Console.separator** property to change separator symbol;

<br><br>



## Dialog

Insterted[^inserted_in_app] service;

<br>

#### **register ( dialogName )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| dialogName | string | undefined | The name of dialog; Binds to component and helps to manipulate with dialog component throw the interface |

<br><br>

#### **show( dialogName, modal )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| dialogName | string | undefined | The name of dialog which will be shown |
| modal | boolean | true | The flag that controls whether or not display dialog window wrapper with background or not |

<br><br>

#### **hide( dialogName )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| dialogName | string | undefined | The name of dialog which will be hidden |

<br><br>

### **addWatcher( dialogName, watcher, watcherOptions )**

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| dialogName | string | undefined | The name of dialog which will be watched |
| watcherCallback | function | null | The function which will be called at dialog visibility changes |
| watcherOptions | object | {} | Vue watcher options |

<br>

#### *watcherCallback( { newValue, oldValue, unwatch } )*

| Arg | Type | Description |
| --- | --- | --- |
| newValue | any  | New value of watched value |
| oldValue | any | Old value of watched value |
| unwatch | function | The function which stops watcher |

<br><br><br><br>

## MediaViewOverlay

Insterted[^inserted_in_app] service;

<br>

#### **show( mediaSrc, mediaType )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| mediaSrc | string  | undefined | The src url of media resource |
|mediaType | string | undefined | The type of media |

**Available types of media:**
- image
- video

<br><br><br><br>

## Toast

Insterted[^inserted_in_app] service;

<br>

#### **warn( { sumary, detail, life } )**
#### **success( { sumary, detail, life } )**
#### **error( { sumary, detail, life } )**
#### **info( { sumary, detail, life } )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| summary | string  | undefined | toast title  |
|detail | string | undefined | toast detail message |
| life | number | undefined | Time of live of toast in ms |

<br><br>

#### **remove( id )**

<br>

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| id | number | undefined | ID of toast that must be deleted  |

<br><br><br><br>

## Reactive observer

<br>

That is a module which expose class to observe intersection of vue components (that is using [intersection observing](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) as a core);

You need to create singleton on component level (that means there is no need to recreate it each time, when component renders) and bind it to $options, then you need to expose directive to vue component

```js
import { ReactiveObserver } from '../reactiveObserver'

const reactiveObserver = new ReactiveObserver()

export default {
	name: 'SomeComponentName',
	reactiveObserver,
	directives: {
		observable: reactiveObserver.directive,
	}
}
```

### API

<br>

#### **init(root, rootMargin, thershold)**

Initialize observer

| Arg | Type | Default |
| --- | --- | --- |
| root | Element or Document or null  | null |
| rootMargin | string | '0px 0px 0px 0px' |
| threshold | number | 0.0 |

[args decription](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

<br>

#### **observe()**

Starts to observe elements **CALL ONLY AFTER init() method**

<br>

#### **unobserve()**

Call to stop observing, reset instance state

<br>

#### **get schema**

Returns object which describes which components has seen

Example:
```js
{
	1: true,
	2: true,
	3: false
}
```

<br>

#### **get directive**

Returns vue directive. You need to pass unique value in it. That value used to describe schema

```html
<div :key="i" v-for="(item, i) of items" v-observable="i">
	{{ item }}
</div>
```

<br>

#### **get inited**

Flag which means inited or not

<br><br><br><br>

## Pagination Page

Used to implement pagination in some component. Encapsulates pagination logic in it and expose some public methods and event to load new data.

### Props


| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| itemCount | Number or null  | null | Total count of items |
| perPage | Number | 24 | Quantity of items per page |

### Emits
- setPage [page : number, perPage : number] - emits when need to load new content

### Methods

#### **setLoadingState( state : boolean )**

Sets inner loading state accordance to the `state` value

<br>

#### **setFirstPage()**

Emits `setPage` event with value of `firstPage` equal to 1

<br>

#### **scrollToTop()**

Scrolls first scrollable parent node to top

<br>

## Consts

All consts are available globally. See **src/helpers/app_configuration/consts/index.js** to explore all of them.

To add new const you need create variable in file on path which been mentioned above and add it to *consts* variable.

```js
const NEW_CONST = "NEW_CONST_VALUE"

const consts = deepFreeze({
	...,
	NEW_CONST
})
```

<br>

**All consts MUST BE named in uppercase kebab format!**

<br>

## Event Bus

### emit(eventName, ...args)

Emits event with passed name and pass there args.
Throws error if event name is not set.

| Arg | Type | Description |
| --- | --- | --- |
| eventName | String  | undefined |

<br>

### on(eventName, handler)

Adds handler to event. If handler is not a function throws error

| Arg | Type | Description |
| --- | --- | --- |
| eventName | String  | undefined |
| handler | Function | undefined |

<br>

### remove(eventName)

Removes all handlers for event

| Arg | Type | Description |
| --- | --- | --- |
| eventName | String  | undefined |

<br><br><br><br>

[^complex_operation]:
	Цепочка действий или запросов, смысл которой можно объяснить одни действием. <br>
	**Пример:** <br>
	*getUser* разделяется на 3 действия: getUserInfo; getUserOrders; getUserCart

[^pseudo_abstract_class]:
	Так как в JS нет механизма для создания абстрактного класса, то используется такое семантическое обозначение для классов, которые не должны использоваться в клиентском коде. Использование таких классов заключается в наследовании от них и создании разных вариаций потомков.

[^inserted_in_app]:
	Подразумевается, что сервис является частью app и может быть доступен внутри компонентов через this с помощью соответствующего интерфейса.
