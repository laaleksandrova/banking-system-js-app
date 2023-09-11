import { el, setChildren } from 'redom';
import { autorization, getCurrencyAccounts, getKnownCurrencies, exchangeCurrency} from './bankApi.js';
import validateCurrenciesForm from './validateCurrenciesForm.js';
import { formatCurrency } from './utils.js';
import vector from './assets/images/vector.svg';
import './main.scss';
import './assets/fonts/fonts.scss';

export default async function createCurrenciesPage(login, password, socket) {
    const token = await autorization(login, password)
        .then(response => response.payload.token);
    const currencyAccountsData = await getCurrencyAccounts(token)
        .then(response => response.payload);
    const currencyAccountsArray = Object.values(currencyAccountsData); //возвращает массив значений
    const knownCurrency = await getKnownCurrencies()
        .then(response => response.payload);

    const currenciesSection = el('section', {class: 'currencies'}),
    currenciesContainer =  el('div', {class: 'container currencies__container'}),
    currenciesTitle =   el('h1', {class: 'currencies__title'}, 'Валютный обмен'),
    currenciesCenterContainer =  el('div', {class: 'currencies__container--center flex'}),
    currenciesLeftCenterContainer = el('div', {class: 'currencies__container--center-left'}),
    yourCurrenciesMainContainer = el('div', {class: 'your-currencies__container'}),
    yourCurrenciesTitle = el('h3', {class: 'your-currencies__title'}, 'Ваши валюты'),
    yourCurrenciesContainer = el('div'),

    changeCurrenciesContainer = el('div', {class: 'change-currencies__container'}, [
        el('h3', {class: 'change-currencies__title'}, 'Обмен валюты'),
        el('form', {class:'flex change-currencies__form', id: 'change-currencies-form'}, [
            el('div', [
                el('div',[
                    el('label', {for: 'сurrency-from', class: 'сurrency-from_label'}, [
                        el('span', {class: 'сurrency-from__span'}, 'Из'),
                        el('select', {class: 'сurrency-from__select', name: 'сurrency-from', id: 'сurrency-from'}, [
                            currencyAccountsArray.map(currency => el(
                            'option',
                            {value: `${currency.code}`},
                            `${currency.code}`))
                        ]),
                    ]),
                    el('label', {for: 'сurrency-to', class: 'сurrency-to_label'}, [
                        el('span', {class: 'сurrency-to__span'}, 'в'),
                        el('select', {class: 'сurrency-to__select', name: 'сurrency-to', id: 'сurrency-to'}, [
                            knownCurrency.map(currency => el(
                                'option',
                                {value: `${currency}`},
                                `${currency}`))
                        ]),
                    ]),
                ]),
                el('div', [
                    el('label', {for: 'change-amount', class: 'change-amount_label'}, [
                        el('span', {class: 'change-amount__span'}, 'Сумма'),
                        el('input', {class: 'change-amount__input', type: 'number', name: 'change-amount', id: 'change-amount'}),
                    ]),
                ]),
                el('div', {id: 'alert-span', class: 'alert-span'})
            ]),
            el('button', {
                id: 'currencies-button',
                class: 'change-currencies_button btn',
                async onclick(event) {
                    event.preventDefault();
                    validateCurrenciesForm(currencyAccountsArray);
                    let carrencyObj = {
                        from: document.getElementById('сurrency-from').value,
                        to: document.getElementById('сurrency-to').value,
                        amount: document.getElementById('change-amount').value,
                    }
                    try {
                        await exchangeCurrency(carrencyObj.from, carrencyObj.to, carrencyObj.amount, token)
                        .then((res) => {
                            if (res.playload !== null && document.getElementById('change-amount').value > 0 && res.error !== 'Overdraft prevented') {
                                 window.location.reload()
                            }
                        })
                    } catch(err) {
                        throw err
                    }
                },
            }, 'Обменять'),
        ]),
    ]),

    currenciesRightCenterContainer = el('div', {class: 'currencies__container--center-right currency-change__container'}), 
    currencyChangeTitle = el('h3', {class: 'currency-change__title'}, 'Изменение курсов в реальном времени'),
    socketContainer  = el('div',{class: 'socket-container', id: 'socket-container'});

    for (let item in currencyAccountsData) {
      let currencyAccountItem =  el('div', {class: 'flex currency-item__container'}, [
        el('div', {class: 'currency-item__container-left'}, `${item}`),
        el('div', {class: 'currency-item__container-center'}),
        el('div', {class: 'currency-item__container-right'}, `${formatCurrency(currencyAccountsData[item].amount)}`),
      ]);
      yourCurrenciesContainer.append(currencyAccountItem);
    }

    socket.onmessage = async function (event) {
        let savedSocket = JSON.parse(event.data);
        let socketItem =   el('div', {class: 'flex socket-item__container'}, [
            el('div', {class: 'socket-item__container-left'}, `${savedSocket.from}/${savedSocket.to}`),
            el('div', {class: 'socket-item__container-center', id: 'socket-dotted'}),
            el('div', {class: 'socket-item__container-right'}, `${formatCurrency(savedSocket.rate)}`),
            el('img', {class: 'socket-item__img', alt: 'Coin', src: vector, id: 'socket-img'},)
        ])
        socketContainer.prepend(socketItem);

        let soketImg =  document.getElementById('socket-img');
        let soketCenterContainer =  document.getElementById('socket-dotted');
        if (savedSocket.change === -1) {
            soketImg.classList.add('img-red');
            soketCenterContainer.classList.add('dotted-red');
        } else if (savedSocket.change === 1) {
            soketImg.classList.add('img-green');
            soketCenterContainer.classList.add('dotted-green');
        }
    }

    setChildren(currenciesRightCenterContainer, [currencyChangeTitle, socketContainer])
    setChildren(yourCurrenciesMainContainer, [yourCurrenciesTitle, yourCurrenciesContainer])
    setChildren(currenciesLeftCenterContainer, [yourCurrenciesMainContainer, changeCurrenciesContainer])
    setChildren(currenciesCenterContainer, [currenciesLeftCenterContainer, currenciesRightCenterContainer])
    setChildren(currenciesContainer, [currenciesTitle, currenciesCenterContainer]);
    setChildren(currenciesSection, currenciesContainer);

    return{
        currenciesSection,
    }
}