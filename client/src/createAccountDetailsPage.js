import { el, setChildren,}  from 'redom';
import { autorization, getAccount, transferFunds } from './bankApi.js';
import { formatNumber } from './utils.js';
import createChart from './createChart.js';
import createTransferHistoryTable from './createTransferHistoryTable.js';
import validateForm from './validateTransferForm.js';
import './main.scss';
import './assets/fonts/fonts.scss';
import { router } from './main.js';

export default async function createAccountDetailsPage(id, login, password) {
    //получение данных
    const token = await autorization(login, password)
        .then(response => response.payload.token)
    const  accoutDetailsData = await getAccount(id, token)
        .then(response => response.payload);

    let transferHistoryTable = await createTransferHistoryTable(id, token, -10);

    //запись данных в localStorage
    let transactionsTo = accoutDetailsData.transactions.map(trans => trans.to)
    localStorage.setItem('accoutsDataArray', JSON.stringify(transactionsTo));

    //отрисовка
    const accountDetailsSection = el('section', {class: 'account-details'}),
          accountDetailsContainer =  el('div', {class: 'container account-details__container'}),
          detailsTopContainer = el('div', {class: 'flex account-details__container--top'}),
          detailsTopRightContainer = el('div'),
          detailsTopRightTitle = el('h1', {class: 'account-details__title'}, 'Просмотр счета'),
          detailsTopRightText = el('p', {class: 'account-details__text--top-right'}, `№ ${accoutDetailsData.account}`), 
          detailsTopLeftContainer = el('div'),
          detailsTopLeftButton = el('a', {
            class: 'account-details_button--back btn',
            href: `/accounts`,
            'data-navigo': '',
            onclick(event) {
                event.preventDefault();
                router.navigate(event.target.getAttribute('href'));
            },
            }, 'Вернуться назад'),
          detailsTopLeftText = el('p', {class: 'account-details__text--top-left'}, 'Баланс'),
          detailsTopLeftSpan = el('span', {class: 'account-details__text--top-left'}, `${formatNumber(accoutDetailsData.balance)}`);
    
    const detailsCentreContainer = el('div', {class: 'flex account-details__container--centre'}),
    detailsCentreRightContainer = el('div', {class: 'account-details__container--centre-right'}),
    detailsCentreRightTitle = el('h3', {class: 'account-details__title--center'}, 'Новый перевод'),
    detailsCentreRightForm =  el('form', {class: 'account-details__form', id: 'account-details-form' }, [
        el('label', {for: 'accouts-select', class: 'accouts-select__label', id: 'select-label'}, [
            el('span', {class: 'accouts-select__span'}, 'Номер счёта получателя'),
            el('input', {class: 'accouts-select__input', type: 'text',  name: 'accouts-select', id: 'accouts-select',}), // onload: `${await autocompleteAccountNumber()}`
            el('ul', {class: 'accouts-select__list', id: 'accouts-list'}),
        ]),
        el('label', {for: 'transfer-amount', class: 'transfer-amount_label'}, [
            el('span', {class: 'transfer-amount__span'}, 'Сумма перевода'),
            el('input', {class: 'transfer-amount__input', type: 'number', name: 'transfer-amount', id: 'transfer-amount'}),
        ]),
        el('p', {class: 'transfer-alert', id: 'alert-span'}),
        el('button', {
            class: 'btn transfer-amount_button',
            async onclick(event) {
               event.preventDefault();
               validateForm();
               let transferObj = {
                from: accoutDetailsData.account,
                to: document.getElementById('accouts-select').value,
                amount: document.getElementById('transfer-amount').value,
               }

               try {
                await transferFunds( transferObj.from, transferObj.to, transferObj.amount, token)
                .then((res) => {
                    console.log(res);
                    if (res.playload !== null && document.getElementById('transfer-amount').value > 0 && res.error !== 'Overdraft prevented') {
                         window.location.reload()
                    }
                })
               } catch(err) {
                throw err
               }
            },
        }, 'Отправить')
    ]),

    detailsCentreLeftContainer = el('div', {class: 'account-details__container--centre-left'}),
    detailsCentreLeftA = el('a', {
        href: `/account/${id}/details`, //
        'data-navigo': '',
        onclick(event) {
           event.preventDefault();
           router.navigate(`/account/${id}/details`);
        },
    }),
    detailsCentreLeftTitle = el('h3', {class: 'account-details__title--center'}, 'Динамика баланса'),
    detailsCentreLeftChart = el('div', {id: 'chart-container', onload: `${createChart(id, token, -6)}`},( //onload: `${createChart(balanceData)}`
        el('canvas', {width: "584", height: "200", id: 'acquisitions'})
    )),

    detailsBottomContainer = el('div', {class: 'account-details__container--bottom'}, (
        el('a', {
                href: `/account/${id}/details`,
                'data-navigo': '',
                onclick(event) {
                   event.preventDefault();
                   router.navigate(`/account/${id}/details`)
                  },
        }, [
            el('h3', {class: 'account-details__title--center'}, 'История переводов'),
            el('div', (transferHistoryTable.table)),
        ])
    ));

    setChildren(detailsCentreLeftA, [detailsCentreLeftTitle, detailsCentreLeftChart])
    setChildren(detailsCentreLeftContainer, detailsCentreLeftA)
    setChildren(detailsCentreRightContainer, [detailsCentreRightTitle, detailsCentreRightForm])
    setChildren(detailsCentreContainer, [ detailsCentreRightContainer, detailsCentreLeftContainer]);
    setChildren(detailsTopLeftContainer, [detailsTopLeftButton, detailsTopLeftText,  detailsTopLeftSpan]);
    setChildren(detailsTopRightContainer, [detailsTopRightTitle, detailsTopRightText]);
    setChildren(detailsTopContainer, [detailsTopRightContainer, detailsTopLeftContainer]);
    setChildren(accountDetailsContainer, [detailsTopContainer, detailsCentreContainer, detailsBottomContainer]);
    setChildren(accountDetailsSection,  accountDetailsContainer);

    return {
        accountDetailsSection,
        detailsCentreRightForm,
    }
}