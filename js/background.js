const images = ["01.jpg","02.jpg","03.jpg","04.jpg"];
const image = images[Math.floor(Math.random()*images.length)];

const main = document.querySelector("main");
const bgimg = document.createElement("img");

bgimg.id = 'bgimg'

bgimg.src = `img/${image}`;

main.appendChild(bgimg);



// const main = document.querySelector("main");


// main.style.backgroundImage = `url(img/${image})`;


