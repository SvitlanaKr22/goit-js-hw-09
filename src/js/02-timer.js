// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Додай мінімальне оформлення елементів інтерфейсу для таймера.
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час
// в одному елементі інтерфейсу.
// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати,
// і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx: xx: xx: xx.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtnTimer = document.querySelector('button[data-start]');

const clock = {
  spanDay: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

startBtnTimer.setAttribute('disabled', false);
startBtnTimer.addEventListener('click', () => {
  timer.start();
});

const timer = {
  startTime: null,
  timerId: null,
  beginnerTime: { days: '00', hours: '00', minutes: '00', seconds: '00' },
  start() {
    if (!this.startTime) return;
    this.timerId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = timer.startTime - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.timerId);
        displayClock(this.beginnerTime);
        return;
      }

      const currentDateTimer = convertMs(deltaTime);
      displayClock(currentDateTimer);
      // console.log(currentDateTimer);
    }, 1000);
  },
};

function displayClock({ days, hours, minutes, seconds }) {
  let pad;
  pad = 2;
  if (days > 99) pad = 3;
  clock.spanDay.textContent = String(days).padStart(pad, '0');
  clock.spanHours.textContent = String(hours).padStart(2, '0');
  clock.spanMinutes.textContent = String(minutes).padStart(2, '0');
  clock.spanSeconds.textContent = String(seconds).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    timer.startTime = selectedDates[0];

    const currentTime = new Date();
    if (currentTime - timer.startTime > 0)
      Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    else {
      startBtnTimer.removeAttribute('disabled');
      input.style.color = 'tomato';
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
