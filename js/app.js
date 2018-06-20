const deck = document.getElementsByClassName('deck')[0]
const movesEl = document.getElementsByClassName('moves')[0]
const stars = document.getElementsByClassName('stars')[0].children.length
const restart = document.getElementsByClassName('restart')[0]
const success = document.getElementsByClassName('success')[0]
const movesSuccess = document.getElementsByClassName('success__moves')[0]
const starsSuccess = document.getElementsByClassName('success__stars')[0]
const resetSuccess = document.getElementsByClassName('success__reset')[0]
let cards = ['<i class="fa fa-diamond"></i>','<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-diamond"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-cube"></i>']
let openCards = []
let matchedCards = []
let clicks = 0
let moves = 0
console.log(stars)

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

function appendCards() {
    for (card of cards) {
        let cardEl = document.createElement('LI')
        cardEl.classList.add('card')
        cardEl.innerHTML = card
    
        deck.appendChild(cardEl)
    
        cardEl.addEventListener('click', showCard)
    }
    
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
    el.classList.add('error')
    setTimeout(function() {
        el.classList.remove('error')
    }, 1000)
}

function restartGame() {
    matchedCards.length = 0
    clicks = 0
    moves = 0
    movesEl.innerHTML = moves  

    deck.innerHTML = ''
    shuffle(cards)
    appendCards()
}

function showSuccess() {
    movesSuccess.innerHTML = moves
    starsSuccess.innerHTML = stars
    success.classList.remove('is-hidden')
    success.classList.add('is-flex-visible')

    resetSuccess.addEventListener('click', function() {
        restartGame()
        success.classList.remove('is-flex-visible')
        success.classList.add('is-hidden')
    })
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

    if (matchedCards.length === 16) {
        setTimeout(function() {
            showSuccess()
        }, 1000)
    }
}

movesEl.innerHTML = moves
restart.addEventListener('click', restartGame)

shuffle(cards)
appendCards()
