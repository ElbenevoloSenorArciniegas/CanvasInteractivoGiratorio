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
		        	probarClick(PLANETA2,x,y)
		        }
		}, false);
		
	
		FONDO = new Image();
		FONDO.src = "css/img/universe.png"
		FONDO.onload = function () {
			img_mutex++;
			iterar();
		}

		//0.3291326908821349   0.5928057553956835
		PLANETA1 = {
			nombre : "Training Center High School",
			w : 200,
			h : 200,
			x : 0,
			y : 0,
			abajo : 1,
			derecha : 1
		}
		PLANETA1.x = 0.3291326908821349*CANVAS.width - PLANETA1.w/2;
		PLANETA1.y = 0.5928057553956835*CANVAS.height - 5*PLANETA1.h/8;
		PLANETA1_IMG = new Image();
		PLANETA1_IMG.src = "css/img/planetTCHS.png";
		PLANETA1_IMG.onload = function () {
			img_mutex++;
			iterar();
		}

		//0.6723498888065234   0.4316546762589928
		PLANETA2 = {
			nombre : "Training Center University",
			w : 200,
			h : 200,
			x : 0,
			y : 0,
			abajo : -1,
			derecha : -1
		}
		PLANETA2.x = 0.6723498888065234*CANVAS.width - PLANETA2.w/2;
		PLANETA2.y = 0.4316546762589928*CANVAS.height - 5*PLANETA2.h/8;
		PLANETA2_IMG = new Image();
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
	grados = 0;
	if(img_mutex == 0){
		setInterval(function(){
			if(grados <= 360){
				grados += 360;
			}
			adjustCanvasResolution();
			girar(PLANETA1, grados);
			girar(PLANETA2, grados+180);
			dibujar();
			
			grados -= 1;
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

function girar(planeta, grados) {
	var rad=Math.PI/180;
	var theta = 170*rad;
	var rx = (0.4966641957005189 - 0.3291326908821349) * CANVAS.width;
	var ry = (0.5007194244604316 - 0.3107913669064748) * CANVAS.height;
	var a = grados;
	planeta.x = CANVAS.width/2 + rx*Math.cos(a*rad)*Math.cos(theta) - ry*Math.sin(a*rad)*Math.sin(theta) - PLANETA2.w/2;
	planeta.y = CANVAS.height/2 + rx*Math.cos(a*rad)*Math.sin(theta) +	ry*Math.sin(a*rad)*Math.cos(theta) - 5*PLANETA2.h/8;
}


function probarClick (planeta, clickX, clickY) {
	if (clickY > planeta.y && clickY < planeta.y + planeta.h && clickX > planeta.x && clickX < planeta.x + planeta.w) {
        alert("Saludos de parte del planeta "+planeta.nombre);
    	return true;
    }
    return false;
}

