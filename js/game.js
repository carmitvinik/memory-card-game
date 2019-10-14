// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 3;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioRight = new Audio('sound/right.mp3');
var audioWrong = new Audio('sound/wrong.mp3');

// This function is called whenever the user click a card
function cardClicked(elCard) {

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');
        // disable click more cards
		cardsClickDisable();
        // No match, schedule to flip them back in 1 second
        if (card1 !== card2){
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                cardsClickEnable();
            }, 1000)
			audioWrong.play();
        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;
            audioRight.play();
            cardsClickEnable();

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
               	document.getElementById("replayBtn").classList.remove("hideEl");
                
            }

        }

    }


}



function hideEl(elID) {
	document.getElementById(elID).classList.add("hideEl");
}

function resetGame(){
	//reset vars
	elPreviousCard = null;
	flippedCouplesCount = 0;
	//reset cards elem
	var flippedCards = document.getElementsByClassName("flipped").length;
	for (i=0;i<flippedCards;i++){
			document.getElementsByClassName("flipped")[0].classList.remove("flipped");
	}
	//reset btn elem disapear btn replay
	hideEl("replayBtn");
	
}

function cardsClickDisable(){
	var cards = document.getElementsByClassName("card");
	for (i=0;i<cards.length;i++){
		cards[i].removeAttribute("onclick");
	}
	
}

function cardsClickEnable(){
	var cards = document.getElementsByClassName("card");
	for (i=0;i<cards.length;i++){
		cards[i].setAttribute("onclick","cardClicked(this)");

	}
}
