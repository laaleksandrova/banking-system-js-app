export function formatNumber(number) {
    const options = {
        style: "currency",
        currency: "RUB",
        currencyDisplay: "symbol"
      };
      const formattedNumber = number.toLocaleString("ru-RU", options);

      return formattedNumber
}

export function formatMonth(date) {
  const dateObject = new Date(date);
  const month = dateObject.toLocaleString("ru-RU", {month: "long"});

  return month
}

export function formatDateTable(date) {
  const dateObject = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }
  const formattedDate = dateObject.toLocaleString("ru-RU", options);

  return  formattedDate
}