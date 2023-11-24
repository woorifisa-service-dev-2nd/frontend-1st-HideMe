let isMozaic = false;

        /* canvas setting*/
        const canvas = document.getElementById('canvas');    
        const ctx = canvas.getContext('2d');

        /* 이미지 가져오기 */
        let img = new Image()
        img.src = "images/pubao.png"
        img.onload = function(){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(img, 0 , 0, canvas.width, canvas.height);
            
            mosaicCtx = document.getElementById('mosaic').getContext('2d');
            mosaicCtx.clearRect(0,0, canvas.width, canvas.height);
            mosaicCtx.drawImage(img, 0 , 0, canvas.width, canvas.height);
        };

        /* event */
        document.getElementById('hover').addEventListener('mousemove', function (e) {  
        	/* 사각형 영역 만들기 */
            var x = event.clientX - ctx.canvas.offsetLeft - 15; 
            var y = event.clientY - ctx.canvas.offsetTop - 15; 

            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;

            ctxHover = this.getContext('2d');
            ctxHover.clearRect(0,0, this.width, this.height)

            ctxHover.strokeStyle = 'black';
            ctxHover.strokeWidth= 3;
            ctxHover.fillStyle = 'rgba(255, 255, 255, 0.5)';

            ctxHover.fillRect(x, y, 30, 30);
        });
        
        document.getElementById('hover').addEventListener('mouseout', function (e) {  
        	/* 사각형 지우기 */          
            ctxHover = this.getContext('2d');
            ctxHover.clearRect(0,0, this.width, this.height);
        });
        
        document.getElementById('hover').addEventListener('click', function (e) { 
        	/* 사각형 영역만큼 처리 */                    
            var x = event.clientX - ctx.canvas.offsetLeft - 15; 
            var y = event.clientY - ctx.canvas.offsetTop - 15; 

            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            

            mosaic = document.getElementById('mosaic');
            mosaicCtx = mosaic.getContext('2d');
            var imageData = ctx.getImageData(x, y, 30, 30);
            if(isMozaic){
	            /* 모자이크 */
	            for(var i=0;i<imageData.data.length;i=i+4){
	            	r = imageData.data[i];
	            	g = imageData.data[i+1];
	            	b = imageData.data[i+2];
	            	a = imageData.data[i+3];
	               	for(var j=1;j<=9;j++){
	            		imageData.data[i+4] = r;
	            		imageData.data[i+5] = g;
	            		imageData.data[i+6] = b;
	            		imageData.data[i+7] = a;
	            		i=i+4;
	            	}
	        	}
	            
            }
            mosaicCtx.putImageData(imageData, x , y);
        })
        
        /* btn */
        document.getElementById("btnMosaic").onclick = function(){
        	isMozaic = true;
        };
        
        // document.getElementById("btnEraser").onclick = function(){
        // 	isMozaic = false;
        // };

        // document.getElementById("btnSave").onclick = function(e){
        //     mosaic = document.getElementById('mosaic');
        //     image = mosaic.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        //     var link = document.createElement('a');
        //     link.download = "mozaic.png";
        //     link.href = image;
        //     link.click();
       	// };
