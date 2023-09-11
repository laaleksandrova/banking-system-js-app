import { getAccount } from './bankApi.js';
import getMonthlyBalance from './getMonthlyBalance.js';
import Chart from 'chart.js/auto';

export default async function createChartRatio(id, token = 'ZGV2ZWxvcGVyOnNraWxsYm94', count = -12) { // id, token = 'ZGV2ZWxvcGVyOnNraWxsYm94',
    const accountData = await getAccount(id, token)
      .then(response => response.payload);
    const balanceData =  getMonthlyBalance(accountData);
    const data = balanceData.slice(count);
    let maxBalance = Math.max(...data.map(row => row.income));
  
    new Chart(
        document.getElementById('chart-ratio'),
        {
            type: "bar", //  тип графика
            data: {
              // данные для графика
              labels: data.map(row => row.month), // Метки для оси X (названия месяцев)
              datasets: [
                {
                  data: data.map(row => row.income), // Данные для оси Y (значения баланса)
                  backgroundColor: "#76CA66", // Цвет фона столбцов
                  borderColor: "#76CA66", // Цвет границы столбцов
                  borderWidth: 1, // Толщина границы столбцов
                  fill: true,
                  stack: 'Stack 0',
                }, {
                    data: data.map(row => row.expense), // Данные для оси Y (значения баланса)
                    backgroundColor: "#FD4E5D", // Цвет фона столбцов
                    borderColor: "#FD4E5D", // Цвет границы столбцов
                    borderWidth: 1, // Толщина границы столбцов
                    fill: true,
                    stack: 'Stack 0',
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
                    maxTicksLimit: 3,
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


