$(document).ready(function() {
	var calculateNumber = 0;
	var audio = new Audio('./wrongSound.mp3');

	var errors = 0;
	var max;
	var maxClicks;

	var btnEasy = $('#easy');
	var btnMid = $('#mid');
	var btnHigh = $('#high');

	const tableFunc = function(columnsXcells){
		let tr = "";
		let td = "";

		for(let i = 0; i<columnsXcells; i++){
			td = td + "<td></td>"
		}

		for(let i = 0; i<columnsXcells; i++) {
			tr = tr + "<tr>" + td + "</tr>"
		}
		return tr
	};


	$('#again').click(function(){
		location.reload();
		$('#catGif').removeClass('animate');
	});

	$('#startAgain').click(function(){
		location.reload();
		$('#startAgain').css("display", "none");
	});

	$('#rules').click(function(){
		$('.modal-title').text('');
		$('.modal-title').append('Правила игры');

		$('.modal-body p').text('');
		$('.modal-body p').append('Выберите сложность которая вам по плечу. Дальше нужно за определенное время кликнуть по порядку на все числа (от 1 и т.д. до конца) пока не закончилось время. И конечно же поменьше ошибаться!');

		$('#again').text('');
		$('#again').append('Главный экран');

		$('#modalBootstrapWindow').modal('show');
	});

	//Зелена кнопочка ХОВЕР
	btnEasy.mouseenter(function() {
  		$('p.easy').css("opacity", "1");
		$('img.easy').css("opacity", "1");
	});

	btnEasy.mouseleave(function() {
  		$('p.easy').css("opacity", "0");
  		$('img.easy').css("opacity", "0");
	});

	//Жовта кнопочка ХОВЕР
	btnMid.mouseenter(function() {
		$('p.mid').css("opacity", "1");
		$('img.mid').css("opacity", "1");
	});

	btnMid.mouseleave(function() {
		$('p.mid').css("opacity", "0");
		$('img.mid').css("opacity", "0");
	});

	//КРАСНА кнопочка ХОВЕР
	btnHigh.mouseenter(function() {
		$('p.high').css("opacity", "1");
		$('img.high').css("opacity", "1");
	});

	btnHigh.mouseleave(function() {
		$('p.high').css("opacity", "0");
		$('img.high').css("opacity", "0");
	});

	//Зелена кнопочка КЛіК
	btnEasy.click(function(){
			$('#catGif').addClass('animate');
			$('.buttonHardnessLevel').css("display", "none");
			$('h2.firstWords').css("opacity", "0");
			$('h2.hardness').css("display", "none");
			$('h4').css("display", "block");
			$('.hint').css("display", "none");
			$('.lifes').css({"display": "block", "color": "#48f661"});
			$('.lifesCol').append('3');
			$('#startAgain').css("display", "block");
			max = 16;

			$('#gameTable').text('');
			$('#gameTable').append(tableFunc(4));
			$('.seconds').append('40');
			gameResults();
			timer();
			$('table').css("display", "block");
			maxClicks = 16;
			errors = 4;
		});

		//ЖОВТА кнопочка КЛіК
		btnMid.click(function(){
			$('#catGif').addClass('animate');
			$('.buttonHardnessLevel').css("display", "none")
			$('h2.firstWords').css("opacity", "0");
			$('h2.hardness').css("display", "none");
			$('.hint').css("display", "none");
			$('.lifes').css({"display": "block", "color": "#f4ed2b"});
			$('.lifesCol').append('2');
			$('h4').css("display", "block");
			$('#startAgain').css("display", "block");

			max = 25;
			$('#gameTable').text('');
			$('#gameTable').append(tableFunc(5));
			$('.seconds').append('30');
			gameResults();
			timer();
			$('table').css("display", "block");
			maxClicks = 25;
			errors = 3;
		});

		//КРАСНА кнопочка КЛіК
		btnHigh.click(function(){
			$('#catGif').addClass('animate');
			$('.buttonHardnessLevel').css("display", "none")
			$('h2.firstWords').css("opacity", "0");
			$('h2.hardness').css("display", "none");
			$('.hint').css("display", "none");
			$('.lifes').css({"display": "block", "color": "#ff6b6e"});
			$('.lifesCol').append('1');
			$('h4').css("display", "block");
			$('#startAgain').css("display", "block");

			max = 36;

			$('#gameTable').text('');
			$('#gameTable').append(tableFunc(6));
			$('.seconds').append('20');
			gameResults();
			timer();
			$('table').css("display", "block");
			maxClicks = 36;
			errors = 2;
		});

	var gameResults = function(){
		$('#gameTable').click(function(event){
	
			if($(event.target).text() == calculateNumber + 1){
				event.target = $(event.target).css('background-color', '#acf293');
				if($(event.target).text() == maxClicks){
					clearInterval(intervalId);

					$('.modal-title').text('');
					$('.modal-title').append('Ты выиграл!');

					$('.modal-body p').text('');
					$('.modal-body p').append('Так держать!');

					$('#again').text('');
					$('#again').append('Играть снова');

					$('#modalBootstrapWindow').modal('show');
				}
				calculateNumber++;
			}else{

				audio.play();
				$('.lifesCol').text('');
				$('.lifesCol').append(errors - 2);
				errors--

			if(errors === 0){
				clearInterval(intervalId);
				$('.modal-title').text('');
				$('.modal-title').append('Ты проиграл!');

				$('.modal-body p').text('');
				$('.modal-body p').append('Закончились жизни!');

				$('#again').text('');
				$('#again').append('Играть снова');

				$('#modalBootstrapWindow').modal('show');
			}
			}

		});


		function generateArrayRandomNumber (min, max) {
			var totalNumbers 		= max - min + 1,
				arrayTotalNumbers 	= [],
				arrayRandomNumbers 	= [],
				tempRandomNumber;
		
			while (totalNumbers--) {
				arrayTotalNumbers.push(totalNumbers + min);
			}
		
			while (arrayTotalNumbers.length) {
				tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
				arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
				arrayTotalNumbers.splice(tempRandomNumber, 1);
			}
		
			return arrayRandomNumbers;
		}
	
		var randomNumber = generateArrayRandomNumber(01, max);
		
		
		var t = document.getElementById("gameTable");
		var trs = t.getElementsByTagName("tr");
		var tds = null;
		
		for (var i=0; i<trs.length; i++){
		    tds = trs[i].getElementsByTagName("td");
		    for (var n=0; n<tds.length;n++){
		    	randomNumber1 = randomNumber.shift();
		    	tds[n].innerHTML = randomNumber1;
		
		    };  
		};
	}

		


	var timer = function(){
		const time = $('.seconds');
  		intervalId = setInterval(timerDecrement, 1000);
	
		function timerDecrement() {
  			const newTime = time.text() - 1;
	
  			time.text(newTime);
	
  			if(newTime === 0){
  				clearInterval(intervalId);
  				$('.modal-title').text('');
				$('.modal-title').append('Ты проиграл!');

				$('.modal-body p').text('');
				$('.modal-body p').append('Закончилось время!');

				$('#modalBootstrapWindow').modal('show');
  			};
		};
	};

	
	

});








