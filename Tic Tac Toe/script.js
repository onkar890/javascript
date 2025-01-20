let start = 'X';
boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerHTML === '') { // if box is empty  
            box.innerHTML = start;
            if (start === 'X') {
                start = 'O';
            }else {
                start = 'X';
            }
        }
    });   
    
});

let winner = () => {
    let boxText = document.querySelectorAll('.box');
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    winCombinations.forEach((win) => {
        if (boxText[win[0]].innerHTML === boxText[win[1]].innerHTML && boxText[win[2]].innerHTML === boxText[win[1]].innerHTML && boxText[win[0]].innerHTML !== '') {
            document.querySelector('.winner').innerHTML = 'Winner is ' + boxText[win[0]].innerHTML;
           boxes.forEach((box) => {
               box.removeEventListener('click', winner);
           });
        }
        
    });

    let draw = true;
    for (let i = 0; i < boxText.length; i++) {
        if (boxText[i].innerHTML === '') {
            draw = false;
            break;
        }
    }
    if (draw) {
        document.querySelector('.winner').innerHTML = 'Match Draw';
        
    }
}

boxes.forEach((box) => {
    box.addEventListener('click', winner);
});

function reset() {
    boxes.forEach((box) => {
        box.innerHTML = '';
        document.querySelector('.winner').innerHTML = '';
        box.addEventListener('click', winner);
    });
}
