import './main.scss';
import './assets/fonts/fonts.scss';
import { el, setChildren }  from 'redom';
import validateLoginForm from './validateLoginForm.js';

export default function createLoginPage() {
    const loginsSection = el('section', {class: 'login'}),
          loginContainer = el('div', {class: 'container login__container'}),
          loginCenter = el('div',  {class: 'login__center'}),
          loginTitle = el('h2', {class: 'login_title'}, 'Вход в аккаунт'),
          loginForm = el('form', {class: 'login_form'}),
          loginLoginLabel = el('label', {for: 'login', class: 'login_label'}),
          loginLoginSpan = el('span', {class: 'login_span'}, 'Логин'),
          loginLoginInput = el('input', {class: 'login_input', type: 'text', name: 'login', id: 'login'}),
          loginPasswordLabel = el('label', {for: 'password', class: 'login_label'}),
          loginPasswordSpan = el('span', {class: 'login_span'}, 'Пароль'),
          loginPasswordInput = el('input', {class: 'login_input', type: 'password', name: 'password', id: 'password'}),
          loginAlertSpan = el('p', {class: 'login-alert red', id: 'login-alert'}),
          loginButton = el('a', {
                class: 'login_button btn-reset btn',
                id: 'login-button',
                onclick(event) {
                   event.preventDefault();
                   validateLoginForm()
                },
            }, 'Войти');

            loginLoginInput.value = 'developer';
            loginPasswordInput.value = 'skillbox';

   setChildren(loginPasswordLabel, [loginPasswordSpan,loginPasswordInput]);
   setChildren(loginLoginLabel, [loginLoginSpan, loginLoginInput]);
   setChildren(loginForm, [loginLoginLabel, loginPasswordLabel, loginAlertSpan, loginButton]);
   setChildren(loginCenter, [loginTitle, loginForm]);
   setChildren(loginContainer, loginCenter);
   setChildren(loginsSection, loginContainer);

   return  {
    loginsSection,
    loginContainer,
    loginCenter,
    loginTitle,
    loginForm,
    loginLoginLabel,
    loginPasswordLabel,
    loginButton,
    loginPasswordInput,
    loginLoginInput,
   }
};