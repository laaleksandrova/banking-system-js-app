import { el, setChildren }  from 'redom';
import logo from './assets/images/logo.svg';
import { router } from './main.js';
import './main.scss';
import './assets/fonts/fonts.scss';

export default function createHeader() {
    const header = el('header', {class: 'header'}),
          headerContainer = el('div', {class: 'container header__container flex'}),
          headerLogo =  el('img', {class: 'header__logo', alt: 'Coin', src: logo}),
          headerNav = el('div', {class: 'header__nav'}),
          headerList = el('ul', {class: 'nav__list list-reset flex', id: 'header-nav'}),
          headerItemATMs = el('a', {
              class: 'nav__item btn',
              href: `/banks`,
              'data-navigo': '',
              onclick(event) {
                 event.preventDefault();
                 router.navigate(`/banks`);
                },
            }, 'Банкоматы'),
          headerItemAccouts = el('a', {
               class: 'nav__item btn',
               href: `/accounts`,
               'data-navigo': '',
               onclick(event) {
                  event.preventDefault();
                  router.navigate(`/accounts`);
                },
            }, 'Счета'),
          headerItemCurrency = el('a', {
               class: 'nav__item btn',
               href: `/currencies`,
               'data-navigo': '',
               onclick(event) {
                  event.preventDefault();
                  router.navigate(`/currencies`);
                 },
            }, 'Валюта'),
          headerItemExit = el('a', {
               class: 'nav__item btn',
               href: `/`,
               'data-navigo': '',
               onclick(event) {
                  event.preventDefault();
                  router.navigate(`/`);
                 },
            }, 'Выйти');

    setChildren(headerList, [headerItemATMs, headerItemAccouts, headerItemCurrency, headerItemExit])
    setChildren(headerNav, headerList)
    setChildren(headerContainer, [headerLogo, headerNav]);
    setChildren(header, headerContainer);

    return {
        header,
        headerContainer,
        headerLogo,
        headerNav
    }
}