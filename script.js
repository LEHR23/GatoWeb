const container = document.querySelector('.container');
const cat = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function game(){
    for(let i = 0; i < 9; i++){
        const div = document.createElement('div');
        div.classList.add('box');
        div.id = i;
        div.addEventListener('click', boxClicked);
        container.appendChild(div);
    }
    document.getElementById('player').textContent = 'Player: ' + currentPlayer;
}

function boxClicked(box){
    box.target.removeEventListener('click', boxClicked);
    box.target.textContent = currentPlayer;
    cat[box.target.id] = currentPlayer;
    if (currentPlayer === 'X'){
        currentPlayer = 'O';
        checkWin('X');
    } else {
        currentPlayer = 'X';
        checkWin('O');
    }
    
    document.getElementById('player').textContent = 'Player: ' + currentPlayer;
}

function checkWin(flag){
    if(win([0,1,2],flag) || win([3,4,5],flag) || win([6,7,8],flag) || 
    win([0,3,6],flag) || win([1,4,7],flag) || win([2,5,8],flag) || 
    win([0,4,8],flag) || win([2,4,6],flag)){
        return true;
    } else if(cat[0] !== '' && cat[1] !== '' && cat[2] !== '' && cat[3] !== '' && cat[4] !== '' && cat[5] !== '' && cat[6] !== '' && cat[7] !== '' && cat[8] !== ''){
        const draw = document.createElement('div');
        draw.classList.add('draw');
        draw.textContent = 'Draw!';
        container.appendChild(draw);
        setTimeout(reset, 2000);
    }
}

function reset(message){
    for(let i = 0; i < 9; i++){
        cat[i] = '';
        document.getElementById(i).textContent = '';
        document.getElementById(i).classList.remove('boxWinner')
        document.getElementById(i).addEventListener('click', boxClicked);
    }
    if(document.querySelector('.draw')) container.removeChild(document.querySelector('.draw'));
    if(document.querySelector('.winner')) container.removeChild(document.querySelector('.winner'));
}

function win(vector, flag){
    for(let i = 0; i < 3; i++){
        if(cat[vector[i]] !== flag){
            return false;
        }
    }
    showWinner(flag, vector);
    return true;
}

function showWinner(player, vector){
    const winner = document.createElement('div');
    winner.classList.add('winner');
    winner.textContent = 'Player ' + player + ' wins!';
    container.appendChild(winner);
    vector.forEach(element => {
        document.getElementById(element).classList.add('boxWinner');
    });
    setTimeout(reset, 2000);
}

game();