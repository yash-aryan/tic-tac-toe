// Custom Module Function
const gameBoard = (() => {
	const _gridCells = Array.from(document.querySelectorAll(".grid-cell"));
	const _board = ["", "", "", "", "", "", "", "", ""];
	const _player1 = { name: "player1", marker: "X" };
	const _player2 = { name: "player2", marker: "O" };
	let _currentPlayer = _player1;
	let _guideIndex = null;

	function _changeCurrentPlayer() {
		if (_currentPlayer === _player1) _currentPlayer = _player2;
		else _currentPlayer = _player1;
	}

	function getCurrentPlayer() {
		return _currentPlayer;
	}
	// Check if someone won & return player's object, otherwise return null
	function _winnerFoundYet() {
		// Top & Left
		if (
			((_board[0] === _board[1] && _board[0] === _board[2]) ||
				(_board[0] === _board[3] && _board[0] === _board[6])) &&
			_board[0] !== ""
		) {
			_guideIndex = 0;
			return true;
		}
		// Bottom & Right
		else if (
			((_board[8] === _board[7] && _board[8] === _board[6]) ||
				(_board[8] === _board[5] && _board[8] === _board[2])) &&
			_board[8] !== ""
		) {
			_guideIndex = 8;
			return true;
		}
		// Middle & Diagonals
		else if (
			((_board[2] === _board[4] && _board[2] === _board[6]) ||
				(_board[0] === _board[4] && _board[0] === _board[8]) ||
				(_board[3] === _board[4] && _board[3] === _board[5]) ||
				(_board[1] === _board[4] && _board[1] === _board[7])) &&
			_board[4] !== ""
		) {
			_guideIndex = 4;
			return true;
		} else return null;
	}

	function _getWinner(index) {
		switch (_board[index]) {
			case "X":
				return _player1;
			case "O":
				return _player2;
		}
	}

	function setMarker(index) {
		// Is the grid cell already filled? If yes then exit the function
		if (_isGridCellTaken(index)) return;
		// Add marker class in DOM, which holds svg for Xs & Os
		switch (_currentPlayer.marker) {
			case "X":
				_gridCells[index].classList.add("markedX");
				break;
			case "O":
				_gridCells[index].classList.add("markedO");
				break;
		}
		// Add marker to _board Array as well
		_board[index] = _currentPlayer.marker;
		_changeCurrentPlayer();
		// if statement only runs if winner is found
		if (!!_winnerFoundYet()) {
			console.log(`WINNER IS ${_getWinner(_guideIndex).marker}!!`);
			_resetGame();
		}
	}

	function _isGridCellTaken(index) {
		if (_board[index] !== "") return true;
		else return false;
	}

	function _resetGame() {
		for (let i = 0; i < _board.length; i++) {
			_board[i] = "";
		}
		_guideIndex = null;
		_currentPlayer = _player1;
		_gridCells.forEach(element => {
			element.classList.remove("markedX", "markedO");
		});
	}

	return {
		setMarker,
		getCurrentPlayer
	};
})();

const initGame = (() => {
	const _gridCells = Array.from(document.querySelectorAll(".grid-cell"));
	_gridCells.forEach(n => {
		n.addEventListener("click", _setMarkerOnCell);
	});

	function _setMarkerOnCell() {
		let clickedIndex = _gridCells.indexOf(this);
		gameBoard.setMarker(clickedIndex);
	}
})();
