import './main.scss';
import './assets/fonts/fonts.scss';
import { el, setChildren,}  from 'redom';
import ymaps from 'ymaps';
import { getBanks } from './bankApi.js';

export default  async function createATMCard() {
    const atmCardSection = el('section', {class: 'atm-card'}),
    atmCardContainer =  el('div', {class: 'container atm-card__container'}),
    atmCardTitle =   el('h1', {class: 'atm-card__title'}, 'Карта банкоматов'),
    mapCardContainer  = el('div', {class: 'map-container', id: 'map-container', style: 'width: 1290px; height: 728px;'});

    let banksData = await getBanks();
    let data = banksData.payload.map(row => [row.lat, row.lon]);

    ymaps
   .load('https://api-maps.yandex.ru/2.1/?apikey=68c8e306-d182-436b-b5f3-fdbdbed17356&lang=ru_RU')   // Key   68c8e306-d182-436b-b5f3-fdbdbed17356
   .then(ymaps => {
      const map = new ymaps.Map('map-container', {
          center: [55.76, 37.64],
          zoom: 10
      }, {
          searchControlProvider: 'yandex#search'
      });
      for (let item of data) {
          map.geoObjects.add(new ymaps.Placemark(item, {
            balloonContent: 'Coin'
        }));
      }
    })
   .catch(error => console.log('Failed to load Yandex Maps', error));

   setChildren(atmCardContainer, [atmCardTitle, mapCardContainer]);
   setChildren(atmCardSection, atmCardContainer);

    return {
      atmCardSection,
      mapCardContainer,
      ymaps
    }
}

