// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

const startBtn = document.querySelector('button[data-start');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timeId;

startBtn.addEventListener('click', startBtnClickHandler);
stopBtn.addEventListener('click', stopBtnClickHandler);

function startBtnClickHandler() {
  timeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  this.setAttribute('disabled', false);
}

function stopBtnClickHandler() {
  clearInterval(timeId);
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
