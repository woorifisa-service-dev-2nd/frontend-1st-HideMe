const image = document.getElementById('image');
const canvas = document.getElementById('canvas'); //캔버스 생성
const ctx = canvas.getContext('2d');

const park = new Image();
park.src = 'images/박진영.jpeg';


//이미지 위치 구하기
const imageTop = image.getBoundingClientRect().top;
const imageBottom = image.getBoundingClientRect().bottom;
const imageLeft = image.getBoundingClientRect().left;
const imageRight = image.getBoundingClientRect().right;
//console.log(`${imageTop}  ${imageBottom} ${imageLeft} ${imageRight}`);


const drawImage = image.onload = (xPos, yPos) => {
    // 이미지 그리기

    let dx = 50 * xPos;
    let dy = 50 * yPos;

    const imageWidth = imageRight - imageLeft;
    const imageHeight = imageBottom - imageTop;


    console.log(`dx:${dx} dy:${dy}`);

    ctx.drawImage(park, dx, dy, 50, 50, dx, dy, 50, 50);
    //모자이크 하기

    document.body.appendChild(ctx.canvas);
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}


canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log(`x:${x} y: ${y}`);

    const xPos = parseInt((x - imageLeft) / 50); //왼쪽에서 몇번째 격자인지
    const yPos = parseInt((y - imageTop) / 50); //위에서 몇번째 격자인지
    //console.log(`${xPos} ${yPos}`);
    drawImage(xPos, yPos);
});















