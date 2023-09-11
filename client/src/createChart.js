import { getAccount } from './bankApi.js';
import getMonthlyBalance from './getMonthlyBalance.js';
import Chart from 'chart.js/auto';

export default async function createChart(id, token = 'ZGV2ZWxvcGVyOnNraWxsYm94', count = -12) { 
  const accountData = await getAccount(id, token)
    .then(response => response.payload);
  const balanceData =  getMonthlyBalance(accountData);
  const data = balanceData.slice(count);

  let maxBalance = Math.max(...data.map(row => row.amount));
  let minBalance = Math.min(...data.map(row => row.amount));;
  if (maxBalance ===  minBalance) {
   minBalance = 0;
  }

  new Chart(
    document.getElementById('acquisitions'),
    {
        type: "bar", //  тип графика
        data: {
          // данные для графика
          labels: data.map(row => row.month), // Метки для оси X (названия месяцев)
          datasets: [
            {
              label: "Баланс за последние 6 месяцев", // Подпись для набора данных
              data: data.map(row => row.amount), // Данные для оси Y (значения баланса)
              backgroundColor: "rgba(17, 106, 204, 1)", // Цвет фона столбцов
              borderColor: "rgba(17, 106, 204, 1)", // Цвет границы столбцов
              borderWidth: 1 // Толщина границы столбцов
            }
          ]
        },
        options: {
          plugins: {
            legend: false,
            chartAreaBorder: {
                borderColor: "rgba(17, 106, 204, 1)",
                borderWidth: 1,
            }
          },
          scales: {
            // Настройка шкалы для осей X и Y
            y: {
              beginAtZero: true,
              grace: '10%',
              drawBorder: false,
              grid: { display: false },
              position: 'right',
              min: 0, //  минимальное значение 
              max: maxBalance, // максимальное значение 
              ticks: {
                maxTicksLimit: 4,
                tickBorderDash: 0,
                padding: 24,
                backdropPadding: {x: 40, y: 4},
               }
            },
            x: {
              grid: { display: false},
              drawBorder: false,
            }
          }
        }
      }
    );
}
