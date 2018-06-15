const deck = document.getElementsByClassName('deck')[0]
const movesEl = document.getElementsByClassName('moves')[0]
let cards = ['<i class="fa fa-diamond"></i>','<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-diamond"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-cube"></i>']
let openCards = []
let matchedCards = []
let clicks = 0
let moves = 0


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

function incrementMoves() {
    clicks++

    if (clicks % 2 === 0) {
        moves++
        movesEl.innerHTML = moves
    }
}

function lockCard(el) {
    el.classList.add('match')
    matchedCards.push(el)
}

function resetCard(el) {
    el.classList.remove('show')
    el.classList.remove('open')
}

function showCard() {
    this.classList.add('show')
    this.classList.add('open')
    openCards.push(this)

    if (openCards.length === 2) {
        if (this.firstChild.className === openCards[0].firstChild.className) {
            lockCard(this)
            lockCard(openCards[0])
        } else {
            resetCard(this)
            resetCard(openCards[0])
        }
        openCards.length = 0
    }

    incrementMoves()

}

movesEl.innerHTML = moves
shuffle(cards)

for (card of cards) {
    let cardEl = document.createElement('LI')
    cardEl.classList.add('card')
    cardEl.innerHTML = card

    deck.appendChild(cardEl)

    cardEl.addEventListener('click', showCard)
}


/*
 * Set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
