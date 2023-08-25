import { formatMonth } from './utils.js';

export default function getMonthlyBalance(data) {
    // пустой массив для хранения результата
    let result = [];
    let income = 0;
    let expense = 0;
    const account = data.account;  // информация о счете
    let balance = 0; //  баланс счета data.balance
    const transactions = data.transactions; // массив транзакций счета
      // перебрать все транзакции счета
      for (let j = 0; j < transactions.length; j++) {
        let transaction = transactions[j];
        let amount = transaction.amount;
        let month = formatMonth(transaction.date); 
        let year = Number(transaction.date.split("-")[0]);
        // проверить, есть ли уже запись о балансе за этот месяц в массиве result
        let index = result.findIndex(item => item.month === month && item.year === year);
        if (index !== -1) {
          // если есть, то прибавить или вычесть сумму транзакции в зависимости от того, является ли счет отправителем или получателем
          if (transaction.from === account) {
            //  счет является отправителем
            result[index].amount = result[index].amount - amount;
            result[index].expense = result[index].expense + amount;
          } else if (transaction.to === account) {
            //  счет является получателем
            result[index].amount = result[index].amount + amount;
            result[index].income = result[index].income + amount;
          }
          balance = result[index].amount; // обновить значение начального баланса счета равным значению баланса за этот месяц
         } else {
          // если нет, то создать запись о балансе за этот месяц , равную начальному балансу счета плюс или минус сумма транзакции в зависимости от того, является ли счет отправителем или получателем
          let monthlyBalance = {
            year: year,
            month: month,
            amount: balance,
            income: income,
            expense: expense,
          };
          if (transaction.from === account) {
            // если счет является отправителем, то вычесть сумму транзакции из начального баланса
            monthlyBalance.amount =  monthlyBalance.amount - amount;
            monthlyBalance.expense = amount
          } else if (transaction.to === account) {
            // если счет является получателем, то прибавить сумму транзакции к начальному балансу
            monthlyBalance.amount =  monthlyBalance.amount + amount;
            monthlyBalance.income = amount
          }
          result.push(monthlyBalance);  // добавить объект monthlyBalance в массив result
        }
      }
    return result;
  }
