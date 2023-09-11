import './main.scss';
import './assets/fonts/fonts.scss';

export default function validateCurrenciesForm(currencyAccountsArray) {
    const currencyFromAccount = document.getElementById('сurrency-from');
    const inputAmount = document.getElementById('change-amount');
    const alertSpan = document.getElementById('alert-span');

    let accountFromValue = currencyFromAccount.value;
    let amountValue = inputAmount.value;
    let currency = currencyAccountsArray.find(item => item.code ==  accountFromValue);
    //валидация
    if (!amountValue) {
        alertSpan.innerText = '';
        alertSpan.textContent = 'Пожалуйста, заполните все поля!';
        inputAmount.classList.add('alert-сurrency');
        return
    } else if (amountValue <= 0) {
        alertSpan.innerText = '';
        alertSpan.textContent = 'Пожалуйста, введите положительную сумму!';
        inputAmount.classList.add('alert-сurrency');
        return
    } else if (currency.amount < amountValue) {
        alertSpan.textContent = `Недостаточно средств на счете ${currency.code}`;
        inputAmount.classList.add('alert-сurrency');
        return
    } else  {
        alertSpan.innerText = '';
        inputAmount.classList.remove('alert-сurrency');
    }
};