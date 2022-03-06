document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const scoreField = document.querySelector('span');
    let welcome;
    let gameOver;
    let startBtn;
    let cells;
    const width = 21;
    let score = 0;
    let appleIndex = 0;
    let direction = width;
    let interval = null;
    let time = 500;
    let speed = 0.9;
    let snake = [52,31,10];

    // create welcome view
    function welcomeView() {
        const nav = document.createElement('nav');
        const title = document.createElement('h1');
        const button = document.createElement('button');

        nav.classList.add('welcome');
        button.classList.add('start');

        title.textContent = 'snake';
        button.textContent = 'start';

        nav.appendChild(title);
        nav.appendChild(button);

        board.appendChild(nav);

        startBtn = document.querySelector('.start');
        welcome = document.querySelector('.welcome');
        startBtn.addEventListener('click', setupGame);
    }

    function handleGameOver() {
        const button = document.createElement('button');
        const snake = document.querySelectorAll('.snake');
        const apple = document.querySelector('.apple');

        button.textContent = 'Game Over!';

        button.classList.add('gameOver');
        apple.classList.add('transparent');

        snake.forEach(item => item.classList.add('transparent'));
        board.appendChild(button);

        button.addEventListener('click', setupGame);
    }

    // genereate the board
    function generateBoard() {
        for (let i = 0; i < width * 15; i++) {
            const div = document.createElement('div');
            // div.textContent = i;
            board.appendChild(div);
        } 
        cells = document.querySelectorAll('.board div');
    }

    // start game
    function setupGame() {
        welcome.classList.add('hide');
        if (gameOver) {
            gameOver.classList.add('hide');
        }
        board.innerHTML = '';
       
        interval = null;
        
        score = 0;
        appleIndex = 0;
        direction = width;
        
        time = 500;
        speed = 0.9;
        snake = [52,31,10];

        generateBoard();
        generateApple();
        snake.forEach(index => cells[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, time);
        scoreField.textContent = 0;
            
    }

    // snake eats an apple
    function moveOutcomes() {

        // check if snake hits a wall or itself
        if (
            snake[0] % width === width - 1 && direction === 1 || // snake hits right wall
            snake[0] % width === 0 && direction === -1 || // snake hits left wall
            snake[0] - width < 0 && direction === -width ||
            snake[0] + width >= width * 15 && direction === width ||
            cells[snake[0] + direction].classList.contains('snake')
            ) {
                handleGameOver();
                return clearInterval(interval);
            }

        // handle tail
        let tail = snake.pop();
        cells[tail].classList.remove('snake');

        // handle head
        snake.unshift(snake[0] + direction);

        // draw snake head
        cells[snake[0]].classList.add('snake');

        // snake eats an apple
        if (cells[snake[0]].classList.contains('apple')) {
            snake.push(tail);
            cells[appleIndex].classList.remove('apple');
            score++;
            scoreField.textContent = score;
            generateApple();
            clearInterval(interval);
            time = time * speed;
            interval = setInterval(moveOutcomes, time);
        }
    }

    // generate apple
    function generateApple() {
        do {
            appleIndex = Math.floor(Math.random() * cells.length);
        } while(cells[appleIndex].classList.contains('snake'))

        cells[appleIndex].classList.add('apple');
    }

    // keyboard controls
    function controls(e) {
        switch(e.key) {
            case 'ArrowUp': 
                direction = -width;
                break;
            case 'ArrowDown': 
                direction = +width;
                break;
            case 'ArrowLeft': 
                direction = -1;
                break;
            case 'ArrowRight': 
                direction = 1;
                break;
        }
    }


    document.addEventListener('keyup', controls);
    welcomeView();
})