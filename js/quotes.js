const quotes = [
    {
        quote:"원래 좋고 나쁜 것은 다 생각하기 나름이다.",
        author:"윌리엄 셰익스피어",
    },
    {
        quote:"당신이 무엇을 꿈꿀 수 있다면, 당신은 그것을 할 수 있는 일이다.",
        author:"월트 디즈니",
    },
    {
        quote:"실패를 해서 배운것이 있다면 이또한 성공이다.",
        author:"말콤 포브스",
    },
    {
        quote:"당신은 움츠리기보다 활짝 피어나도록 만들어진 존재입니다.",
        author:"오프라 원프리",
    },
    {
        quote:"인내할 수 있는 사람은 그가 바라는 것은 무엇이든 손에 넣을 수 있다.",
        author:"벤자민 프랭클린",
    },
    {
        quote:"모든 기회에는 어려움이 있고, 모든 어려움에는 기회가 있다.",
        author:"시드로우 백스터",
    },
    {
        quote:"이길 수 있다고 생각한다면 이길 수 있다.",
        author:"윌리엄 해즐릿",
    },
    {
        quote:"평범한 날이여, 그대의 귀한 가치를 깨닫게 하여라",
        author:"매리 J.아이리언",
    },
    {
        quote:"수고했어 오늘도",
        author:"당신에게 하고 싶은 말",
    },
    {
        quote:"꿈은 이루어지기 전까지 꿈꾸는 사람을 가혹하게 다룬다.",
        author:"윈스터 처칠",
    }
];

//use Math. javascript API

const quote = document.querySelector("#quote p:first-child span");
const author = document.querySelector("#quote p:last-child span");

const todayQuote = quotes[Math.floor(Math.random()*quotes.length)];


quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;