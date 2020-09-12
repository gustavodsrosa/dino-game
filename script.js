// Desenvolvido por Gustavo Rosa por meio de projeto da Digital Innovation One

// API: Comandos para manipular elementos na tela
const dino = document.querySelector('.dino'	) // Selecionei o dinossauro
const background = document.querySelector('.background')
let position = 0
let isJumping = false

// Criando a função para identificar tela de espaço
function handleKeyUp(event) {
	if (event.keyCode === 32) {
		if(!isJumping) { // Negação
			jump()
		}
	}
}

// Pular 
function jump() {
	isJumping = true

	let upInterval = setInterval(() => {
		if (position >= 150) {
			clearInterval(upInterval)

		// Descida do dino
		let downInterval = setInterval(() => {
			if(position <= 0) {
				clearInterval(downInterval)
				isJumping = false
			} else {
			position -= 20
			dino.style.bottom = position + 'px';
			}
		}, 20) // Em milissegundos

		} else {

		// Subida do dino
		position += 20

		dino.style.bottom = position + 'px'
		}
	}, 20)

}

// Cactus
function createCactus() {
	const cactus = document.createElement('div')
	let cactusPosition = 1000

	// Aparecimento de novos cactus
	let randomTime = Math.random() * 6000 // Número aleatoŕio


	cactus.classList.add('cactus') // Criação de classe
	cactus.style.left = 1000 + 'px'
	background.appendChild(cactus)

	let leftInterval = setInterval(() => {
		cactusPosition -= 10 // Velocidade para se mover para a esquerda
		cactus.style.left = cactusPosition + 'px'

	if (cactusPosition < -60) {
			clearInterval(leftInterval)
			background.removeChild(cactus)
		} else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			// Fim de jogo

			clearInterval(leftInterval)
			document.body.innerHTML = '<h1 class="game_over">Fim de jogo! GG</h1>;'
		} else {
		
			cactusPosition -= 10 
			cactus.style.left = cactusPosition + 'px'

		}

	}, 30)

	// Recursividade
	setTimeout(createCactus, randomTime) // Executa determinada função depois de um determinado tempo
}

// Espaço
createCactus()
document.addEventListener('keyup', handleKeyUp)
