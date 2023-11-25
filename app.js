const image = document.getElementById('image');
const canvas = document.getElementById('canvas'); //캔버스 생성
const ctx = canvas.getContext('2d');
const imageContext = image.getContext('2d');

const SQURE_SIZE = 50;

const fubao = new Image();
fubao.src = "images/푸바오.png";
console.log(fubao);



fubao.onload = () => {
    imageContext.drawImage(fubao, 0, 0, 500, 500);
}



//이미지 위치 구하기
const imageTop = image.getBoundingClientRect().top;
const imageBottom = image.getBoundingClientRect().bottom;
const imageLeft = image.getBoundingClientRect().left;
const imageRight = image.getBoundingClientRect().right;


const drawImage = (xPos, yPos) => {
    // 이미지 그리기

    let dx = SQURE_SIZE * xPos;
    let dy = SQURE_SIZE * yPos;

    const imageWidth = imageRight - imageLeft;
    const imageHeight = imageBottom - imageTop;


    console.log(`dx:${dx} dy:${dy}`);

    //ctx.drawImage(park, dx, dy, 50, 50, dx, dy, 50, 50);
    //모자이크 하기
    const randomPixel = getRandomPixel(dx, dy);
    console.log(randomPixel);
    ctx.fillStyle = `rgb(${randomPixel.red},${randomPixel.green},${randomPixel.blue})`;
    ctx.fillRect(dx, dy, SQURE_SIZE, SQURE_SIZE);

    //document.body.appendChild(ctx.canvas);
}



canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    //console.log(`x:${x} y: ${y}`);

    const xPos = parseInt((x - imageLeft) / SQURE_SIZE); //왼쪽에서 몇번째 격자인지
    const yPos = parseInt((y - imageTop) / SQURE_SIZE); //위에서 몇번째 격자인지

    drawImage(xPos, yPos);
});

const getRandomPixel = (x, y) => {
    const randomX = x + parseInt(Math.random() * SQURE_SIZE);
    const randomY = y + parseInt(Math.random() * SQURE_SIZE);
    console.log(`randomX : ${randomX} randomY : ${randomY}`);
    console.log(`number?? ${typeof randomX}`);
    const imageData = imageContext.getImageData(randomX, randomY, 1, 1).data;
    console.log(imageData);
    return {
        red: imageData[0],
        green: imageData[1],
        blue: imageData[2]
    }


}


















