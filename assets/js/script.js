var logo = [
  "css-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "js-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo",
  "css-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "js-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo"
]
var gameCards = document.getElementById('gameCards')
var firstCardClicked
var secondCardClicked
var firstCardClasses
var secondCardClasses
var maxMatches = 9
var maxAttempts = 20
var matches = 0
var attempts = 0
var gamesPlayed = 0
var gamesPlayedCount = document.getElementById('gamesPlayed')
var attemptsCount = document.getElementById('attempts')
var accuracy = document.getElementById('accuracy')
var modal = document.querySelector('.modal')
var modalTwo = document.querySelector('.modal-two')
var replay = document.getElementById('replay')
var replayTwo = document.getElementById('replay-two')
gameCards.addEventListener('click', handleClick);

startGame()


function startGame() {
  shuffle(logo)
  for(var i = 0; i < logo.length; i++) {
  var newDiv = document.createElement('div')
  newDiv.classList.add('background', 'col-2')
  gameCards.append(newDiv)
  var newDiv2 = document.createElement('div')
  newDiv.append(newDiv2)
  newDiv2.className = logo[i]
  newDiv2.classList.add('card-front')
  var newDiv3 = document.createElement('div')
  newDiv3.classList.add('card-back')
  newDiv.append(newDiv3)
  }
}

function shuffle(array) {
  var m = array.length;
  var t;
  var i;
  while(m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  } return array
}

var cardBack = document.querySelectorAll('.card-back')

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden')
  if(!firstCardClicked) {
    firstCardClicked = event.target
    firstCardClasses = firstCardClicked.previousElementSibling.className
  } else {
      secondCardClicked = event.target
      secondCardClasses = secondCardClicked.previousElementSibling.className
      gameCards.removeEventListener('click', handleClick)
      if (firstCardClasses === secondCardClasses) {
        gameCards.addEventListener('click', handleClick)
        firstCardClicked = null
        secondCardClicked = null
        matches++
        attempts++
        displayStats()
      } else {
        setTimeout(function () {
          firstCardClicked.classList.remove('hidden')
          secondCardClicked.classList.remove('hidden')
          gameCards.addEventListener('click', handleClick)
          firstCardClicked = null
          secondCardClicked = null
          attempts++
          displayStats()
        }, 1500)
      }
    }
    if(maxMatches === matches) {
      modal.classList.remove('hidden')
    }
    if(maxAttempts === attempts && maxMatches !== matches) {
      modalTwo.classList.remove('hidden')
      gameCards.removeEventListener('click', handleClick)
    }
}

function displayStats() {
  gamesPlayedCount.textContent = gamesPlayed
  attemptsCount.textContent = attempts
  accuracy.textContent = calculateAccuracy(attempts, matches)
}

function calculateAccuracy(attempts, matches) {
  if(!attempts) {
    return '0%'
  } else{
  return Math.trunc((matches / attempts) *100) + "%"
  }
}

function resetGame() {
  matches = 0
  attempts = 0
  gamesPlayed++
  displayStats()
  resetCard()
  removeChildren()
  startGame()
  modal.classList.add('hidden')
  modalTwo.classList.add('hidden')
  gameCards.addEventListener('click', handleClick)
}

function removeChildren() {
  while(gameCards.firstChild) {
    gameCards.removeChild(gameCards.firstChild)
  }
}

function resetCard() {
  for(var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.remove('hidden')
  }
}

replay.addEventListener('click', resetGame)
replayTwo.addEventListener('click', resetGame)
