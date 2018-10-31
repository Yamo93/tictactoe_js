let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let humanScore = [];
let computerScore = [];

let DOMstrings = {
    state: document.querySelector('.state'),
    gameboard: document.querySelector('.gameboard'),
    restartBtn: document.querySelector('.btn')
};


DOMstrings.gameboard.addEventListener('click', e => {

    if (gameboard.includes(parseInt(e.target.id))) {
        document.getElementById(e.target.id).innerHTML = '&#9898';

        humanScore.push(parseInt(e.target.id));
        gameboard.splice(gameboard.indexOf(parseInt(e.target.id)), 1);

        let randomItem = gameboard[Math.floor(Math.random()*gameboard.length)];

        if (parseInt(e.target.id) !== randomItem && gameboard.length > 0) {
    
            document.getElementById(randomItem.toString()).innerHTML = '&#9932';

            computerScore.push(randomItem);

            let computerIndex = gameboard.indexOf(randomItem);
            gameboard.splice(computerIndex, 1);
            DOMstrings.state.textContent = 'Your Turn!';

        } else if (parseInt(e.target.id) === randomItem) {

            let newRandomItem = gameboard[Math.floor(Math.random()*gameboard.length)];
            document.getElementById(newRandomItem.toString()).innerHTML = '&#9932';
            computerScore.push(newRandomItem);
            let newComputerIndex = gameboard.indexOf(newRandomItem);
            gameboard.splice(newComputerIndex, 1);

        }
    }

// All the possible right outcomes
    let toes = [[0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
                ];

    // For the case of winning
    var sortedHumanArr = humanScore.sort();
    var humanWins, computerWins;

    toes.forEach(toe => {
        toe.forEach(el => {
            humanWins = toe.every(i => humanScore.includes(i));
            computerWins = toe.every(i => computerScore.includes(i));
            
            if (humanWins) {
                DOMstrings.state.textContent = 'Human Wins 😎';
                DOMstrings.state.classList.toggle('wins');
                computerWins = false;
                if (DOMstrings.state.classList.contains('loses')) {
                    DOMstrings.state.classList.remove('loses');
                    DOMstrings.state.classList.add('wins');
                    }
            } else if (computerWins) {
                //humanWins = false;
                DOMstrings.state.textContent = 'Computer Wins 😣';
                console.log(`State of humanWins is: ${humanWins}`);
                DOMstrings.state.classList.add('loses');
                if (DOMstrings.state.classList.contains('wins')) {
                    DOMstrings.state.classList.remove('wins');
                    DOMstrings.state.classList.add('loses');
                }
            }
        })
        });

        /*
        toes.forEach(toe => {
            toe.forEach(el => {
                computerWins = toe.every(i => computerScore.includes(i));
                if (humanWins) {
                    computerWins = false;
                    DOMstrings.state.textContent = 'Human Wins :-D';
                } else if (computerWins && !humanWins) {
                    //computerWins = true;
                    DOMstrings.state.textContent = 'Computer Winzzz :-O';
                    if (DOMstrings.state.classList.contains('wins')) DOMstrings.state.classList.remove('wins');
                    DOMstrings.state.classList.add('loses');
                } else if (computerWins && humanWins) {
                    DOMstrings.state.textContent = 'Both won :D';
                }
            })
            });*/
    

    console.log(`Sorted human array: ${humanScore.sort()}`);

});


// Resetting the game

var boxes = document.querySelectorAll('.box');

DOMstrings.restartBtn.addEventListener('click', () => {
    var boxesArr = Array.prototype.slice.call(boxes);
    boxesArr.forEach(e => {
        e.textContent = '';
    })

    gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    humanScore = [];
    computerScore = [];
    DOMstrings.state.textContent = 'Game Restarted!';
    if (DOMstrings.state.classList.contains('loses')) DOMstrings.state.classList.remove('loses');
    if (DOMstrings.state.classList.contains('wins')) DOMstrings.state.classList.remove('wins');
});