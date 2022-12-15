const questions = [
  '오늘 나에게 칭찬 한마디를 해주세요!',
  '오늘 나에게 100만원이 생긴다면 무엇을 할 것 인가요?',
  '오늘 재미있는 일은 무엇이 있있었나요?',
  '취미가 무엇인가요?',
  '오늘 하루를 요약해주세요',
  '오늘 먹고 싶은 음식이 있다면?!',
];

let todayAnswers = [];

const questionForm = document.querySelector('#question-form');
const questionFormWrap = document.querySelector('#question-form-wrapper');
const questionLabel = document.querySelector('#question-form label');
const questionInput = document.querySelector('#question-form textarea');

const TODAY_ANSWERS_KEY = 'todayAnswers';

//save question to localstorage

questionLabel.innerText =
  questions[Math.floor(Math.random() * questions.length)];

function showQuestionFormWrap() {
  questionFormWrap.classList.remove(CLASSNAME_HIDDEN);
}

import { setCookie, removeCookie } from './cookies.js';

//쿠키가 존재한다면 질문창을 띄우지 않는다.

function checkCookie(name) {
  const getCookie = document.cookie.split(';');
  for (let i = 0; i < getCookie.length; i++) {
    if (getCookie[i].indexOf(name) >= 0) {
    } else {
      showQuestionFormWrap();
    }
  }
}

const dayString = ['일', '월', '화', '수', '목', '금', '토'];

checkCookie('question');

const questionCheck = document.querySelector('#check-submit');
const yesBtn = document.querySelector('#yes-btn');
const noBtn = document.querySelector('#no-btn');

//inline block으로 인해 크기 변화 방지

questionFormWrap.style.width = `${questionFormWrap.clientWidth - 20}px`;
questionFormWrap.style.height = `${questionFormWrap.clientHeight - 40}px`;

export function removeEl(element, msTransition) {
  element.style.transition = `${msTransition}ms`;
  element.style.opacity = '0';
  setTimeout(() => element.classList.add(CLASSNAME_HIDDEN), msTransition);
}

export function showEl(element) {
  element.classList.remove(CLASSNAME_HIDDEN);
  setTimeout(() => (element.style.opacity = '1'), 10);
}

function saveTodayanswers() {
  localStorage.setItem(TODAY_ANSWERS_KEY, JSON.stringify(todayAnswers));
}

function paintAnswers(answersObj) {
  const collection = document.querySelector('#answers-wrapper');
  const div = document.createElement('div');
  const question = document.createElement('p');
  const answer = document.createElement('p');
  const date = document.createElement('p');

  question.id = 'question';
  answer.id = 'answer';
  date.id = 'day';

  question.innerText = answersObj.question;
  answer.innerText = answersObj.answer;
  date.innerText = answersObj.day;

  div.appendChild(question);
  div.appendChild(answer);
  div.appendChild(date);

  collection.appendChild(div);
}

yesBtn.addEventListener('click', () => {
  if (questionInput.value.length < 2) {
    removeEl(yesBtn, 500);
    removeEl(noBtn, 500);
    const p = document.querySelector('#check-submit p');
    const initialText = p.innerText;
    p.innerText = '조금만 더 자세하게 적어줘..!';
    setTimeout(() => removeEl(questionCheck, 1000), 1500);
    setTimeout(() => showEl(questionForm), 2000);
    setTimeout(() => {
      p.innerText = initialText;
      showEl(yesBtn);
      showEl(noBtn);
    }, 2500);
  } else {
    const todayAnswer = questionInput.value;
    questionInput.value = '';
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    let day = new Date().getDay();
    for (let i = 0; i < 7; i++) {
      if (day === i) {
        day = dayString[i];
      }
    }
    const todayAnswerObj = {
      question: questionLabel.innerText,
      answer: todayAnswer,
      day: `${year}년 ${month}월 ${date}일 ${day}`,
    };
    console.log(todayAnswers);
    todayAnswers.push(todayAnswerObj);
    saveTodayanswers();
    setCookie('question', 'answer', 1);
    removeEl(questionFormWrap, 1000);
    paintAnswers(todayAnswerObj);
  }
});

noBtn.addEventListener('click', () => {
  removeEl(questionCheck, 1000);
  showEl(questionForm);
});

//질문을 제출하면 그것을 배열과 로컬에 저장하고 쿠키를 생성해 하루간 질문지가 띄지 않게 하고 질문지를 지운다.
function onsubmitQuestion(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    showEl(questionCheck);
    removeEl(questionForm, 1000);
  }
}

questionForm.addEventListener('keydown', onsubmitQuestion);

const loadTodayAnswers = localStorage.getItem(TODAY_ANSWERS_KEY);

//load to question in localstorage

if (loadTodayAnswers !== null) {
  const parseTodayAnswers = JSON.parse(loadTodayAnswers);
  console.log(parseTodayAnswers);
  todayAnswers = parseTodayAnswers;
  todayAnswers.forEach((item) => paintAnswers(item));
}
