let start = 'X'; // Current turn
let gameMode = "human"; // Default mode
let boxes = document.querySelectorAll('.box'); // All game cells
let humanMode_btn = document.querySelector('#human');
let aiMode_btn = document.querySelector('#ai');
let board = ["", "", "", "", "", "", "", "", ""]; // Logical board state

// Switch to Human Mode
humanMode_btn.addEventListener('click', () => {
    gameMode = "human";
    reset();
    enableHumanMode();
});

// Switch to AI Mode
aiMode_btn.addEventListener('click', () => {
    gameMode = "ai";
    reset();
    enableHumanMode(); // Human starts first in AI mode
});

// Reset Game
function reset() {
    boxes.forEach((box) => {
        box.innerHTML = '';
    });
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelector('.winner').innerHTML = '';
    start = 'X'; // Reset to 'X'
    enableClicks();
}

// Disable clicks after a win or draw
function disableClicks() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
}

// Re-enable clicks for a new game
function enableClicks() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "auto";
    });
}

// Check for Winner or Draw
function checkWinner() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            document.querySelector('.winner').innerHTML = `Winner is ${board[a]}`;
            disableClicks();
            return true;
        }
    }

    if (board.every(cell => cell !== "")) {
        document.querySelector('.winner').innerHTML = 'Match Draw';
        disableClicks();
        return true;
    }

    return false;
}

// Enable Human Mode
function enableHumanMode() {
    boxes.forEach((box, index) => {
        box.onclick = () => {
            if (box.innerHTML === '' && board[index] === '') {
                if (gameMode === "human" || (gameMode === "ai" && start === "X")) {
                    box.innerHTML = start;
                    board[index] = start;
                    start = start === 'X' ? 'O' : 'X';

                    if (!checkWinner() && gameMode === "ai" && start === "O") {
                        setTimeout(makeAIMove, 500); // AI plays after a short delay
                    }
                }
            }
        };
    });
}

// AI Move Logic
function makeAIMove() {
    if (checkWinner()) return; // Stop AI if game has ended

    let bestMove = minimax(board, "O").index;
    if (bestMove !== undefined) {
        board[bestMove] = "O";
        boxes[bestMove].innerHTML = "O";
        start = "X"; // Switch turn back to human
        checkWinner();
    }
}

// Minimax Algorithm
function minimax(newBoard, player) {
    let availableSpots = newBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

    if (checkWin(newBoard, "X")) return { score: -10 }; // Human win
    if (checkWin(newBoard, "O")) return { score: 10 };  // AI win
    if (availableSpots.length === 0) return { score: 0 }; // Draw

    let moves = [];

    for (let i of availableSpots) {
        let move = { index: i };
        newBoard[i] = player;

        if (player === "O") {
            move.score = minimax(newBoard, "X").score; // AI's turn
        } else {
            move.score = minimax(newBoard, "O").score; // Human's turn
        }

        newBoard[i] = ""; // Undo move
        moves.push(move);
    }

    return moves.reduce((bestMove, move) =>
        (player === "O" && move.score > bestMove.score) || (player === "X" && move.score < bestMove.score)
            ? move
            : bestMove,
        player === "O" ? { score: -Infinity } : { score: Infinity }
    );
}

// Helper: Check Win for Minimax
function checkWin(board, player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winCombos.some(combo => combo.every(index => board[index] === player));
}
