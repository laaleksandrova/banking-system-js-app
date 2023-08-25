import { el, setChildren }  from 'redom';
import Navigo from 'navigo';
import createHeader from './createHeader.js'
import createLoginPage from './createLoginPage.js';
import createUserAccountPage from './createUserAccountPage.js';
import createAccountDetailsPage from './createAccountDetailsPage.js';
import createDetailsHistoryPage from './createDetailsHistoryPage.js';
import createCurrenciesPage from './createCurrenciesPage.js';
import createATMCard from './createATMCard.js';
import autocompleteAccountNumber from './autocompleteAccountNumber.js';
import createPreloader from './preloader.js';
import { getChangedCurrency } from './bankApi.js';
// import Choices from 'choices.js';
import './assets/fonts/fonts.scss';
import './main.scss';

// логин и пароль
const login = 'developer';
const password = 'skillbox';

const main  = el('main', {class: 'container', id: 'main'});
const header  = createHeader();
const preloader = createPreloader();

setChildren(window.document.body, [
  preloader,
  header.header,
  main
]);

// добавление анимации загрузки страницы
header.header.style.display = "none";
main.style.display = "none";

function delayFunction() {
  setTimeout(showPage(), 3000);
}
function showPage() {
  preloader.style.display = "none";
  header.header.style.display = "block";
  main.style.display  = "block";
}
window.onload = () => {
  delayFunction()
}

// подключение socket
let socket = await getChangedCurrency();

// подключение router
export const router = new Navigo('/', { hash: true });
router.on('/', () => {
   const loginPage = createLoginPage();
   setChildren(main, loginPage.loginsSection);
   header.headerNav.classList.add('visually-hidden')
 })
router.on('/accounts', async () => {
  let prop ;
  let userAccountPage = await createUserAccountPage(login, password, 'amount');
  setChildren(main, userAccountPage.userAccountSection);
  header.headerNav.classList.remove('visually-hidden');
  //  подключаем Choices
  //  const element = document.querySelector('.js-choice');
  //  const choices = new Choices(element, {
  //    searchEnabled: false,
  //    itemSelectText: '',
  //  });
  // сортировка
  userAccountPage.choicesUserAccount.addEventListener('change', async function(event) {
    prop = `${event.target.value}`;
    console.log(prop);
    let userAccountPage = await createUserAccountPage(login, password, prop);
    setChildren(main, userAccountPage.userAccountSection);
  });
 })
router.on('/account/:id', async function ({ data: { id }}) {
  const accountDetailsPage = await createAccountDetailsPage(id, login, password);
  setChildren(main, accountDetailsPage.accountDetailsSection);
  header.headerNav.classList.remove('visually-hidden'); 
  //подключаем автодополнение по использовавшимся счетам получателя из localStorage
  await autocompleteAccountNumber();
 })
router.on('/account/:id/details', async function ({ data: { id }}) {
  const detailsHistoryPage = await createDetailsHistoryPage(id, login, password);
  setChildren(main, detailsHistoryPage.detailsHistorySection);
  header.headerNav.classList.remove('visually-hidden'); 
 })
router.on('/banks', async () => {
  const atmCard =  await createATMCard();
  setChildren(main, atmCard.atmCardSection);
  header.headerNav.classList.remove('visually-hidden'); 
 })
router.on('/currencies', async () => {
  const currenciesPage = await createCurrenciesPage(login, password, socket);
  setChildren(main, currenciesPage.currenciesSection);
  header.headerNav.classList.remove('visually-hidden'); 
 }, {
  befor(done) {
    socket.open()
    console.log("[open] Соединение установлено");
    // console.log(socket)
    // socket.onopen = function() {
    //   console.log("[open] Соединение установлено");
    // }
    done();
  },
  leave(done) {
    socket.close(1000, "работа закончена");
    console.log('[close] Соединение прервано');
    done();
  }
 })
router.resolve();

