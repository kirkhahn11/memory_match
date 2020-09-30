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
gameCards.addEventListener('click', handleClick);


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
  return Math.trunc((matches / attempts) *100) + "%"
}
