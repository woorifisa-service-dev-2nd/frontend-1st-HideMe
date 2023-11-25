const image = document.getElementById('image'); //original 푸바오 사진을 위한 캔버스
const canvas = document.getElementById('canvas'); //모자이크 푸바오 사진을 위한 캔버스
const ctx = canvas.getContext('2d');
const imageContext = image.getContext('2d');

const SQURE_SIZE = 50;
const fin = new Set(); //모자이크가 완료된 구역을 담는 set

const fubao = new Image();
fubao.src = "images/푸바오.png";

//푸바오 사진 띄우기
fubao.onload = () => {
    imageContext.drawImage(fubao, 0, 0, 500, 500);
}


//구역을 나누기 위한 이미지 위치 구하기
const imageTop = image.getBoundingClientRect().top;
const imageLeft = image.getBoundingClientRect().left;

/**
 * 모자이크를 하는 함수
 * @param {number} xPos 모자이크를 할 구역이 왼쪽에서 몇번째 구역인지
 * @param {number} yPos 모자이크를 할 구역의 위에서 몇번째 구역인지
 */
const mosaic = (xPos, yPos) => {

    const dx = SQURE_SIZE * xPos; //실제 시작되는 x좌표값
    const dy = SQURE_SIZE * yPos; //실제 시작되는 y좌표값

    const randomPixel = getRandomPixel(dx, dy);
    ctx.fillStyle = `rgb(${randomPixel.red},${randomPixel.green},${randomPixel.blue})`;
    ctx.fillRect(dx, dy, SQURE_SIZE, SQURE_SIZE);

    fin.add(xPos.toString() + yPos.toString());

}


canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX; //현재 마우스 위치 x좌표
    const y = event.clientY; //현재 마우스 위치 y좌표

    const xPos = parseInt((x - imageLeft) / SQURE_SIZE); //왼쪽에서 몇번째 구역인지
    const yPos = parseInt((y - imageTop) / SQURE_SIZE); //위에서 몇번째 구역인지

    if (!checkDuplicate(xPos, yPos)) mosaic(xPos, yPos);
});

/**
 * 현재 구역에서 랜덤 픽셀값을 찾는 함수
 * @param {number} x좌표값
 * @param {number} y좌표값
 * @returns 해당 픽셀의 rgb값
 */
const getRandomPixel = (x, y) => {
    const randomX = x + parseInt(Math.random() * SQURE_SIZE);
    const randomY = y + parseInt(Math.random() * SQURE_SIZE);

    const imageData = imageContext.getImageData(randomX, randomY, 1, 1).data;

    return {
        red: imageData[0],
        green: imageData[1],
        blue: imageData[2]
    }
}

/**
 * 이미 모자이크 처리가 된 구역인지 확인하는 함수
 * @param {number} xPos //왼쪽에서 몇번째 구역인지
 * @param {number} yPos  //위쪽에서 몇번째 구역인지
 */
const checkDuplicate = (xPos, yPos) => {
    if (fin.has(xPos.toString() + yPos.toString())) return true;

    else return false;
}


















