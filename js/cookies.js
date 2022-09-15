export function setCookie(name, value, day){
    const date = new Date();
    date.setDate(date.getDate()+day);

    let newCookie = "";
    newCookie += `${name}=${value};`;
    newCookie += `expires=${date.toUTCString()};`;

    document.cookie = newCookie;
};

//쿠키의 기한을 현재시간을 기준으로 하루 전으로 설정하여 쿠키를 삭제한다.
export function removeCookie(name, value){
    const date = new Date();
    date.setDate(date.getDate()-1);

    let removeCookie = "";
    removeCookie += `${name}=${value};`;
    removeCookie += `expires=${date.toUTCString()};`;

    document.cookie = removeCookie;
};


// export function checkCookie(name, a, aa){
//     const getCookie = document.cookie.split(';');
//     for(let i = 0; i < getCookie.length; i++){
//         if(getCookie[i].indexOf(name) >= 0){
//             aa;
//         }else{
//             a
//         };
//     };
// };

