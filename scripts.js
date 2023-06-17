// Custom Module Function
const gameBoard = (() => {
	const _board = ['', '', '', '', '', '', '', '', ''];
	const _player1 = { name: 'player1', marker: 'X' };
	const _player2 = { name: 'player2', marker: 'O' };
	let _currentPlayer = _player1;

	const _changeCurrentPlayer = () => {
		if (_currentPlayer === _player1) return _player2;
		else if (_currentPlayer === _player2) return _player1;
		else console.log('Error in _changeCurrentPlayer');
	};

	const _checkMarker = index => {
		if (_board[index] === 'X') return _player1;
		else return _player2;
	};

	const getCurrentPlayer = () => {
		return _currentPlayer;
	};

	const getBoardStatus = () => {
		console.log(_board);
	};

	const _getWinner = () => {
		if (
			((_board[0] === _board[1] && _board[0] === _board[2]) ||
				(_board[0] === _board[3] && _board[0] === _board[6])) &&
			_board[0] !== ''
		)
			return _checkMarker(0);
		else if (
			((_board[8] === _board[7] && _board[8] === _board[6]) ||
				(_board[8] === _board[5] && _board[8] === _board[2])) &&
			_board[8] !== ''
		)
			return _checkMarker(8);
		else if (
			_board[0] === _board[4] &&
			_board[0] === _board[8] &&
			_board[0] !== ''
		)
			return _checkMarker(0);
		else if (
			_board[2] === _board[4] &&
			_board[2] === _board[6] &&
			_board[2] !== ''
		)
			return _checkMarker(2);
		else return null;
	};

	const _resetGame = () => {
		for (let i = 0; i < _board.length; i++) {
			_board[i] = '';
		}
		_currentPlayer = _player1;
	};

	const setMarker = index => {
		// Prevent invalid inputs
		if (index < 0 || index > 8 || isNaN(index)) {
			console.log('Enter a valid index!');
			if (_board[index] === 'X' || _board[index] === 'O') {
				console.log(index);
				console.log('Spot taken!');
			}
			startGame();
		}

		_board[index] = _currentPlayer.marker;
		_currentPlayer = _changeCurrentPlayer();
		console.log(`Marker placed at ${index}`);
		getBoardStatus();
		if (!!_getWinner()) {
			alert(`WINNER IS ${_getWinner().marker}!!`);
			_resetGame();
		}
		else startGame();
	};

	return {
		setMarker,
		getBoardStatus,
		getCurrentPlayer,
	};
})();

startGame();

function startGame() {
	let indexInput;
	console.log(`--- It's ${gameBoard.getCurrentPlayer().marker} turn! ---`);
	do {
		indexInput = prompt('Enter where you want to put marker');
	} while (indexInput === null);
	gameBoard.setMarker(+indexInput);
}
