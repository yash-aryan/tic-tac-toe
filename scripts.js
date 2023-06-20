"use strict";
// Entire Code in a Anonymous IIFE
(function () {
	// Module Function
	const Modal = (() => {
		const _bgOverlay = document.querySelector(".bg-overlay");
		const _formModal = document.querySelector(".pre-game-modal");
		const _resultModal = document.querySelector(".result-modal");
		document
			.querySelector(".btn-restart")
			.addEventListener("click", _resetGame);

		function _close() {
			_formModal.style.display = "none";
			_bgOverlay.style.display = "none";
			_resultModal.style.display = "none";
		}

		function _setName() {
			document.forms[0].addEventListener("submit", e => {
				const p1Input = document.querySelector("#player1-name");
				const p2Input = document.querySelector("#player2-name");
				e.preventDefault();
				if (p1Input.value.trim() !== "") player1.name = p1Input.value;
				else player1.name = "Player1";
				if (p2Input.value.trim() !== "") player2.name = p2Input.value;
				else player2.name = "Player2";
				dispTurnStatus();
				_close();
			});
		}

		// This function resets the entire game
		function _resetGame() {
			for (let i = 0; i < board.length; i++) {
				board[i] = "";
			}
			currentPlayer = player1;
			gridCells.forEach(element =>
				element.classList.remove("markedX", "markedO")
			);
			dispTurnStatus();
			_close();
		}

		// This function opens the pre-game form modal
		function openForm() {
			_formModal.style.display = "flex";
			_bgOverlay.style.display = "block";
			_setName();
		}

		// This function opens the post-game result modal
		function openResult(outcome) {
			dispResultStatus(outcome);
			_resultModal.style.display = "flex";
			_bgOverlay.style.display = "block";
		}

		return {
			openResult,
			openForm
		};
	})();

	// Initial Variables
	const gridCells = Array.from(document.querySelectorAll(".grid-cell"));
	const player1 = { marker: "X" };
	const player2 = { marker: "O" };
	const board = ["", "", "", "", "", "", "", "", ""];
	Modal.openForm();
	let currentPlayer = player1;

	// This IIFE starts the game, by allowing user to set markers on click
	(function () {
		gridCells.forEach(element => {
			element.addEventListener("click", _setMarkerOnCell);
		});

		function _setMarkerOnCell() {
			const _clickedIndex = gridCells.indexOf(this);
			setMarker(_clickedIndex);
		}
	})();

	function setMarker(index) {
		// Is the grid cell already filled? If yes then exit the function
		if (isGridCellTaken(index)) return;
		// Add marker class in DOM, which holds svg for Xs & Os
		switch (currentPlayer.marker) {
			case "X":
				gridCells[index].classList.add("markedX");
				break;
			case "O":
				gridCells[index].classList.add("markedO");
				break;
		}
		// Add marker to board Array as well
		board[index] = currentPlayer.marker;
		// Change current player
		if (currentPlayer === player1) currentPlayer = player2;
		else currentPlayer = player1;
		// After marker is set, following functions are called
		checkForOutcome();
		dispTurnStatus();
	}

	function isGridCellTaken(index) {
		if (board[index] !== "") return true;
		else return false;
	}

	function checkForOutcome() {
		if (board.every(element => element !== "")) {
			Modal.openResult("TIE");
		} else {
			checkForWinner();
		}
	}

	// Check if someone won by checking patterns
	function checkForWinner() {
		const _getWinner = index => {
			switch (board[index]) {
				case "X":
					Modal.openResult("X");
					break;
				case "O":
					Modal.openResult("O");
					break;
			}
		};
		// Check for matching patterns for:-
		// Top & Left
		if (
			((board[0] === board[1] && board[0] === board[2]) ||
				(board[0] === board[3] && board[0] === board[6])) &&
			board[0] !== ""
		)
			_getWinner(0);
		// Bottom & Right
		else if (
			((board[8] === board[7] && board[8] === board[6]) ||
				(board[8] === board[5] && board[8] === board[2])) &&
			board[8] !== ""
		)
			_getWinner(8);
		// Middle & Diagonals
		else if (
			((board[2] === board[4] && board[2] === board[6]) ||
				(board[0] === board[4] && board[0] === board[8]) ||
				(board[3] === board[4] && board[3] === board[5]) ||
				(board[1] === board[4] && board[1] === board[7])) &&
			board[4] !== ""
		)
			_getWinner(4);
	}

	function dispTurnStatus() {
		const _headerX = document.querySelector("#x-turn");
		const _headerO = document.querySelector("#o-turn");

		_headerX.children[0].textContent = `X (${player1.name})`;
		_headerO.children[0].textContent = `O (${player2.name})`;
		// Adds indicator for current player
		switch (currentPlayer.marker) {
			case "X":
				_headerO.classList.remove("current-turn");
				_headerX.classList.add("current-turn");
				break;
			case "O":
				_headerX.classList.remove("current-turn");
				_headerO.classList.add("current-turn");
				break;
		}
	}

	function dispResultStatus(outcome) {
		const _headerResult = document.querySelector("#result-status");
		switch (outcome) {
			case "X":
				_headerResult.textContent = `The winner is ${player1.name}!`;
				break;
			case "O":
				_headerResult.textContent = `The winner is ${player2.name}!`;
				break;
			case "TIE":
				_headerResult.textContent = `It's a tie!`;
				break;
		}
	}
})();
