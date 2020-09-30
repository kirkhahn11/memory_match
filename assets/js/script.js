var logo = [
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
var matches = 0
var attempts = 0
var gamesPlayed = 0
var gamesPlayedCount = document.getElementById('gamesPlayed')
var attemptsCount = document.getElementById('attempts')
var accuracy = document.getElementById('accuracy')
var modal = document.querySelector('.modal')
var replay = document.getElementById('replay')
gameCards.addEventListener('click', handleClick);

startGame()
startGame()

function startGame() {
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
  modal.classList.add('hidden')
}

function resetCard() {
  for(var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.remove('hidden')
  }
}

replay.addEventListener('click', resetGame)
