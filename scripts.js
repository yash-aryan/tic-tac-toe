// Custom Module Function
"use strict";
const gameBoard = (() => {
	const _gridCells = Array.from(document.querySelectorAll(".grid-cell"));
	const _restartModal = document.querySelector(".restart-modal");
	const _bgOverlay = document.querySelector(".bg-overlay");

	const _board = ["", "", "", "", "", "", "", "", ""];
	const _player1 = { name: "player1", marker: "X" };
	const _player2 = { name: "player2", marker: "O" };
	let _currentPlayer = _player1;
	let _outcome;
	_dispTurnStatus();

	(function () {
		_gridCells.forEach(element => {
			element.addEventListener("click", _setMarkerOnCell);
		});

		function _setMarkerOnCell() {
			let clickedIndex = _gridCells.indexOf(this);
			_setMarker(clickedIndex);
		}
	})();

	function _setMarker(index) {
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
		// Change current player
		if (_currentPlayer === _player1) _currentPlayer = _player2;
		else _currentPlayer = _player1;
		// After marker is set, following functions are called
		_checkForOutcome();
		_dispTurnStatus();
	}

	function _isGridCellTaken(index) {
		if (_board[index] !== "") return true;
		else return false;
	}

	function _checkForOutcome() {
		if (_board.every(element => element !== "")) {
			_outcome = "TIE";
			_openModal();
		} else {
			_checkForWinner();
		}
	}

	// Check if someone won by checking patterns
	function _checkForWinner() {
		const _getWinner = index => {
			switch (_board[index]) {
				case "X":
					_outcome = _player1.marker;
					break;
				case "O":
					_outcome = _player2.marker;
					break;
			}
			_openModal();
		};
		// Check for matching patterns for:-
		// Top & Left
		if (
			((_board[0] === _board[1] && _board[0] === _board[2]) ||
				(_board[0] === _board[3] && _board[0] === _board[6])) &&
			_board[0] !== ""
		)
			_getWinner(0);
		// Bottom & Right
		else if (
			((_board[8] === _board[7] && _board[8] === _board[6]) ||
				(_board[8] === _board[5] && _board[8] === _board[2])) &&
			_board[8] !== ""
		)
			_getWinner(8);
		// Middle & Diagonals
		else if (
			((_board[2] === _board[4] && _board[2] === _board[6]) ||
				(_board[0] === _board[4] && _board[0] === _board[8]) ||
				(_board[3] === _board[4] && _board[3] === _board[5]) ||
				(_board[1] === _board[4] && _board[1] === _board[7])) &&
			_board[4] !== ""
		)
			_getWinner(4);
	}

	function _openModal() {
		_dispResultStatus();
		_restartModal.style.display = "flex";
		_bgOverlay.style.display = "block";
		document
			.querySelector(".btn-restart")
			.addEventListener("click", _resetGame);
	}

	function _closeModal() {
		_restartModal.style.display = "none";
		_bgOverlay.style.display = "none";
	}

	function _resetGame() {
		// reset _board Array
		for (let i = 0; i < _board.length; i++) {
			_board[i] = "";
		}
		_currentPlayer = _player1;
		_gridCells.forEach(element => {
			element.classList.remove("markedX", "markedO");
		});
		_dispTurnStatus();
		_closeModal();
	}

	function _dispTurnStatus() {
		const headerX = document.querySelector("#x-turn");
		const headerO = document.querySelector("#o-turn");
		switch (_currentPlayer.marker) {
			case "X":
				headerO.classList.remove("current-turn");
				headerX.classList.add("current-turn");
				break;
			case "O":
				headerX.classList.remove("current-turn");
				headerO.classList.add("current-turn");
				break;
		}
	}

	function _dispResultStatus() {
		const headerResult = document.querySelector("#result-status");
		switch (_outcome) {
			case "X":
				headerResult.textContent = `The winner is ${_player1.name}!`;
				break;
			case "O":
				headerResult.textContent = `The winner is ${_player2.name}!`;
				break;
			case "TIE":
				headerResult.textContent = `It's a tie!`;
				break;
		}
	}
})();
