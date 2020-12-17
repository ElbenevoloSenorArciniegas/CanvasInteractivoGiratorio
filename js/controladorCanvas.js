CANVAS = null;
ctx= null;
img_mutex = -3;

mouseX =0;
mouseY =0;

/*
=====================================================================================================
*/
function cargar(){
		CANVAS=document.getElementById('canvas');
		ctx=CANVAS.getContext("2d");
		adjustCanvasResolution();

		// Add event listener for `click` events.
		CANVAS.addEventListener('click', function(event) {
		        if(esEstePlaneta(PLANETA1)){
		        	alert("Saludos de parte del planeta "+PLANETA1.nombre);
		        }else if(esEstePlaneta(PLANETA2)){
		        	alert("Saludos de parte del planeta "+PLANETA2.nombre);
		        }
		}, false);

		CANVAS.addEventListener("mousemove", function(event) {
		    mouseX = event.pageX - CANVAS.offsetLeft + CANVAS.clientLeft;
		    mouseY = event.pageY - CANVAS.offsetTop + CANVAS.clientTop;
		});
		
	
		FONDO = new Image();
		FONDO.src = "css/img/universe.png"
		FONDO.onload = function () {
			img_mutex++;
			iterar();
		}

		//0.3291326908821349   0.5928057553956835
		PLANETA1 = {
			nombre : "Training Center High School",
			w : 150,
			h : 150,
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
			w : 150,
			h : 150,
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
			dibujarSol();
			comprobarResaltados();

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
	planeta.x = CANVAS.width/2 + rx*Math.cos(a*rad)*Math.cos(theta) - ry*Math.sin(a*rad)*Math.sin(theta) - planeta.w/2;
	planeta.y = CANVAS.height/2 + rx*Math.cos(a*rad)*Math.sin(theta) +	ry*Math.sin(a*rad)*Math.cos(theta) - 5*planeta.h/8;
}

function comprobarResaltados () {
	if(esEstePlaneta(PLANETA1)){
    	agregarResaltado(PLANETA1);
    }else if(esEstePlaneta(PLANETA2)){
    	agregarResaltado(PLANETA2);
    }else{
    	CANVAS.style.cursor = "initial";
    }
}

function dibujarSol () {
	ctx.shadowBlur = 100;
	ctx.shadowColor = "#fff";

	var grad = ctx.createRadialGradient(CANVAS.width/2,CANVAS.height/2,5,CANVAS.width/2,CANVAS.height/2,150);
	grad.addColorStop(0, 'rgba(255,255,107,0.5)');
	grad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
	grad.addColorStop(1, 'rgba(255,255,107,0.01)');
	
	ctx.beginPath();
	ctx.arc(CANVAS.width/2, CANVAS.height/2,150, 0, 2 * Math.PI);
	ctx.fillStyle = grad;
	ctx.fill();

	ctx.beginPath();
	ctx.arc(CANVAS.width/2, CANVAS.height/2,15, 0, 2 * Math.PI);
	ctx.fillStyle = "rgba(255, 255, 150, 0.8)";
	ctx.fill();
}

function agregarResaltado (planeta) {
	ctx.beginPath();
	ctx.arc(planeta.x + planeta.w/2, planeta.y + 5*planeta.h/8, 100, 0, 2 * Math.PI);
	ctx.lineWidth = 15;
	ctx.strokeStyle = "rgba(255, 255, 0, .2)";
	ctx.stroke();

	ctx.shadowBlur = 10;
	ctx.shadowColor = "#000";
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "rgb(241, 196, 15)";
	ctx.textAlign = "center";
	ctx.fillText(planeta.nombre, planeta.x + planeta.w/2, planeta.y + planeta.h + 25);
	
	CANVAS.style.cursor = "pointer";
}

function esEstePlaneta (planeta) {
	return (mouseY > planeta.y && mouseY < planeta.y + planeta.h && mouseX > planeta.x && mouseX < planeta.x + planeta.w)
}