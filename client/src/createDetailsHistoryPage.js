import './main.scss';
import './assets/fonts/fonts.scss';
import { el, setChildren,}  from 'redom';
import { autorization, getAccount } from './bankApi.js';
import { formatNumber } from './utils.js';
import createChart from './createChart.js';
import createChartRatio from './createChartRatio.js';
import createTransferHistoryTable from './createTransferHistoryTable.js';
import { router } from './main.js';

export default async function createAccountDetailsPage(id, login, password) {
    // получение данных
    const token = await autorization(login, password)
        .then(response => response.payload.token)
    const  accoutDetailsData = await getAccount(id, token)
        .then(response => response.payload);
    let transferHistoryTable = await createTransferHistoryTable(id, token, -25);
    // отрисовка
    const detailsHistorySection = el('section', {class: 'detail-history'}),
          detailsHistorysContainer =  el('div', {class: 'container detail-history__container'}),
          historyTitileContainer = el('div', {class: 'flex detail-history___container--title'}),
          historyTitileLeftContainer = el('div'),
          historyTitileLeftTitle = el('h1', {class: 'detail-history__title'}, 'История баланса'),
          historyTitileLeftText = el('p', {class: 'detail-history__text--title-left'}, `№ ${accoutDetailsData.account}`),
          historyTitileRightContainer = el('div'),
          historyTitileRighButton = el('a', {
            class: 'detail-history_button--back btn',
            href: `/account/${id}`,
            'data-navigo': '',
            onclick(event) {
                event.preventDefault();
                router.navigate(event.target.getAttribute('href'));
            },
            }, 'Вернуться назад'),
          historyTitileRightText = el('p', {class: 'detail-history__text--title-right'}, 'Баланс'),
          historyTitileRightSpan = el('span', {class: 'account-details__span--title-right'}, `${formatNumber(accoutDetailsData.balance)}`),

          historyTopContainer = el('div', {class: 'detail-history__container--top', onload: `${createChart(id, token, -12)}`}, [
            el('h3', {class: 'detail-history__title--top'}, 'Динамика баланса'),
            el('canvas', {width: "1200", height: "260", id: 'acquisitions'}),
        ]),

          historyCentreContainer = el('div', {class: 'detail-history__container--centre' ,  onload: `${createChartRatio(id, token, -12)}`}, [
            el('h3', {class: 'detail-history__title--center'}, 'Соотношение входящих исходящих транзакций'),
            el('canvas', {width: "1200", height: "260", id: 'chart-ratio'}),
        ]),

          historyBottomContainer = el('div', {class: 'detail-history__container--bottom'}, [
            el('h3', {class: 'detail-history__title--cente'}, 'История переводов'),
            el('div', (transferHistoryTable.table)),
        ]);

    setChildren(historyTitileRightContainer, [historyTitileRighButton , historyTitileRightText, historyTitileRightSpan])
    setChildren(historyTitileLeftContainer, [historyTitileLeftTitle, historyTitileLeftText]);
    setChildren(historyTitileContainer, [historyTitileLeftContainer, historyTitileRightContainer ]);
    setChildren(detailsHistorysContainer, [historyTitileContainer, historyTopContainer, historyCentreContainer, historyBottomContainer ]);
    setChildren(detailsHistorySection,  detailsHistorysContainer);

   return {
    detailsHistorySection,
   }
}