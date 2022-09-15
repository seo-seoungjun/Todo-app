const el = document.querySelectorAll('.drag');

let elPosition = [];
let drag = false;

const POSITION_KEY = 'position'

elArray = Array.from(el);

console.log(elArray)

elArray.forEach((item) => {

    item.addEventListener('mousedown', (event) => {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;

        drag = true;
        item.style.position = 'absolute';
        item.style.cursor = 'grabbing';

        function onMouseMove(event) {
            const clientX = event.clientX;
            const clientY = event.clientY;

            if(drag){
                item.style.top = `${clientY - offsetY}px`;
                item.style.left = `${clientX - offsetX}px`;
            }
        };
    
        document.addEventListener("mousemove", onMouseMove);
    
        item.addEventListener('mouseup', () => {
            item.style.cursor = 'grab';
            drag = false;
            document.removeEventListener('mousemove', onMouseMove);
        });
    
    });
    
});

function saveElPosition(){
    localStorage.setItem(POSITION_KEY, JSON.stringify(elPosition));
};

const loadElposition = localStorage.getItem(POSITION_KEY);

//저장된 엘리먼트의 위치값이 있으면 불러온다.
//if문은 엘리먼트의 위치 초기값이 변경된 엘리먼트에만 포지션을 부여해준다.
//css에서 모든 drag 엘리먼트의 left와 top값을 주면 없어도 된다.

if(loadElposition !== null){
    for(let i = 0; i < elArray.length; i++){
        elPosition = JSON.parse(loadElposition);
        elArray[i].style.top = elPosition[i].top;
        elArray[i].style.left = elPosition[i].left;
        if(elArray[i].style.top !== "" && elArray[i].style.left !== ""){
            elArray[i].style.position = 'absolute';
        }
    };
};


for(let i = 0; i < elArray.length; i++){

    //엘리먼트의 위치 초기값을 저장해준다.

    let positionObj = {
        top: elArray[i].style.top,
        left: elArray[i].style.left,
    }

    elPosition[i] = positionObj;

    saveElPosition();

    //엘리먼트가 drag로 이동되어 변경된 위치값을 저장해준다.

    elArray[i].addEventListener('mouseup', () => {
        positionObj = {
            top: elArray[i].style.top,
            left: elArray[i].style.left,
        };
        elPosition[i] = positionObj;

        saveElPosition();
    });

};

