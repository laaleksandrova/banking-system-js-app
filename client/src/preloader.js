import './main.scss';
import './assets/fonts/fonts.scss';
import { el }  from 'redom';

export default function createPreloader() {
    const preloaderBlock = el('div', {class: 'preloader', id: 'loader'});

    return preloaderBlock;
};