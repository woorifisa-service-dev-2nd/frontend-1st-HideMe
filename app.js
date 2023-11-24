const canvas = document.querySelector("#image-canvas");
const mosaic = document.querySelector(".mosaic");

const context = canvas.getContext('2d');

// 행, 열을 몇 개로 나눌지 설정
const ROW_DIVISION_COUNT = 20;
const COLUMN_DIVISION_COUNT = 20;

const IMAGE_SOURCE_URL = "images/푸바오.png";
// const IMAGE_SOURCE_URL = "images/maxresdefault.jpg";

// 모자이크 영역을 담는 리스트
let mosaicArea;

const img = new Image();
img.src = IMAGE_SOURCE_URL;
img.onload = () => {
    const { resizedWidth, resizedHeight } = imageSizeForResizing(img.width, img.height);
    canvas.width = resizedWidth;
    canvas.height = resizedHeight;
    context.drawImage(img, 0, 0, resizedWidth, resizedHeight);
    mosaicArea = mosaicInit(canvas.width, canvas.height, ROW_DIVISION_COUNT, COLUMN_DIVISION_COUNT);
}


/**
 * 캔버스를 모자이크 영역으로 나눈 후 리스트로 반환
 * 
 * @param {캔버스의 너비} width 
 * @param {캔버스의 높이} height 
 * @param {나눠진 행의 개수} rowDivCount 
 * @param {나눠진 열의 개수} colDivCount 
 */
const mosaicInit = (width, height, rowDivCount, colDivCount) => {
    const unitWidth = width / rowDivCount;
    const unitHeight = height / colDivCount;

    let mosaicArea = [];

    for (let rowIndex = 0; rowIndex < rowDivCount; rowIndex++) {
        const y = rowIndex * unitWidth;
        for (let colIndex = 0; colIndex < colDivCount; colIndex++) {
            const x = colIndex * unitHeight;
            mosaicArea.push({ x, y, unit: { width: unitWidth, height: unitHeight }, isMosaiced: false })
        }
    }
    return mosaicArea;
}


/**
 * 리사이징할 이미지의 너비와 높이를 반환
 * 
 * @param {이미지 너비} imageWidth 
 * @param {이미지 높이} imageHeight 
 * @returns 리사이징된 너비, 높이 객체
 */
const imageSizeForResizing = (imageWidth, imageHeight) => {
    const MAX_WIDTH_SIZE = 500;
    const MAX_HEIGHT_SIZE = 500;

    const resizedWidth = Math.min(imageWidth, MAX_WIDTH_SIZE);
    const resizedHeight = Math.min(imageHeight, MAX_HEIGHT_SIZE);
    return { resizedWidth, resizedHeight }
}


/**
 * 현재 마우스 좌표에 해당하는 영역을 판별한 후 모자이크 적용
 * 
 * @param {이벤트 객체} e 
*/
const getCurrentMosaicArea = (e) => {
    const curX = e.clientX - canvas.getBoundingClientRect().x;
    const curY = e.clientY - canvas.getBoundingClientRect().y;

    for (const area of mosaicArea) {
        const unit = area.unit;
        const areaStartX = area.x;
        const areaEndX = area.x + unit.height;
        const areaStartY = area.y;
        const areaEndY = area.y + unit.width;

        if (areaStartX <= curX && curX < areaEndX && areaStartY <= curY && curY < areaEndY) {
            context.fillStyle = getMosaicColorFromImage(areaStartX, areaStartY, unit.width, unit.height);
            context.fillRect(areaStartX, areaStartY, unit.width, unit.height);
        }
    }
}


/**
 * 선택된 임의의 좌표값에 해당하는 RGB 정보를 이미지에서 추출해 CSS 적용 가능한 문자열로 반환
 *  
 * @param {영역 시작 X 좌표} startX 
 * @param {영역 시작 Y 좌표} startY 
 * @param {기준 영역 너비} unitWidth 
 * @param {기준 영역 높이} unitHeight 
 * @returns 
 */
const getMosaicColorFromImage = (startX, startY, unitWidth, unitHeight) => {
    const { x, y } = getRandomXYInsideRange(startX, startY, unitWidth, unitHeight)
    const { red, green, blue } = extractRGBFromImage(x, y);
    return `rgba(${red},${green},${blue})`;
}


/**
 * 영역내 임의의 정수 좌표값 선택
 * 
 * @param {영역 시작 X 좌표} startX 
 * @param {영역 시작 Y 좌표} startY 
 * @param {기준 영역 너비} unitWidth 
 * @param {기준 영역 높이} unitHeight 
 * @returns 
 */
const getRandomXYInsideRange = (startX, startY, unitWidth, unitHeight) => {
    const x = Number(startX) + Number(Math.floor(Math.random() * unitHeight));
    const y = Number(startY) + Number(Math.floor(Math.random() * unitWidth));
    return { x, y }
}


/**
 * 이미지에서 좌표에 해당하는 RGB 값을 객체로 반환
 * 
 * @param {이미지 X 좌표} x 
 * @param {이미지 Y 좌표} y 
 * @returns 
 */
const extractRGBFromImage = (x, y) => {
    const imageData = context.getImageData(x, y, 1, 1);
    const red = imageData.data[0];
    const green = imageData.data[1];
    const blue = imageData.data[2];
    return { red, green, blue };
}

canvas.addEventListener('mousemove', getCurrentMosaicArea)