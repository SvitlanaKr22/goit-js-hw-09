// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position), що створюється,
// і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу.
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  for (let i = 0; i < Number(amount.value); i++) {
    const delayCreate = Number(delay.value) + i * Number(step.value);
    const timeoutNotify = Number(amount.value) * Number(step.value);
    createPromise(i + 1, delayCreate)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: timeoutNotify,
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: timeoutNotify,
          clickToClose: true,
        });
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
