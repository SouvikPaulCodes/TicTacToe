const playerOne = document.querySelector('.player1');
const playerTwo = document.querySelector('.player2');
const players = document.querySelector('.players');
const dialog = document.querySelector('.before');

function stat(name){
    let symbol = "";
    const setSymbol = function(sym){
        symbol = sym;
    };
    const getSymbol = function(){
        return symbol;
    };

    return {name, setSymbol, getSymbol};
}

const user1 = stat("player1");
const user2 = stat("player2");

let selected = '';

players.addEventListener('click', function(event){
    const clicked = event.target.className;
    
    if(clicked==='player1' || clicked==='player2'){
        selected = clicked;
        dialog.showModal();       
    }
})

let XorO = 0;

document.querySelector('.choices').addEventListener('click', function(event){
    const choose = event.target.className;

    if(choose==='x') XorO = 1;
    else if(choose==='o') XorO = 2;

    if(selected==='player1'){
        if(XorO===1){
            user1.setSymbol("X");
            user2.setSymbol("O");
        }
        else {
            user1.setSymbol("O");
            user2.setSymbol("X");
        }
    }
    else {
        if(XorO===1){
            user2.setSymbol("X");
            user1.setSymbol("O");
        }
        else {
            user2.setSymbol("O");
            user1.setSymbol("X");
        }
    }

    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    img1.classList.add('but1');
    img1.classList.add('but2');
    if(user1.getSymbol()==="X"){
        img1.src = './big-x.svg';
        img2.src = './2390-letter-o.svg';
    }
    else {
        img1.src = './2390-letter-o.svg';
        img2.src = './big-x.svg';
    }
    
    playerOne.appendChild(img1);
    playerTwo.appendChild(img2);

    dialog.close();
})


let play = Array.from({ length: 3 }, () => Array(3).fill(null));

const game = (function() {
    let count = 0;
    const setCell = function(row, col, weapon) {
        count++;
        play[row][col] = weapon;
    };


    const isWon = function(row, col) {
        const cell = play[row][col];
        if (!cell) return false;

        if (play[row][0] === cell && play[row][1] === cell && play[row][2] === cell) {
            return true;
        }

        if (play[0][col] === cell && play[1][col] === cell && play[2][col] === cell) {
            return true;
        }

        if (row === col && play[0][0] === cell && play[1][1] === cell && play[2][2] === cell) {
            return true;
        }

        if (row + col === 2 && play[0][2] === cell && play[1][1] === cell && play[2][0] === cell) {
            return true;
        }

        return false;
    };

    const isDraw = function() {
        if(count===9) return true;
        return false;
    }

    const resetCount = function() {
        count = 0;
    }

    return { setCell, isWon, isDraw, resetCount };
})();

let turn = "PLAYER 1";

const winbox = document.querySelector('.winner');
const wintext = document.querySelector('.text');

document.querySelector(`.playground`).addEventListener('click', function(event){
    const number = event.target.id;
    const no = document.querySelector(`#${number}`);

    let currentPlayer = turn === 'PLAYER 1' ? user1 : user2;
    let used = currentPlayer.getSymbol().toLowerCase();
    const addImg = document.createElement('img');
    addImg.classList.add(`inside`);

    if(used==='') return;

    addImg.src = used === 'x' ? './big-x.svg' : './2390-letter-o.svg';


    let row = -1;
    let col = -1;

    if(number==='c1'){
        row = 0;
        col = 0;
    }
    if(number==='c2'){
        row = 0;
        col = 1;
    }
    if(number==='c3'){
        row = 0;
        col = 2;
    }
    if(number==='c4'){
        row = 1;
        col = 0;
    }
    if(number==='c5'){
        row = 1;
        col = 1;
    }
    if(number==='c6'){
        row = 1;
        col = 2;
    }
    if(number==='c7'){
        row = 2;
        col = 0;
    }
    if(number==='c8'){
        row = 2;
        col = 1;
    }
    if(number==='c9'){
        row = 2;
        col = 2;
    }

    if(play[row][col]===null){
        no.appendChild(addImg);
        game.setCell(row, col, used);
        if(game.isWon(row, col)===true){
            wintext.textContent = `${turn} has won the game!!!`;
            winbox.showModal();
        }
        else if(game.isDraw()===true){
            wintext.textContent = `Both the players were equally matched`;
            winbox.showModal();
        }
        else if(turn==='PLAYER 1'){
            turn = 'PLAYER 2';
        }
        else turn = 'PLAYER 1';
    }
    
});

document.querySelector(`.ok`).addEventListener('click', function(){
    winbox.close();
    play = Array.from({length : 3}, () => Array(3).fill(null));

    document.querySelectorAll(`.cell`).forEach(num => {
        const resetImg = num.querySelector(`img`);

        if(resetImg) num.removeChild(resetImg);
    });

    turn = `PLAYER 1`;
    wintext.textContent = '';

    const res1 = playerOne.querySelector(`img`);
    if(res1) playerOne.removeChild(res1);

    const res2 = playerTwo.querySelector(`img`);
    if(res2) playerTwo.removeChild(res2);

    user1.setSymbol("");
    user2.setSymbol("");
    game.resetCount();
});