import './main.scss';
import './assets/fonts/fonts.scss';
import { el, setChildren,}  from 'redom';
import { getAccount } from './bankApi.js';
import { formatDateTable, formatNumber} from './utils.js';

export default async function createTransferHistoryTable(id, token = 'ZGV2ZWxvcGVyOnNraWxsYm94', count = -10) {
    const accountData = await getAccount(id, token)
    .then(response => response.payload);
    const transactions = accountData.transactions.slice(count);
    let tableAmount;

    const table = el('table'),
    tableHead = el('thead', {class: 'table-head'}, el(
        'tr',  {class: 'table-head__tr'}, [
            el('th',  {class: 'table-head__th'}, 'Счет отправителя'),
            el('th',  {class: 'table-head__th'}, 'Счет получателя'),
            el('th',  {class: 'table-head__th'}, 'Сумма'),
            el('th',  {class: 'table-head__th'}, 'Дата'),
        ]
    )),
    tableBody = el('tbody', {class: 'table-body'});
    for (let transaction of transactions) {
        let styleEl
        if (accountData.account === transaction.from) {
            tableAmount = `- ${transaction.amount}`;
            styleEl = 'red'
        }  else if (accountData.account === transaction.to) {
            tableAmount = `+ ${transaction.amount}`;
            styleEl = 'green'
        }
        let tableBodyTr = el(
            'tr',  {class: 'table-body__tr'}, [
                el('td',  {class: 'table-body__th'}, `${transaction.from}`),
                el('td',  {class: 'table-body__th'}, `${transaction.to}`),
                el('td',  {class: `table-body__th table-body__th--amount ${styleEl}`, id: 'table-amount'}, `${formatNumber(tableAmount)}`),
                el('td',  {class: 'table-body__th'}, `${formatDateTable(transaction.date)}`),
            ]
        )
        tableBody.append(tableBodyTr);
    }
    setChildren(table, [tableHead, tableBody]);

    return {
        table
    }
}