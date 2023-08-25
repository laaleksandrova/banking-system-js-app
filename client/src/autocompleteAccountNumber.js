import './main.scss';
import './assets/fonts/fonts.scss';

export default async function autocompleteAccountNumber() {
    const label = document.getElementById('select-label');
    const inputAccount = document.getElementById('accouts-select');
    let autocompleteList = document.getElementById('accouts-list');
    let accountValue = inputAccount.value.trim();

    //автодополнение по использовавшимся счетам получателя из localStorage
    let savedAccounts = JSON.parse(localStorage.getItem('accoutsDataArray')) || [];
    inputAccount.addEventListener('input', (event) => {
        event.preventDefault();

     if (autocompleteList) {
        autocompleteList.remove();
     }

     if (accountValue) {
        autocompleteList = document.createElement('ul');
        autocompleteList.id = 'accouts-list';

        for (let i = 0; i < savedAccounts.length; i++) {
            if (savedAccounts[i].startsWith(accountValue)) {
                const autocompleteItem =  document.createElement('li');
                autocompleteItem.classList.add('accouts-select__item')
                autocompleteItem.textContent = savedAccounts[i];
                autocompleteItem.addEventListener('click', () => {
                    inputAccount.value = autocompleteItem.textContent;

                    autocompleteList.remove();
                });
                autocompleteList.append(autocompleteItem);
            }
        }
        label.append(autocompleteList);
     }
    });

    // запоминаем использованный счёт получателя в localStorage для дальнейшего участия в автодополнении
    if (!savedAccounts.includes(accountValue) && accountValue !== '') {
        savedAccounts.push(accountValue);
    }
    localStorage.setItem("accoutsDataArray", JSON.stringify(savedAccounts));
}
