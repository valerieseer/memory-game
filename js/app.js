
(function() {
    const deck = document.getElementsByClassName('deck')[0]
    const movesText = document.getElementsByClassName('moves')[0]
    const stars = document.getElementsByClassName('stars')[0].children
    const timerText = document.getElementsByClassName('timer')[0]
    const timerStart = document.getElementsByClassName('timer__start')[0]
    const restart = document.getElementsByClassName('restart')[0]
    const success = document.getElementsByClassName('success')[0]
    const timeSuccess = document.getElementsByClassName('success__time')[0]
    const starsSuccess = document.getElementsByClassName('success__stars')[0]
    const resetSuccess = document.getElementsByClassName('success__reset')[0]
    let cards = ['<i class="fa fa-diamond"></i>','<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-diamond"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-cube"></i>']
    let openCards = []
    let matchedCards = []
    let clicks = 0
    let moves = 0
    let starsAmt = 3
    let seconds = 0
    let minutes = 0
    let hours = 0
    let t

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

    // Stop watch function from https://codepad.co/snippet/YMYUDYgr    
    function startTimer() {
        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0
                minutes++
                if (minutes >= 60) {
                    minutes = 0
                    hours++
                }
            }
            
            timerText.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds)

            timer()
        }

        function timer() {
            t = setTimeout(add, 1000)
        }

        timer()
    }

    function incrementMoves() {
        clicks++

        if (clicks % 2 === 0) {
            moves++
            movesText.innerHTML = moves
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
        //Reset matching logic
        openCards.length = 0
        matchedCards.length = 0
        clicks = 0
        moves = 0

        // Reset timer
        clearTimeout(t)
        seconds = 0
        minutes = 0
        hours = 0
        timerText.textContent = '0:00:00'
        movesText.innerHTML = moves  

        // Reset stars
        for (star of stars) {
            star.children[0].className = 'fa fa-star'
        }

        // Reappend cards
        deck.innerHTML = ''
        shuffle(cards)
        appendCards()
    }

    function showSuccess() {
        timeSuccess.innerHTML = timerText.textContent
        starsSuccess.innerHTML = starsAmt
        success.classList.remove('is-hidden')
        success.classList.add('is-flex-visible')

        resetSuccess.addEventListener('click', function() {
            restartGame()
            success.classList.remove('is-flex-visible')
            success.classList.add('is-hidden')
        })
    }

    function showCard() {
        incrementMoves()

        this.classList.add('show')
        this.classList.add('open')
        openCards.push(this)

        // Match test     
        if (openCards.length === 2) {
            if (this.firstChild.className === openCards[0].firstChild.className) {
                lockCard(this)
                lockCard(openCards[0])
            } else {
                resetCard(this)
                resetCard(openCards[0])
            }
            // Reset openCards arr for next move
            openCards.length = 0
        }

        // Remove a star every multiple of 10 and decrement starAmt   
        if (moves === 10) {
            stars[2].children[0].className = 'fa fa-star-o'
            starsAmt = 2
        } else if (moves === 20) {
            stars[1].children[0].className = 'fa fa-star-o'
            starsAmt = 1
        } else if (moves === 30) {
            stars[0].children[0].className = 'fa fa-star-o'
            starsAmt = 0
        } 

        // If all cards are open and matched
        if (matchedCards.length === 16) {
            setTimeout(function() {
                showSuccess()
            }, 700)
        }
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

    movesText.innerHTML = moves

    timerStart.addEventListener('click', startTimer)
    restart.addEventListener('click', restartGame)

    shuffle(cards)
    appendCards()
})()
