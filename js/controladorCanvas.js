CANVAS = null;
ctx= null;
img_mutex = -3;


/*
=====================================================================================================
*/
function cargar(){
		CANVAS=document.getElementById('canvas');
		ctx=CANVAS.getContext("2d");
		adjustCanvasResolution();

		// Add event listener for `click` events.
		CANVAS.addEventListener('click', function(event) {
		    var x = event.pageX - CANVAS.offsetLeft + CANVAS.clientLeft,
		        y = event.pageY - CANVAS.offsetTop + CANVAS.clientTop;
		        if(!probarClick(PLANETA1,x,y)){
		        	probarClick(PLANETA2,x,y);
		        }
		}, false);
		
	
		FONDO = new Image();
		FONDO.src = "css/img/universe.png"
		FONDO.onload = function () {
			img_mutex++;
			iterar();
		}

		PLANETA1 = {
			nombre : "Training Center High School",
			w : 200,
			h : 200,
			x : 0,
			y : 0,
			abajo : 1,
			derecha : 1
		}
		PLANETA1.x = CANVAS.width/5.6 + PLANETA1.w/2;
		PLANETA1.y = CANVAS.height/2 - PLANETA1.h/2;
		PLANETA1_IMG = new Image();
		PLANETA1_IMG.onclick = function() {
			alert(PLANETA1.nombre);
		}
		PLANETA1_IMG.src = "css/img/planetTCHS.png";
		PLANETA1_IMG.onload = function () {
			img_mutex++;
			iterar();
		}


		PLANETA2 = {
			nombre : "Training Center University",
			w : 200,
			h : 200,
			x : 0,
			y : 0,
			abajo : -1,
			derecha : -1
		}
		PLANETA2.x = 2.6 * CANVAS.width/4 - PLANETA2.w/2 ;
		PLANETA2.y = CANVAS.height/2.7 - PLANETA2.h/2;
		PLANETA2_IMG = new Image();
		PLANETA2_IMG.onclick = function() {
			alert(PLANETA2.nombre);
		}
		PLANETA2_IMG.src = "css/img/planetTCU.png";
		PLANETA2_IMG.onload = function () {
			img_mutex++;
			iterar();
			
		}
}
/*
=====================================================================================================
*/
function dibujar(){
	CANVAS.width=CANVAS.width; //Reinicia el canvas

	//imagen, posX, posY, width, height
	ctx.drawImage(FONDO, 0, 0, CANVAS.width, CANVAS.height);
	ctx.drawImage(PLANETA1_IMG, PLANETA1.x, PLANETA1.y, PLANETA1.w, PLANETA1.h);
	ctx.drawImage(PLANETA2_IMG, PLANETA2.x, PLANETA2.y, PLANETA2.w, PLANETA2.h);
}

function iterar() {
	//Si ya se cargaron las imágenes, hágale con confianza, al infinito y más allá
	if(img_mutex == 0){
		setInterval(function(){

			adjustCanvasResolution();
			girar(PLANETA1);
			girar(PLANETA2);
			dibujar();
			
		},50);
		
	}
}

function adjustCanvasResolution () {
   // If it's resolution does not match change it
   if (CANVAS.width !== CANVAS.clientWidth || CANVAS.height !== CANVAS.clientHeight) {
     CANVAS.width = CANVAS.clientWidth;
     CANVAS.height = CANVAS.clientHeight;
   }
}

function girar(planeta) {
	if(planeta.x >= 3*CANVAS.width/5  || planeta.x <= CANVAS.width/4 ){
		planeta.derecha *= -1;
	}
	if(planeta.y >= 6*CANVAS.height/12 ||  planeta.y <= CANVAS.height/12){
		planeta.abajo *= -1;
	}

<<<<<<< HEAD
	planeta.x += planeta.derecha * 2.5;
=======
	planeta.x += planeta.derecha *2;
>>>>>>> 0c8ac3b72163ce30a76b5555c46107c81bed7a70
	planeta.y += planeta.abajo * 1;

}

function probarClick (planeta, clickX, clickY) {
	if (clickY > planeta.y && clickY < planeta.y + planeta.h && clickX > planeta.x && clickX < planeta.x + planeta.w) {
        alert("Saludos de parte del planeta "+planeta.nombre);
    	return true;
    }
    return false;
}