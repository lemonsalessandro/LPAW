window.onload = function () {

    //canvas
    let canvas = document.getElementById('snake-game');
    let ctx = canvas.getContext("2d");
    const elSize = 20;
    let width = canvas.width / elSize;
    let height = canvas.height / elSize;

    //score
    let score = document.getElementById('score-game');
    let scorePoints = 0;

    //game
    let fps = 20;
    let lastTime = 0;
    let frameDelay = 1000 / fps;
    let audio = document.querySelector("#audio");
    let flag = false;

    //snake
    let vel = 1;
    let velX = 0;
    let velY = 0;
    let snakeX = Math.floor(width / 2);
    let snakeY = Math.floor(height / 2);
    let snakeBody = [];
    let snakeSize = 1;

    //score
    let scorePosX = Math.floor(Math.random() * 20);
    let scorePosY = Math.floor(Math.random() * 20);
    let bestScore = document.getElementById('best');

    function game(timestamp) {
        if (!lastTime) {
            lastTime = timestamp;
        }

        let deltaTime = timestamp - lastTime;

        if (deltaTime >= frameDelay) {
            lastTime = timestamp;

            snakeX += velX;
            snakeY += velY;

            //seleção de dificuldade
            if (localStorage.getItem('wall') == 'true') {
                if (snakeX < -1 || snakeX > width || snakeY < -1 || snakeY > height) {
                    gameOver();
                }
                canvas.style.border = "3px solid white";
            }
            else {
                if (snakeX < 0) {
                    snakeX = width;
                }
                if (snakeX > width) {
                    snakeX = 0;
                }
                if (snakeY < 0) {
                    snakeY = height;
                }
                if (snakeY > height) {
                    snakeY = 0;
                }
            }

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "yellow";
            ctx.fillRect(scorePosX * elSize, scorePosY * elSize, elSize, elSize);

            ctx.fillStyle = localStorage.getItem('snakeColor');
            for (let i = 0; i < snakeBody.length; i++) {
                ctx.fillRect(snakeBody[i].x * elSize, snakeBody[i].y * elSize, elSize, elSize);

                if (snakeSize > 1) {
                    if (snakeBody[i].x == snakeX && snakeBody[i].y == snakeY) {
                        gameOver();
                    }
                }
            }

            snakeBody.push({ x: snakeX, y: snakeY });

            if (snakeBody.length > snakeSize) {
                snakeBody.shift();
            }

            if (scorePosX == snakeX && scorePosY == snakeY) {
                audio.src = "audio/point.wav";
                audio.play();
                snakeSize += 1;
                scorePoints++;
                score.innerHTML = scorePoints;
                scorePosX = Math.floor(Math.random() * canvas.width / elSize);
                scorePosY = Math.floor(Math.random() * canvas.height / elSize);
            }
        }

        if (!localStorage.getItem('playerName')) {
            localStorage.setItem('playerName', "xxxx")
        }

        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', 0)
        }
        else {
            if (scorePoints > parseInt(localStorage.getItem('bestScore'))) {
                if (!flag) {
                    audio.src = "audio/record.wav";
                    audio.play();
                    flag = true;
                }
                localStorage.setItem('bestScore', scorePoints)
                localStorage.setItem('playerNameRecord', localStorage.getItem('playerName'))
            }
        }

        bestScore.innerHTML = `${localStorage.getItem('playerNameRecord')} - ${localStorage.getItem('bestScore')}`;
        requestAnimationFrame(game);
    }

    function keyboard(event) {
        if ((event.key === 'a') && velX !== vel) {
            velX = -vel;
            velY = 0;
        } else if ((event.key === 'w') && velY !== vel) {
            velX = 0;
            velY = -vel;
        } else if ((event.key === 'd') && velX !== -vel) {
            velX = vel;
            velY = 0;
        } else if ((event.key === 's') && velY !== -vel) {
            velX = 0;
            velY = vel;
        }
    }

    function gameOver() {
        audio.src = "audio/die.wav";
        audio.play();
        velX = velY = 0;
        snakeX = Math.floor(width / 2);
        snakeY = Math.floor(height / 2);
        snakeBody = [];
        snakeSize = 1;
        scorePoints = 0;
        score.innerHTML = scorePoints;
        // alert("Game Over");
    }

    document.addEventListener("keydown", keyboard);
    requestAnimationFrame(game);
}
