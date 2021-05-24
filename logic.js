const winner_status = document.querySelector('.status');
const playerx_status = document.querySelector('.playerx-status');
const playery_status = document.querySelector('.playery-status');
const brd_reset = document.querySelector('.board-reset');
const reset_btn = document.querySelector('.reset');
const cells = document.querySelectorAll('.grid-cell');


let winner = null;
let turn = 0;
let playerx = 0;
let playery = 0;

winner_status.innerHTML = 'Player 1\'s turn';
playerx_status.innerHTML = playerx;
playery_status.innerHTML = playery;


//functions
const resetGame = () => {
	turn = 0;
	winner = null;
	winner_status.innerHTML = 'Player 1\'s turn';
	for (const cell of cells) {
		cell.classList.remove('x');
		cell.classList.remove('o');
		cell.classList.remove('winner-cells');
	}
};

const resetBoard = ()=> {
	turn = 0;
	playerx = 0;
	playery = 0;
	winner = null;
	winner_status.innerHTML = 'Player 1\'s turn';
	playerx_status.innerHTML = playerx;
	playery_status.innerHTML = playery;
	for (const cell of cells) {
		cell.classList.remove('x');
		cell.classList.remove('o');
		cell.classList.remove('winner-cells');
	}

};

const handleWinner = (letter) => {
	winner = letter;
	if (letter === 'x') {
		playerx += 1;
		winner_status.innerHTML = 'Player 1 is the winner!';
		playerx_status.innerHTML = playerx;
		playery_status.innerHTML = playery;
	}
	else {
		playery += 1;
		winner_status.innerHTML = 'Player 2 is the winner!';
		playerx_status.innerHTML = playerx;
		playery_status.innerHTML = playery;
	}

};

const checkWinner = () => {
	const tl = cells[0].classList[1];
	const tm = cells[1].classList[1];
	const tr = cells[2].classList[1];
	const ml = cells[3].classList[1];
	const mm = cells[4].classList[1];
	const mr = cells[5].classList[1];
	const bl = cells[6].classList[1];
	const bm = cells[7].classList[1];
	const br = cells[8].classList[1];
	//cases to declare winner
	if (turn > 4) {
		//Horizontal
		if (tl && tl === tm && tl === tr) {
			handleWinner(tl);
			cells[0].classList.add('winner-cells');
			cells[1].classList.add('winner-cells');
			cells[2].classList.add('winner-cells');
		}

		else if (ml && ml === mm && ml === mr) {
			handleWinner(ml);
			cells[3].classList.add('winner-cells');
			cells[4].classList.add('winner-cells');
			cells[5].classList.add('winner-cells');
		}

		else if (bl && bl === bm && bl === br) {
			handleWinner(bl);
			cells[6].classList.add('winner-cells');
			cells[7].classList.add('winner-cells');
			cells[8].classList.add('winner-cells');
		}

		//Vertical
		else if (tl && tl === ml && tl === bl) {
			handleWinner(tl);
			cells[0].classList.add('winner-cells');
			cells[3].classList.add('winner-cells');
			cells[6].classList.add('winner-cells');
		}

		else if (tm && tm === mm && tm === bm) {
			handleWinner(tm);
			cells[1].classList.add('winner-cells');
			cells[4].classList.add('winner-cells');
			cells[7].classList.add('winner-cells');
		}

		else if (tr && tr === mr && tr === br) {
			handleWinner(tr);
			cells[2].classList.add('winner-cells');
			cells[5].classList.add('winner-cells');
			cells[8].classList.add('winner-cells');
		}

		//Diagonal
		else if (tl && tl === mm && tl === br) {
			handleWinner(tl);
			cells[0].classList.add('winner-cells');
			cells[4].classList.add('winner-cells');
			cells[8].classList.add('winner-cells');
		}

		else if (tr && tr === mm && tr === bl) {
			handleWinner(tr);
			cells[2].classList.add('winner-cells');
			cells[4].classList.add('winner-cells');
			cells[6].classList.add('winner-cells');
		}

		else if (tl && tm && tr && ml && mm && mr && bl && bm && br) {
			playerx += 1;
			playery += 1;
			winner_status.innerHTML = 'It\'s a tie!';
			playerx_status.innerHTML = playerx;
			playery_status.innerHTML = playery;


		}

		else {
			return;
		}
	}
};


const playerMove = (e) => {
	const classList = e.target.classList;

	if (winner != null || classList[1] === 'x' || classList[1] === 'o') {
		return;
	}

	else {
		if (turn%2 === 0) {
			winner_status.innerHTML = 'Player 2\'s turn';
			classList.add('x');
			turn += 1;
		}
		else {
			winner_status.innerHTML = 'Player 1\'s turn';
			classList.add('o');
			turn += 1;
		}
		checkWinner();

	}
	
};


//Event listeners
reset_btn.addEventListener('click', resetGame);

brd_reset.addEventListener('click', resetBoard);

for (const cell of cells) {
	cell.addEventListener('click', playerMove);
}