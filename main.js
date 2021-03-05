$(document).ready(() => {
	let audio = new Audio('./sounds/wrongSound.mp3');
	let calculateNumber = 0;
	let errors = 0;
	let maxClicks;
	let max;

	const modalBootstrapWindow = $('#modalBootstrapWindow');
	const modalTitle = $('.modal-title');
	const modalBody = $('.modal-body p');
	const gameTable = $('#gameTable');
	const livesCol = $('.livesCol');
	const btnEasy = $('#easy');
	const btnMid = $('#mid');
	const btnHigh = $('#high');
	const again = $('#again');
	const secondsSelector = $('.seconds');

	again.click(() => {
		location.reload();
		$('#catGif').removeClass('animate');
	});

	$('#startAgain').click(() => {
		location.reload();
		$('#startAgain').css('display', 'none');
	});

	$('#rules').click(() => {
		modalTitle.text('');
		modalTitle.append('Rules of the game');
		modalBody.text('');
		modalBody.append('Choose the difficulty you can handle. Then you need to click in order on all the numbers (from 1, etc. to the end) in a certain time until the time runs out. And of course, make fewer mistakes!');
		again.text('');
		again.append('Back');

		$('#modalBootstrapWindow').modal('show');
	});

	let intervalId;

	const intervalIdFunc = (timerDec) => {
		intervalId = setInterval(timerDec, 1000);
	};

	let timer = () => {
		const time = secondsSelector;

		const timerDecrement = () => {
			const newTime = time.text() - 1;

			time.text(newTime);

			if (newTime === 0) {
				clearInterval(intervalId);
				modalTitle.text('');
				modalTitle.append('You Lose!');
				modalBody.text('');
				modalBody.append('Time is up!');
				modalBootstrapWindow.modal('show');
			}
		};

		intervalIdFunc(timerDecrement, 1000);
	};

	let gameResults = () => {
		gameTable.click((event) => {
			if (+$(event.target).text() === calculateNumber + 1) {
				event.target = $(event.target).css('background-color', '#acf293');

				if (+$(event.target).text() === maxClicks) {
					clearInterval(intervalId);
					modalTitle.text('');
					modalTitle.append('You Win!');
					modalBody.text('');
					modalBody.append('Keep it up!');
					again.text('');
					again.append('Play Again');
					modalBootstrapWindow.modal('show');
				}

				calculateNumber++;
			} else {
				audio.play();
				livesCol.text('');
				livesCol.append((errors - 2).toString());
				errors--;

				if (+errors === 0) {
					clearInterval(intervalId);
					modalTitle.text('');
					modalTitle.append('You lose!');
					modalBody.text('');
					modalBody.append('Lives out!');
					again.text('');
					again.append('Play Again');
					modalBootstrapWindow.modal('show');
				}
			}
		});

		const generateArrayRandomNumber = (min, max) => {
			const arrayTotalNumbers = [];
			const	arrayRandomNumbers = [];
			let totalNumbers = max - min + 1;
			let	tempRandomNumber;

			while (totalNumbers--) {
				arrayTotalNumbers.push(totalNumbers + min);
			}

			while (arrayTotalNumbers.length) {
				tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
				arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
				arrayTotalNumbers.splice(tempRandomNumber, 1);
			}

			return arrayRandomNumbers;
		};

		let randomNumber = generateArrayRandomNumber(1, max);
		let t = document.getElementById('gameTable');
		let trs = t.getElementsByTagName('tr');
		let tds = null;

		for (let i = 0; i < trs.length; i++){
			tds = trs[i].getElementsByTagName('td');

			for (let n = 0; n < tds.length; n++){
				tds[n].innerHTML = randomNumber.shift();
			}
		}
	};

	const tableFunc = (columnsXcells) => {
		let tr = '';
		let td = '';

		for(let i = 0; i < columnsXcells; i++){
			td += '<td></td>';
		}

		for(let i = 0; i < columnsXcells; i++) {
			tr = tr + '<tr>' + td + '</tr>';
		}

		return tr
	};

	const mouseEvents = (selector, selectorName, mouseEvent) => {
		if (mouseEvent === 'mouseEnter') {
			selector.mouseenter(() => {
				$(`p.${selectorName}`).css('opacity', '1');
				$(`img.${selectorName}`).css('opacity', '1');
			})
		} else if (mouseEvent === 'mouseLeave') {
			selector.mouseleave(() => {
				$(`p.${selectorName}`).css('opacity', '0');
				$(`img.${selectorName}`).css('opacity', '0');
			})
		}
	};

	mouseEvents(btnEasy, 'easy', 'mouseEnter');
	mouseEvents(btnEasy, 'easy', 'mouseLeave');
	mouseEvents(btnMid, 'mid', 'mouseEnter');
	mouseEvents(btnMid, 'mid', 'mouseLeave');
	mouseEvents(btnHigh, 'high', 'mouseEnter');
	mouseEvents(btnHigh, 'high', 'mouseLeave');

	const hardnessLevel = (
		difficultlySelector,
		seconds,
		livesCols,
		livesColor,
		maxCells,
		maxGameClicks,
		gameErrors,
		tableFuncValue,
	) => {
		difficultlySelector.click(() => {
			$('#catGif').addClass('animate');

			$('.buttonHardnessLevel').css('display', 'none');
			$('h2.hardness').css('display', 'none');
			$('.hint').css('display', 'none');
			$('.lives').css({'display': 'block', 'color': livesColor});
			$('h4').css('display', 'block');
			$('#startAgain').css('display', 'block');
			$('h2.firstWords').css('display', 'none');

			livesCol.append(livesCols);

			max = maxCells;

			gameTable.text('');

			gameTable.append(tableFunc(tableFuncValue));
			secondsSelector.append(seconds);

			$('table').css('display', 'block');

			gameResults();
			timer();

			maxClicks = maxGameClicks;
			errors = gameErrors;
		});
	};

	hardnessLevel(
		btnEasy,
		'40',
		'3',
		'#48f661',
		16,
		16,
		4,
		4
	);

	hardnessLevel(
		btnMid,
		'30',
		'2',
		'#f4ed2b',
		25,
		25,
		3,
		5
	);

	hardnessLevel(
		btnHigh,
		'30',
		'1',
		'#ff6b6e',
		36,
		36,
		2,
		6
	);
});
