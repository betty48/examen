let restartButton = document.createElement("button");
let score = 0;
let toWin = 0;

document.getElementById("play").addEventListener("click", function game() {
	const scoreDisplay = document.getElementById("score");
	const width = 28; // 28*28 = 784 celdas
	const celdas = document.querySelector(".celdas")
	const layout = [
		1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
		1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
		1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
		1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
		4,0,0,0,0,0,0,1,4,1,0,2,2,2,2,2,2,0,1,4,1,0,0,0,0,0,0,4,
		1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
		1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
		4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
		1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
		1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 
	// 0 = comida ; 1 = pared ; 2 = Spot de fantasmas ; 3 = Poderes ; 4 = Vacio;
	const casillas = [];


// Crear la cuadricula
	function crearMapa() {
		for (let i = 0; i < layout.length ; i++){
			const square = document.createElement("div");
			celdas.appendChild(square);
			casillas.push(square);

		// Agregar los diseños
			if (layout[i] === 0) {
				casillas[i].classList.add("comida");
			} else if (layout[i] === 1) {
				casillas[i].classList.add("pared");
			} else if (layout[i] === 2) {
				casillas[i].classList.add("ghost-lair");
			} else if (layout[i] === 3) {
				casillas[i].classList.add("poder");
			} else if (layout[i] === 4) {
				casillas[i].classList.add("empty");
			}
		}
	}
	crearMapa();
	

	
// Posicion inicial del Pac-Man
	let pacmanCurrentIndex = 518;
	casillas[pacmanCurrentIndex].classList.add("pac-man");

// Movimiento del Pac-Man
	function moverPacman (e) {
		casillas[pacmanCurrentIndex].classList.remove("pac-man");
		switch(e.keyCode){
			case 37:
				if (pacmanCurrentIndex % width !== 0 && !casillas[pacmanCurrentIndex -1].classList.contains("pared") && !casillas[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
					pacmanCurrentIndex -=1;
					casillas[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
					// Portal de la izquierda
					if (pacmanCurrentIndex - 1 === 363) {
						pacmanCurrentIndex = 391;
				}}
				break;
			case 38:
				if (pacmanCurrentIndex - width >= 0 && !casillas[pacmanCurrentIndex - width].classList.contains("pared") && !casillas[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { 
          pacmanCurrentIndex -= width;
					casillas[pacmanCurrentIndex].style.transform = "scaleY(1)";
				}
				break;
			case 39:
				if (pacmanCurrentIndex % width < width - 1 && !casillas[pacmanCurrentIndex +1].classList.contains("pared") && !casillas[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ 
          pacmanCurrentIndex += 1;
					casillas[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
					// Portal de la derecha
					if(pacmanCurrentIndex + 1 === 392) {
						pacmanCurrentIndex = 364;
				}}
				break;
			case 40:
				if (pacmanCurrentIndex + width < width * width && !casillas[pacmanCurrentIndex + width].classList.contains("pared") && !casillas[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
					pacmanCurrentIndex += width;
					casillas[pacmanCurrentIndex].style.transform = "rotate(190deg)";
				}
				break;
		}

		casillas[pacmanCurrentIndex].classList.add("pac-man");

		aumentarPuntaje();
		poderesComidos();
		mostrarGameOver();
		mostrarVictoria();
	}

	document.addEventListener("keydown", moverPacman);
  
  

// Puntos
	function aumentarPuntaje() {
		if (casillas[pacmanCurrentIndex].classList.contains("comida")){
			score++;
			toWin++;
			casillas[pacmanCurrentIndex].classList.remove("comida");
		}
		scoreDisplay.innerHTML = score;
	}

// Poderes
		function poderesComidos () {
			if (casillas[pacmanCurrentIndex].classList.contains("poder")) {
				score += 10;
				toWin += 10;
				fantasmas.forEach(ghost => ghost.Asustado = true);
				setTimeout(noAsustado, 7000);
				casillas[pacmanCurrentIndex].classList.remove("poder");
			}
			scoreDisplay.innerHTML = score;
		}


// Plantilla de los fantasmas
	class Fantasma {
		constructor(className, startIndex, speed){
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.timerId = NaN;
			this.Asustado = false;
		}
	}

	const fantasmas = [
		new Fantasma("blinky", 348, 290),
		new Fantasma("pinky", 376, 380),
		new Fantasma("inky", 351, 200),
		new Fantasma("clyde", 379, 250)
	]
		
// Regresar el color a los fantasmas
	function noAsustado () {fantasmas.forEach(ghost => ghost.Asustado = false)}
	
		
// Colocar los fantasmas en el mapa
	fantasmas.forEach(ghost => {
		casillas[ghost.currentIndex].classList.add(ghost.className);
		casillas[ghost.currentIndex].classList.add("ghost");
	})

// Movimiento de los fantasmas
	fantasmas.forEach(ghost => moverFantasmas(ghost));

	function moverFantasmas (ghost) {
		const directions = [-1, +1, width, -width];
		let direction = directions[Math.floor(Math.random() * directions.length)];
		ghost.timerId = setInterval(function () {
			if (!casillas[ghost.currentIndex + direction].classList.contains("ghost") && !casillas[ghost.currentIndex + direction].classList.contains("pared")) {
				casillas[ghost.currentIndex].classList.remove(ghost.className);
				casillas[ghost.currentIndex].classList.remove("ghost", "fantasma-asustado");
				ghost.currentIndex += direction;
				casillas[ghost.currentIndex].classList.add(ghost.className, "ghost");
			} else if (ghost.currentIndex - 1 === 363) {
				casillas[ghost.currentIndex].classList.remove(ghost.className, "ghost");
				ghost.currentIndex = 391;
				casillas[ghost.currentIndex].classList.add("ghost");
			} else if (ghost.currentIndex + 1 === 392) {
				casillas[ghost.currentIndex].classList.remove(ghost.className, "ghost");
				ghost.currentIndex = 364;
				casillas[ghost.currentIndex].classList.add("ghost");
			} else {
				direction = directions[Math.floor(Math.random() * directions.length)]
			}

			
			if (ghost.Asustado) {
				casillas[ghost.currentIndex].classList.add("fantasma-asustado");
			}

			if (casillas[pacmanCurrentIndex].classList.contains("fantasma-asustado")) {
				casillas[ghost.currentIndex].classList.remove(ghost.className, "ghost", "fantasma-asustado");
				ghost.currentIndex = ghost.startIndex;
				score += 100;
				scoreDisplay.innerHTML = score;
				casillas[ghost.currentIndex].classList.add(ghost.className, "ghost");
			}
				
			mostrarGameOver();
			
		}, ghost.speed)
	}

// Game Over
	function mostrarGameOver () {
		if (casillas[pacmanCurrentIndex].classList.contains("ghost") && !casillas[pacmanCurrentIndex].classList.contains("fantasma-asustado")) {
			fantasmas.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", moverPacman);
			scoreDisplay.innerHTML = score;
			let gameOver = document.createElement("div");
			gameOver.classList.add("gameOver");
			document.body.append(gameOver);
			restartButton.classList.add("reiniciar");
			document.body.append(restartButton);
			document.getElementById("play").removeEventListener("click", game);
			restartButton.addEventListener("click", () => {window.location.reload(false)})				
		}	
	}

// Victoria
	function mostrarVictoria () {
		if (toWin === 372) {
			fantasmas.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", moverPacman);
			scoreDisplay.innerHTML = score;
			let youWon = document.createElement("div");
			youWon.classList.add("victoria");
			document.body.append(youWon);
			restartButton.classList.add("reiniciar");
			document.body.append(restartButton);
			document.getElementById("play").removeEventListener("click", game);
			restartButton.addEventListener("click", () => {window.location.reload(false)})
		}
	}
}) 