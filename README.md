# Проект "Банковская система хранения и операции над средствами"

## Функции

* Авторизация
* Управление счетами пользователя: создание нового счета, отображение списка счетов, отображение баланса, просмотр истории транзакций
* Переводы на счета или карты других пользователей
* Возможность производить валютные обмены
* Отображение банкоматов на карте

## Разделы веб-приложения

* Форма входа пользователя
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_1.png)
* Список счетов пользователя
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_2.png)
* Просмотр информации о существующей карте и форма для перевода средств
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_3.png)
* Подробная история баланса по карте
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_4.png)
* Мониторинг курса валют и валютные переводы
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_5.png)
* Страница отображения точек банкоматов на карте
  ![the banking system](https://github.com/laaleksandrova/banking-system-js-app/blob/master/system_images/image_6.png)

## Установка и запуск проекта

1. Клонируйте репозиторий с помощью команды `git clone <адрес репозитория>`.
2. Откройте отдельно папку server, в ней находится README.md по запуску сервера.
3. Откройте отдельно папку client.
4. Установите все необходимые зависимости с помощью команды `npm install`
5. В папке src хранится исходный код.
6. Запустите проект одним из способов:
  - в режиме development с помощью команды `npm run dev`,
  - в режиме production с помощью команды `npm run build`,
7. Откройте браузер и перейдите по адресу `http://localhost:9000`, чтобы увидеть результат

## Логин и пароль
На данный момент доступен только вход в следующий аккаунт:
* Логин: `developer`
* Пароль: `skillbox`

## Использование

* Для входа в систему пользователь должен ввести свой логин и пароль на экране авторизации. Проходит валидация на заполненность полей «Логин и пароль».
* После авторизации пользователь переходит в свой личный кабинет, где по умолчанию отображается список его счетов. На данной странице имеются следующие элементы:
  - Кнопка «Создать новый счёт» позволяет пользователю добавить новый счёт к своему профилю.
  - Кнопка «Открыть» на каждом счёте переводит пользователя на страницу подробного просмотра информации о счёте. 
  - Возможна сортировка по возрастанию по критериям: «Номер счёта», «Баланс», «Время последней транзакции».
* На странице подробного просмотра информации о счёте имеются следующие элементы:
   - Кнопка «Вернуться назад» возвращает пользователя на страницу со списком счетов.
   - Форма переводов, которая содержит:
      - поле для ввода номера счёта получателя(с автозаполнением по ранее использованным номерам получателей(localStorage))
	  - поле ввода суммы перевода
	  - кнопку для отправки перевода 
	Проходит валидация на заполненность полей.
	После отправки перевода номер счёта получателя сохраняется в localStorage для последующего автозаполнения.
   - График «Динамика баланса», который показывает изменение баланса данного счёта за последние 6 месяцев
   - «История переводов», отображет таблицу с 10 (или менее) последними транзакциями, связанными с текущим просматриваемым счётом.
  При нажатии на график баланса или историю переводов происходит переход в раздел с подробной историей баланса.
* На странице подробного просмотра истории баланса имеются следующие элементы:
  - Кнопка «Вернуться назад» возвращает на экран просмотра счёта.
  - График «Динамика баланса», который показывает изменение баланса данного счёта за последние 12 месяцев (или меньше, если данных не хватает)
  - График «Соотношение входящих и исходящих транзакций», на котором красная часть столбца отображает общую сумму расходных (отрицательных) транзакций в этом столбце, а зелёная часть столбца отображает общую сумму доходных (положительных) транзакций в этом столбце.
  - «История переводов», отображет таблицу из 25 (или менее)  последними транзакциями, связанными с текущим просматриваемым счётом.
* На странице валютный обмен пользователь может узнать о состоянии своих валютных счетов, изменении курсов валют и обменять одну валюту на другую.На данной странице имеются следующие элементы:
  - «Ваши валюты», где отображаются коды валют и текущие балансы пользователя.
  - «Изменение курсов в реальном времени», где показывается динамика курсов обмена валютных пар. Валютные пары разделяются слэшем.
  - «Обмен валюты». При переводе из одной валюты в другую проходит валидация на заполненность полей.
* На странице карта банкоматов отображается карта с местами, где находятся банкоматы, обслуживающие банк.

## Технологии и инструменты

* [chart.js] - библиотека для создания красивых и анимированных графиков на JavaScript
* [navigo]- минималистичный роутер для одностраничных приложений на JavaScript
* [redom] - быстрая и легкая библиотека для создания пользовательских интерфейсов с помощью JavaScript
* [ymaps] - сервис для работы с картами и геоданными от Яндекса
* [webpack] - сборщик модулей для современных JavaScript-приложений
* [eslint] - инструмент для анализа и исправления кода на JavaScript по заданным правилам
* [babel] - компилятор JavaScript, который позволяет использовать новые возможности языка в старых браузерах


