import './assets/fonts/fonts.scss';
import Choices from 'choices.js';
import './main.scss';
import { el, setChildren }  from 'redom';
import { router } from './main.js';
import { getAccounts, autorization, createAccount } from './bankApi.js';
import { formatNumber } from './utils.js';
import { sortAccoutsList } from './sortAccoutsList.js';

export default async function createUserAccountPage(login, password, prop) {
  const token = await autorization(login, password)
        .then(response => response.payload.token);
  const data  =  await getAccounts(token)
        .then(response => response.payload);

  let accoutsData = sortAccoutsList(data, prop , false)
  console.log(accoutsData)

  const userAccountSection = el('section', {class: 'user-account'}),
        containerUserAccount =  el('div', {class: 'container user-account__container'}),
        containerTopUserAccount = el('div', {class: 'flex user-account__container--top'}),
        containerTitleChoicesUserAccount = el('div', {class: 'flex'}),
        titleUserAccount =   el('h1', {class: 'user-account__title'}, 'Ваши счета'),
        choicesUserAccount = el('select', {class: 'js-choice', id: 'my-select'}), 
        choicesUserAccountOpt1 = el('option', {value: ' ', selected: 'selected'},'Сортировка'),
        choicesUserAccountOpt2 = el('option',  {value: 'account', id: 'option-number'}, 'По номеру'),
        choicesUserAccountOpt3 =   el('option', {value: 'balance', id: 'option-balance'}, 'По балансу'),
        choicesUserAccountOpt4 =  el('option', {value: 'amount',  id: 'option-transaction'},  'По последней транзакции'),
        newUserAccountButton =  el('a', {
          class: 'user-account_button--new btn',
          href: `#`,
          onclick(event) {
              event.preventDefault();
              createAccount(token);
              window.location.reload();
          },
        }, 'Создать новый счет'),
        listUserAccount =  el('div', {class: 'user-account__list flex'});

        for (let item of accoutsData) {
          const itemUserAccount = el('div', {class: 'user-account_item flex'}),
                itemUserAccountContainer = el('div'),
                itemUserAccountPAccount =  el('p', {class: 'user-account__item--account'}, item.account),
                itemUserAccountPBalance =  el('p', {class: 'user-account__item--balance'}),
                itemUserAccountPText =  el('p', {class: 'user-account__item--text'}, 'Последняя транзакция:'),
                itemUserAccountDate =  el('p', {class: 'user-account__item--date', id: 'account-item-date'}, '0'),
                itemUserAccountButton =  el('a', {
                  class: 'user-account_button btn',
                  href: `/account/${item.account}`,
                  'data-navigo': '',
                  onclick(event) {
                      event.preventDefault();
                      router.navigate(`/account/${item.account}`);
                  },
                }, 'Открыть');
          // проверяем наличие даты, меняем формат и отображаем
          item.transactions.findIndex(trans => {
            let date = new Date(trans.date);
            let options = {
              year: "numeric",
              month: "long",
              day: "numeric"
            }
            let formattedDate = date.toLocaleString("ru", options);
            itemUserAccountDate.textContent = formattedDate;
          })
          itemUserAccountPBalance.textContent = formatNumber(item.balance);

          listUserAccount.append(itemUserAccount);
          itemUserAccount.append(itemUserAccountContainer, itemUserAccountButton );
          itemUserAccountContainer.append(itemUserAccountPAccount, itemUserAccountPBalance, itemUserAccountPText, itemUserAccountDate)
        }

        setChildren(choicesUserAccount, [choicesUserAccountOpt1, choicesUserAccountOpt2, choicesUserAccountOpt3, choicesUserAccountOpt4])
        setChildren(containerTitleChoicesUserAccount, [titleUserAccount, choicesUserAccount]);
        setChildren(containerTopUserAccount, [containerTitleChoicesUserAccount, newUserAccountButton]);
        setChildren(containerUserAccount, [containerTopUserAccount, listUserAccount]);
        setChildren(userAccountSection, containerUserAccount);

        return {
          userAccountSection,
          containerUserAccount,
          listUserAccount,
          choicesUserAccount,
          choicesUserAccountOpt1,
          choicesUserAccountOpt2,
          choicesUserAccountOpt3,
          choicesUserAccountOpt4,
        }
}

