var wordList = ['house','car','door','plate','table','plain','real','empty','run','lake','power','hope','button','join','rain','bat','rest','copy','wet','sleep','low'];

var imageList = [
	'<img src="images/hangman_1.jpg">',
  '<img src="images/hangman_2.jpg">',
  '<img src="images/hangman_3.jpg">',
  '<img src="images/hangman_4.jpg">',
  '<img src="images/hangman_5.jpg">',
  '<img src="images/hangman_6.jpg">',
  '<img src="images/hangman_7.jpg">',
  '<img src="images/hangman_8.jpg">',
  '<img src="images/hangman_9.jpg">',
  '<img src="images/hangman_10.jpg">',
  '<img src="images/hangman_11.jpg">',
  '<img src="images/hangman_12.jpg">'
];

var targetWord = '';
var dashes = [];
var dashesString = '';
var inputSplit = [];
var input = '';
var targetWordSplit = [];
var wrong = 0;
var correct = 0;
var guessed = [];

getTargetWord();
document.querySelector('#hangmanpicture').innerHTML = imageList[wrong];

// EVENT LISTENERS
document.querySelector('#submit').addEventListener('click', function() {
	getInput();
  updateDashesDom();
  checkWin();
});

function getTargetWord() {
	targetWord = wordList[Math.floor(Math.random() * wordList.length)];
  	console.log('target word: ' + targetWord);
  targetWordSplit = targetWord.split('');
  	console.log(targetWordSplit);
  for (let i = 0 ; i < targetWordSplit.length ; i ++) {
  	dashes.push(' _ ');
    dashesString += dashes[i];
  }
  	console.log('dashes array : ' + dashes)
  	console.log('dashes String : ' + dashesString)
  document.querySelector('#guesses').innerHTML = '<h1>' + dashesString + '</h1>';
}

function getInput() {
	input = document.querySelector('#guess').value;
  	console.log('user input: ' + input);
  document.querySelector('#guess').value = '';
}

function updateDashesDom() {
	let numberL = 0;
	let Test = 0;
  let yes = false;
	for(let i = 0 ; i < targetWordSplit.length ; i ++) {
  	if (input == targetWordSplit[i]) {
      dashes[i] = input;
      yes = true;
	numberL += 1;
      Test += 1;
        console.log('CORRECT CODE');
      continue;
    }else {
    	if (Test < 1) {
    		yes = false;
        Test += 1;
        	console.log('WRONG CODE');
      }
    }
    console.log('test: ' + Test);
  }
  if (yes == true) {
  	correct += numberL;
	document.querySelector('#audioCorrect').play();
  }else {
  	wrong += 1;
    document.querySelector('#hangmanpicture').innerHTML = imageList[wrong];
	guessed.push(' '+ input + ' ');
	document.querySelector('#guessed').innerHTML = guessed;
	console.log('guessed letters: ' + guessed);
	document.querySelector('#audioWrong').play();
  }
  dashesString = dashes.join('');
  document.querySelector('#guesses').innerHTML = '<h1>' + dashesString + '</h1>';
  	console.log('dashes string: ' + dashesString);
    console.log('correct answers: ' + correct);
    console.log('wrong guesses: ' + wrong)
    document.querySelector('#guess').focus();
}

function checkWin() {
	if (correct === targetWordSplit.length) {
  	document.querySelector('#guessArea').style.display = 'none';
    document.querySelector('#congrats').style.display = 'block';
    document.querySelector('#congrats').innerHTML = '<h1 class="center">Congratulations!</h1>  <img id="restart" class="center" src="images/restartButton.png" onclick="restart()">';
	document.querySelector('#audioComplete').play();
  }else if (wrong === 11) {
	document.querySelector('#guessArea').style.display = 'none';
    document.querySelector('#congrats').style.display = 'block';
	document.querySelector('#congrats').innerHTML = '<h1 class="center">Too bad, You lose</h1>  <img id="restart" class="center" src="images/restartButton.png" onclick="restart()">';
    document.querySelector('#audioLose').play();
  }
}

function restart() {
	window.location.reload();
}


