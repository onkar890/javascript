let stone = 0
let paper = 1
let scissor = 2
let user_score = 0
let computer_score = 0

let user_score_span = document.querySelector('#user-score')
let computer_score_span = document.querySelector('#computer-score')

let stone_img = document.querySelector('#stone')
let paper_img = document.querySelector('#paper')
let scissor_img = document.querySelector('#scissor')

let images = [stone_img, paper_img, scissor_img];
let result = document.querySelector('.winner');



images.forEach((img) => {
    img.addEventListener('click', () => {
        let user_img = img;
        let computer = Math.floor(Math.random() * 3);

        if (user_img === stone_img) {
            if (computer === stone) {
                result.innerHTML = "It's a tie!";
            } else if (computer === paper) {
                result.innerHTML = "Computer wins!";
                computer_score++;
            } else {
                result.innerHTML = "You win!";
                user_score++;
            }
        } else if (user_img === paper_img) {
            if (computer === stone) {
                result.innerHTML = "You win!";
                user_score++;
            } else if (computer === paper) {
                result.innerHTML = "It's a tie!";
            } else {
                result.innerHTML = "Computer wins!";
                computer_score++;
            } 
        }else if (user_img === scissor_img) {
                if (computer === stone) {
                    result.innerHTML = "Computer wins!";
                    computer_score++;
                } else if (computer === paper) {
                    result.innerHTML = "You win!";
                    user_score++;
                } else {
                    result.innerHTML = "It's a tie!";
                }
            }

            user_score_span.innerHTML = user_score;
            computer_score_span.innerHTML = computer_score;
        })
    });

 
