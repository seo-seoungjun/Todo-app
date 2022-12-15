const answersBtnwrap = document.querySelector('#answers-btn');
const answersBtn = document.querySelector('#answers-btn span');
const answersCollection = document.querySelector('#answers-collection');
const closeBtn = document.querySelector('.close-btn');

const CLASSNAME_ACTIVE = 'active';

answersBtnwrap.addEventListener('mousedown', () => {
  answersBtnwrap.style.transform = 'scale(0.95)';
});

import { removeEl, showEl } from './question.js';

answersBtnwrap.addEventListener('mouseup', () => {
  answersBtnwrap.style.transform = 'scale(1)';
});

answersBtn.addEventListener('mouseup', () => {
  removeEl(answersBtnwrap, 600);
  answersCollection.classList.add(CLASSNAME_ACTIVE);
});

closeBtn.addEventListener('mouseup', () => {
  showEl(answersBtnwrap);
  answersCollection.classList.remove(CLASSNAME_ACTIVE);
});
