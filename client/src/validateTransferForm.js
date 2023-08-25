import './main.scss';
import './assets/fonts/fonts.scss';

export default function validateForm() {
    const inputAccount = document.getElementById('accouts-select');
    const inputAmount = document.getElementById('transfer-amount');
    const alertSpan = document.getElementById('alert-span');

    let accountValue = inputAccount.value;
    let amountValue = inputAmount.value;
    //валидация
    if (!accountValue || !amountValue) {
        alertSpan.innerText = '';
        alertSpan.textContent = 'Пожалуйста, заполните все поля!';
        inputAccount.classList.add('alert-input');
        inputAmount.classList.add('alert-input');
        return
    } else if (amountValue <= 0) {
        alertSpan.innerText = '';
        alertSpan.textContent = 'Пожалуйста, введите положительную сумму!';
        inputAccount.classList.remove('alert-input');
        inputAmount.classList.add('alert-input');
        return
    } else  {
        alertSpan.innerText = '';
        inputAccount.classList.remove('alert-input');
        inputAmount.classList.remove('alert-input');
        console.log(`все верно!`)
    }
}