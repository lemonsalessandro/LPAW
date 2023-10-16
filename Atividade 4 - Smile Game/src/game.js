import Enemy from "./Enemy"
import Smile from "./Smile"
import Point from "./Point"
import Circle from "./geometries/Circle"
import { keyPress, key } from "./keyboard"

let score = 0;
let scoreText = document.getElementById('score');
let bestScore = document.getElementById('bestScore');
let ctx;
let canvas;
let frames = 30;
let animeReqReference;
let boundaries;
let qtdEnemies = 10;
let enemies = Array.from({ length: qtdEnemies });
let smile = new Smile(200, 200, 20, 5, 'yellow');
let point = new Point(400, 200, 8, 5, 'lime');

const resetGame = () => {
	smile = new Smile(200, 200, 20, 5, 'yellow');
	point = new Point(Math.random() * canvas.width, Math.random() * canvas.height, 8, 5, 'lime');
	score = 0;
	scoreText.innerText = `Score: ${score}`;
	enemies = enemies.map(i => new Enemy(
		Math.random() * canvas.width,
		Math.random() * canvas.height,
		10, 5, `#${Math.floor(Math.random() * 16777215).toString(16)}`
	));
}

const loop = () => {
	setTimeout(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		smile.move(boundaries, key)
		smile.paint(ctx)
		point.draw(ctx)

		enemies.forEach(e => {
			e.move(boundaries, 0)
			e.draw(ctx)

			//colisao com algum dos enemies acaba o jogo
			if (e.colide(smile)) {
				alert("GAME OVER");
				resetGame(); // Reiniciar o jogo quando o Smile colidir com um Enemy
			}

			//muda a cor do enemy quando ele sai da tela
			if (e.y > canvas.height) {
				e.mudaCor();
			}
		})

		//colisao com o point gera um novo point
		if (smile.colide(point)) {
			point = new Point(Math.random() * canvas.width, Math.random() * canvas.height, 8, 5, `#${Math.floor(Math.random() * 16777215).toString(16)}`);
			score++;
			scoreText.innerText = `Score: ${score}`;
			smile.aumenta();
		}

		requestAnimationFrame(loop);

		if(score > localStorage.getItem('bestScore')){
			localStorage.setItem('bestScore', score);
		}

		if(localStorage.getItem('bestScore')){
			bestScore.innerText = `Best Score: ${localStorage.getItem('bestScore')}`;
		}

	}, 1000 / frames)
}


const init = () => {
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	boundaries = {
		width: canvas.width,
		height: canvas.height
	}

	enemies = enemies.map(i => new Enemy(
		Math.random() * canvas.width,
		Math.random() * canvas.height,
		10, 5, `#${Math.floor(Math.random() * 16777215).toString(16)}`
	)
	)


	keyPress(window)
	loop()
}


export { init, loop }
