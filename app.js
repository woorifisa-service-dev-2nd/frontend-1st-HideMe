const canvas = document.querySelector("#image-canvas");
const mosaic = document.querySelector(".mosaic");

const context = canvas.getContext('2d');

// 행, 열을 몇 개로 나눌지 설정
const ROW_DIVISION_COUNT = 10;
const COLUMN_DIVISION_COUNT = 10;

const IMAGE_SOURCE_URL = "images/푸바오.png";

const img = new Image();
img.src = IMAGE_SOURCE_URL;
img.onload = () => {
    const { resizedWidth, resizedHeight } = imageSizeForResizing(img.width, img.height);
    canvas.width = resizedWidth;
    canvas.height = resizedHeight;
    context.drawImage(img, 0, 0, resizedWidth, resizedHeight);
    fillMosaicBox(canvas.width, canvas.height, ROW_DIVISION_COUNT, COLUMN_DIVISION_COUNT);
}


const imageSizeForResizing = (imageWidth, imageHeight) => {
    const MAX_WIDTH_SIZE = 500;
    const MAX_HEIGHT_SIZE = 500;

    const resizedWidth = Math.min(imageWidth, MAX_WIDTH_SIZE);
    const resizedHeight = Math.min(imageHeight, MAX_HEIGHT_SIZE);
    return { resizedWidth, resizedHeight }
}

const fillMosaicBox = (width, height, rowDivCount, colDivCount) => {
    const unitWidth = width / rowDivCount;
    const unitHeight = height / colDivCount;

    const canvasStartX = canvas.getBoundingClientRect().x;
    const canvasStartY = canvas.getBoundingClientRect().y;

    for (let rowIndex = 0; rowIndex < rowDivCount; rowIndex++) {
        const y = rowIndex * unitWidth;
        for (let colIndex = 0; colIndex < colDivCount; colIndex++) {
            const x = colIndex * unitHeight;
            mosaic.appendChild(makeMosaicBox(x, y, canvasStartX, canvasStartY, unitWidth, unitHeight));
        }
    }
}

const makeMosaicBox = (x, y, canvasStartX, canvasStartY, unitWidth, unitHeight) => {
    let mosaicBox = document.createElement('div');
    mosaicBox.setAttribute("class", "mosaic-box");
    mosaicBox.setAttribute("data-x", x);
    mosaicBox.setAttribute("data-y", y);

    mosaicBox.style.left = `${x + canvasStartX}px`;
    mosaicBox.style.top = `${y + canvasStartY}px`;
    mosaicBox.style.width = `${unitWidth}px`;
    mosaicBox.style.height = `${unitHeight}px`;

    mosaic.addEventListener("mouseover", (e) => mosaicBoxHandler(e, unitWidth, unitHeight))
    return mosaicBox;
}

const mosaicBoxHandler = (e, unitWidth, unitHeight) => {
    const element = e.target;

    // 이미 모자이크 되었을때
    if (element.hasAttribute('isMosaiced')) {
        return;
    } else {  // 모자이크 안되었을 경우
        const x = element.dataset.x;
        const y = element.dataset.y;

        // 이미지에서 범위 내의 임의 픽셀 RGB 값 가져오기
        element.style.backgroundColor = getMosaicColorFromImage(x, y, unitWidth, unitHeight);
        element.setAttribute("isMosaiced", "");
    }
}

const getMosaicColorFromImage = (startX, startY, unitWidth, unitHeight) => {
    const { x, y } = getRandomXYInsideRange(startX, startY, unitWidth, unitHeight)
    const RGB = extractRGBFromImage(x, y);
    return RGB;
}

const getRandomXYInsideRange = (startX, startY, unitWidth, unitHeight) => {
    const x = Number(startX) + Number(Math.floor(Math.random() * unitHeight));
    const y = Number(startY) + Number(Math.floor(Math.random() * unitWidth));
    return { x, y }
}

const extractRGBFromImage = (x, y) => {
    const imageData = context.getImageData(x, y, 1, 1);
    const red = imageData.data[0];
    const green = imageData.data[1];
    const blue = imageData.data[2];
    return `rgba(${red},${green},${blue})`;
}