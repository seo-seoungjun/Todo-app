const loginForm = document.querySelector('#login-form');
const loginFormWarpper = document.querySelector('#login-form-wrapper');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const afterLogin = document.querySelector('#after-login');
//이벤트에 대한 정보 받아오기

const CLASSNAME_HIDDEN = 'hidden';
const USERNAME_KEY = 'userName';

function onLogin() {
  afterLogin.classList.remove(CLASSNAME_HIDDEN);
  afterLogin.style.animationPlayState = 'running';
}

onLogin();

// function onLoginSubmit(event) {
//   const userName = loginInput.value;
//   localStorage.setItem(USERNAME_KEY, userName);
//   loginFormWarpper.classList.add(CLASSNAME_HIDDEN);
//   paintgreeting(userName);
//   onLogin();
// }

// //can get userName from form or localStorage or anywhere

// function paintgreeting(userName) {
//   greeting.innerText = `Hello ${userName}`;
//   greeting.classList.remove(CLASSNAME_HIDDEN);
// }

// const getUserNameValue = localStorage.getItem(USERNAME_KEY);

// //check the login record

// if (getUserNameValue === null) {
//   loginFormWarpper.classList.remove(CLASSNAME_HIDDEN);
//   loginForm.addEventListener('submit', onLoginSubmit);
// } else {
//   onLogin();
//   paintgreeting(getUserNameValue);
// }
