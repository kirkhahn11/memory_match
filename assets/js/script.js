var logo = [
  "drink-water",
  "exercise",
  "date",
  "talking-to-friends",
  "listen-to-music",
  "being-creative",
  "enjoy-the-world",
  "puppies",
  "being-weird",
  "drink-water",
  "exercise",
  "date",
  "talking-to-friends",
  "listen-to-music",
  "being-creative",
  "enjoy-the-world",
  "puppies",
  "being-weird"
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
var image = document.getElementById('image')
var container = document.querySelector('.container')
var attemptsCount = document.getElementById('attempts')
var accuracy = document.getElementById('accuracy')
var modal = document.querySelector('.modal')
var modalTwo = document.querySelector('.modal-two')
var replay = document.getElementById('replay')
var replayTwo = document.getElementById('replay-two')
var startButton = document.getElementById('start-game')
var introText = document.getElementById('text-read')
var intro = document.querySelector('.intro')
gameCards.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame)


var myText = 'This is Happy! (click here to continue)'
var myArray = myText.split('')
var loopTimer
function frameLooper() {
  if (myArray.length > 0) {
    introText.textContent += myArray.shift();
  } else {
    clearTimeout(loopTimer);
    return false;
  }
  loopTimer = setTimeout('frameLooper()', 70);
  }
frameLooper()

introText.addEventListener('click', function() {
  if (introText.textContent === 'This is Happy! (click here to continue)') {
    image.classList.add('hidden')
    introText.classList.add('hidden')
    document.body.style.backgroundColor = 'black'
    var newHeader = document.createElement('header')
    var newText = document.createTextNode('ESCAPE THE DREAD')
    newHeader.appendChild(newText)
    newHeader.style.color = 'white'
    newHeader.style.fontSize = '200px'
    newHeader.style.textAlign = 'center'
    document.body.append(newHeader)
    setTimeout(function(){
      image.classList.remove('hidden')
      introText.classList.remove('hidden')
      document.body.style.backgroundColor = 'white'
      document.body.removeChild(newHeader)
    }, 500)
    introText.textContent = ''
    myText = 'Happy knows what he needs to do to be happy! (Click again)'
    myArray = myText.split('')
    frameLooper()
  } else if (introText.textContent === 'Happy knows what he needs to do to be happy! (Click again)' ){
    image.classList.add('hidden')
    introText.classList.add('hidden')
    document.body.style.backgroundColor = 'black'
    newHeader = document.createElement('header')
    newText = document.createTextNode('ESCAPE THE DREAD!!!!')
    newHeader.appendChild(newText)
    newHeader.style.color = 'white'
    newHeader.style.fontSize = '200px'
    newHeader.style.textAlign = 'center'
    document.body.append(newHeader)
    setTimeout(function () {
      image.classList.remove('hidden')
      introText.classList.remove('hidden')
      document.body.style.backgroundColor = 'white'
      document.body.removeChild(newHeader)
    }, 500)
    introText.textContent = ''
    myText = 'Will you help Happy get through his day?'
    myArray = myText.split('')
    frameLooper()
    setTimeout(function() {
    startButton.classList.remove('hidden')
    }, 3000)
  }
})

function startGame() {
  container.classList.remove('hidden')
  intro.classList.add('hidden')
  image.classList.add('hidden')
  document.body.style.backgroundColor = 'cyan'
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
        }, 1000)
      }
  } if (maxMatches === matches) {
    modal.classList.remove('hidden')
  }
}

gameCards.addEventListener('mousedown', gameAdapt)

function gameAdapt(){
  if (maxAttempts === attempts && maxMatches !== matches) {
    modalTwo.classList.remove('hidden')
    gameCards.removeEventListener('click', handleClick)
  }
  if (attempts >= 4) {
    changes()
  }
  if (attempts >= 8) {
    changesTwo()
  }
  if (attempts >= 12) {
    changesThree()
  }
  if (attempts >= 16) {
    changesFour()
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

function changes() {
  var cardBack = document.querySelectorAll('.card-back')
  var stats = document.querySelectorAll('.stats')
  document.body.style.backgroundColor = '#01F0F0'
  for(var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.add('card-back-two')
    cardBack[i].classList.remove('card-back')
  }
  for (var x = 0; x < stats.length; x++) {
    stats[x].style.backgroundColor = '#FF69B4'
  }
}

function changesTwo() {
  var cardBack = document.querySelectorAll('.card-back-two')
  var stats = document.querySelectorAll('.stats')
  document.body.style.backgroundColor = '#009797'
  for (var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.add('card-back-three')
    cardBack[i].classList.remove('card-back-two')
  }
  for (var x = 0; x < stats.length; x++) {
    stats[x].style.backgroundColor = '#A000A0'
  }
}

function changesThree() {
  var cardBack = document.querySelectorAll('.card-back-three')
  var stats = document.querySelectorAll('.stats')
  document.body.style.backgroundColor = '#025252'
  for (var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.add('card-back-four')
    cardBack[i].classList.remove('card-back-three')
  }
  for (var x = 0; x < stats.length; x++) {
    stats[x].style.backgroundColor = '#660166'
  }
}

function changesFour() {
  var cardBack = document.querySelectorAll('.card-back-four')
  var stats = document.querySelectorAll('.stats')
  document.body.style.backgroundColor = '#002020'
  for (var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.add('card-back-five')
    cardBack[i].classList.remove('card-back-four')
  }
  for (var x = 0; x < stats.length; x++) {
    stats[x].style.backgroundColor = '#2B002B'
  }
}

function resetGame() {
  var stats = document.querySelectorAll('.stats')
  document.body.style.backgroundColor = '#00FFFF'
  for (var x = 0; x < stats.length; x++) {
    stats[x].style.backgroundColor = '#FF00FF'
  }
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
  while (gameCards.firstChild) {
    gameCards.removeChild(gameCards.firstChild)
  }
}

function resetCard() {
  var cardBack = document.querySelectorAll('.card-back')
  for (var i = 0; i < cardBack.length; i++) {
    cardBack[i].classList.remove('hidden')
  }
}

replay.addEventListener('click', resetGame)
replayTwo.addEventListener('click', resetGame)
