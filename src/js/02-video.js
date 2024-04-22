import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Urmăresc evenimentul 'timeupdate' și actualizez timpul de redare în spațiul de stocare local
player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000) // Actualizez timpul de redare nu mai mult de o dată pe secundă
);

// La reîncărcarea paginii, folosesc metoda setCurrentTime() pentru a relua redarea de la poziția salvată
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
