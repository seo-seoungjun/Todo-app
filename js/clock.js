const clock = document.querySelector("#clock");

//use javascript Date API

function getclock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

//interval 설정 시간 만큼의 간격으로 계속 실행
getclock();
setInterval(getclock, 1000);