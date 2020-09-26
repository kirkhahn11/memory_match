var gameCards = document.getElementById('gameCards')
console.log(gameCards)
gameCards.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var hidden = event.target
  hidden.className = "hidden"
}
