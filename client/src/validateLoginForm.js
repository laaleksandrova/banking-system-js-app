import './main.scss';
import './assets/fonts/fonts.scss';
import { router } from './main.js';

export default function validateLoginForm() {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const alert =   document.getElementById('login-alert');
    const button =   document.getElementById('login-button');

    // проверяем поля на пустоту
    if (!login.value || !password.value) {
        alert.innerText = '';
        alert.textContent = 'Пожалуйста, заполните поля логин и пароль';
        return
    } else {
        // длина логина и пароля не меньше 6 символов
        if (login.value.length < 6 || password.value.length < 6) {
            alert.innerText = '';
            alert.textContent = 'Логин и пароль должны быть не меньше 6 символов';
            return
        } else {
            // логин и пароль не содержат пробелов
            if (login.value.includes(" ") || password.value.includes(" ")) {
                alert.innerText = '';
                alert.textContent = 'Логин и пароль не должны содержать пробелов';
                return
            } else if (login.value === 'developer' && password.value === 'skillbox') {
                // все проверки пройдены, отправляем форму на сервер
                alert.innerText = '';
                button.setAttribute('href', '/accounts')
                button.setAttribute('data-navigo', '')
                router.navigate(`/accounts`);
            }
        }
    }
}