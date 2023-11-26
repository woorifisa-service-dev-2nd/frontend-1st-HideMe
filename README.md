# frontend-3rd-HideMe

![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=3rd_HideMe!%20&fontSize=90)

# 1️⃣ 주제 및 팀(팀원) 소개

## 주제 :clipboard:
**마우스의 움직임에 따라 사진을 모자이크하는 홈페이지**

<br><br>

## 팀원

| [김경은🦄](https://github.com/GyeongEun-Kim)      | [용은희🐣](https://github.com/ehyongyong)      | [이용진🐨](https://github.com/yjlee0235)      | [홍혜진🐰](https://github.com/HyeJin0102)      |
| ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| ![김경은](https://github.com/GyeongEun-Kim.png) | ![용은희](https://github.com/ehyongyong.png) | ![이용진](https://github.com/yjlee0235.png) | ![홍혜진](https://github.com/HyeJin0102.png) |

<br><br>

# 2️⃣ 협업 방식

✅ 큰 가이드라인을 정하여 슬랙을 통해 공유하고, 초기 폴더구조를 깃 허브를 통해 설정하여 이를 바탕으로 구현을 시작하였습니다.

✅ 또, 구현 단계별로 서로가 생각하는 방식을 이야기 나누고 작성해 보며 실행되는 코드를 찾아나갔습니다.

✅ 구현 중, 처음 접하거나 어려운 기술이 있을 경우 각자 시도해본 방법들을 공유하며 문제를 해결했습니다.

✅ 구현한 내용은 각자의 브랜치로 푸시하도록 하였습니다.

<br><br>


# 3️⃣ 핵심 기능 설명 및 구현 방법

1. `canvas`에 `eventListner`를 등록하여 마우스가 현재 위치하고 있는 좌표를 알아낸다.
   ```javascript
   canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX; //현재 마우스 위치 x좌표
    const y = event.clientY; //현재 마우스 위치 y좌표

   /*
   모자이크
   */
   
   }
   ```
   
2. 해당 좌표가 어떤 영역에 속하는지 계산한다.
   ```javascript
   const xPos = parseInt((x - imageLeft) / SQURE_SIZE); //왼쪽에서 몇번째 영역인지
   const yPos = parseInt((y - imageTop) / SQURE_SIZE); //위에서 몇번째 영역인지
   ```
   
3. 해당 영역애 위치하는 랜덤 좌표값을 구하고 해당 색상을 구한다.
   ```javascript
   /**
    * 현재 구역에서 랜덤 픽셀값을 찾는 함수
    * @param {number} 현재 구역의 왼쪽 위 x좌표값
    * @param {number} 현재 구역의 왼쪽 위 y좌표값
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
   ```

4. 위에서 구한 색상으로 해당 영역을 모자이크한다.

   ```javascript
   /**
    * 모자이크를 하는 함수
    * @param {number} xPos 모자이크를 할 구역이 왼쪽에서 몇번째 구역인지
    * @param {number} yPos 모자이크를 할 구역의 위에서 몇번째 구역인지
    */
      const mosaic = (xPos, yPos) => {
   
       const dx = SQURE_SIZE * xPos; //영역의 왼쪽 위 x좌표값
       const dy = SQURE_SIZE * yPos; //영역의 왼쪽 위 y좌표값
   
       const randomPixel = getRandomPixel(dx, dy);
       ctx.fillStyle = `rgb(${randomPixel.red},${randomPixel.green},${randomPixel.blue})`; //색상 설정
       ctx.fillRect(dx, dy, SQURE_SIZE, SQURE_SIZE); //칠하기
   
   }
   ```

<br><br>

# 4️⃣ 트러블 슈팅
## 💣 캔버스 태그 사용
이미지 태그는 특정 픽셀의 `rgb`값을 가져올 수 없는 이슈 -> `canvas` 를 사용해서 해결

<br>
        
## 💣 웹사이트 크기 조절에 따른 문제
웹사이트 크기가 변경됨에 따라 특정 크기로 지정해 둔 모자이크 영역이 튕겨 이동되는 경우가 발생함.
-> 캔버스에 사각형을 draw하는 방법으로 해결

<br>

## 💣 각 영역은 모자이크가 한번만 되어야 함
`set`을 사용하여 중복을 해결
        
<br><br>

# 5️⃣ 회고(느낀점)

* 김경은🦄

  > 단순해보이던 기능도 실제로 구현해보니 어려움이 많아 새로운 내용들을 학습할 수 있었습니다. 또한  팀원들과 함께 문제를 해결해나갈 수 있었기 때문에 의미가 있었습니다. 자바스크립트의 cavas에 대해 실습을 통해 더욱 자세히 알게 되었습니다. 그리고 같은 기능 구현이라도 팀원들이 서로 다른 방법으로 구현했는데 이를 통해 여러 방면으로 생각해볼 수 있어서 좋았습니다.

* 용은희🐣

  > 팀원과 함께 의견을 나누면서 많이 배울 수 있었고, 강의 중 배운 내용을 다시 한번 적용할 수 있는 기회인 것 같아 이해에 도움이 되었습니다.

* 이용진🐨

  > 주제를 같이 정하고, 첫 주에 배운 내용을 활용해 구현했고, 그 과정에서 문제들을 만났을때 같이 해결해나가는 경험이 너무 재미있었습니다.

* 홍혜진🐰

  > 구현 중 나타난 어려움을 해결하기위해 팀원과 함께 서로의 생각을 나누는 과정에서 다양한 방향의 해결법을 알아볼 수 있었고, 하나의 프로젝트를 완성해 볼 수 있는 경험을 해볼 수 있어 뜻깊었습니다. 또한 협력 중 깃의 중요성과 공부의 필요성을 다시금 느꼈습니다.
