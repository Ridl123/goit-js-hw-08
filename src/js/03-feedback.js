const _ = require('lodash');
const formFeedback = document.querySelector('.feedback-form');

// Salvez valorile câmpurilor în local storage la fiecare modificare
formFeedback.addEventListener(
  'input',
  _.throttle(() => {
    const formInfo = {
      email: formFeedback.elements.email.value,
      message: formFeedback.elements.message.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formInfo));
  }, 500)
);

// Verific starea local storage-ului la încărcarea paginii și completez câmpurile formularului cu aceste date sau le las goale
document.addEventListener('DOMContentLoaded', () => {
  const parsedInfo = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!parsedInfo) {
    formFeedback.elements.email.value = '';
    formFeedback.elements.message.value = '';
  } else {
    formFeedback.elements.email.value = parsedInfo.email;
    formFeedback.elements.message.value = parsedInfo.message;
  }
});

// La trimiterea formularului, șterg datele din local storage și afișez în consolă obiectul cu câmpurile email și message
formFeedback.addEventListener('submit', e => {
  e.preventDefault();

  const parsedInfo = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(parsedInfo);

  localStorage.removeItem('feedback-form-state');
  formFeedback.reset();
});
