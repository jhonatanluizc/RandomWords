const grid = document.getElementById('grid');
const lettersDisplay = document.getElementById('letters');
const startButton = document.getElementById('start-button');
const endButton = document.getElementById('end-button');
const timerDisplay = document.getElementById('time');
const missedLettersDisplay = document.getElementById('missed-letters');
const letterCountSelect = document.getElementById('letter-count');
const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
let targetLetters = [];
let timer = 0;
let timerInterval;
let missedLetters = [];
let cells = [];
let gameStarted = false;

function generateRandomLetter() {
    // const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letters = 'ΔβĆĐ€₣ǤĦƗĴҜŁΜŇØƤΩŘŞŦỮVŴЖ¥ŽąЪĉʠeԲgんijkℓмnԾpqяรイu۷wxyz';

    
    return letters[Math.floor(Math.random() * letters.length)];
}

function createGrid(rows, columns) {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${columns}, 30px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 30px)`;
    cells = [];

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const randomLetter = generateRandomLetter();
        cell.textContent = randomLetter;
        grid.appendChild(cell);
        cells.push({ element: cell, letter: randomLetter, found: false, clicked: false });
    }
}

function startGame() {
    const rows = parseInt(rowsInput.value);
    const columns = parseInt(columnsInput.value);
    createGrid(rows, columns);
    missedLetters = [];
    missedLettersDisplay.textContent = '';
    targetLetters = [];
    lettersDisplay.textContent = '';
    const letterCount = parseInt(letterCountSelect.value);

    // Gera o número selecionado de letras aleatórias
    for (let i = 0; i < letterCount; i++) {
        let newLetter;
        do {
            newLetter = generateRandomLetter();
        } while (targetLetters.includes(newLetter)); // Garante que não haja letras repetidas
        targetLetters.push(newLetter);
    }

    lettersDisplay.textContent = targetLetters.join(', '); // Mostra as letras-alvo
    timer = 0;
    timerDisplay.textContent = timer;
    gameStarted = true;
    startButton.disabled = true;
    endButton.disabled = false;

    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);

    cells.forEach(cell => {
        cell.element.addEventListener('click', () => checkLetter(cell));
    });
}

function checkLetter(cell) {
    if (gameStarted) {
        cell.clicked = true;
        if (targetLetters.includes(cell.letter)) {
            cell.element.classList.add('found');
            cell.found = true;
        } else {
            cell.element.classList.add('wrong');
        }
    }
}

function endGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    startButton.disabled = false;
    endButton.disabled = true;

    // Verifica quais letras deveriam ter sido encontradas e marca em amarelo as que não foram clicadas
    missedLetters = cells
        .filter(cell => targetLetters.includes(cell.letter) && !cell.found)
        .map(cell => cell.letter);

    cells.forEach(cell => {
        if (targetLetters.includes(cell.letter) && !cell.found) {
            cell.element.classList.add('missed');
        }
    });

    if (missedLetters.length > 0) {
        missedLettersDisplay.textContent = `Letras não encontradas: ${missedLetters.join(', ')}`;
    } else {
        missedLettersDisplay.textContent = 'Você encontrou todas as letras!';
    }

    alert(`Jogo finalizado! Tempo total: ${timer} segundos`);
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
