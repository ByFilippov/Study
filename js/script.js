function darkThemeEnabled() {
    let darkThemeCss = document.querySelector('#dark__link').getAttribute('href');

    if (darkThemeCss == ' '){
        return false;
    } else {
        return true;
    }
}

//Age in Days
function yearsInDays(){
    var h2 = document.getElementById('your__days');
    var yourAge = prompt('How old are you?');
    if (yourAge.length == 0) {
        h2.innerHTML = '';
    }
     else if (yourAge >= 0 && yourAge < 1000000){
        var currentYear = 2020;
        var days = 0;
        for (i = 0; i < yourAge; i++){
            if ((currentYear - i) % 4 == 0) {
                days += 366;
            } else {
                days += 365;
            }
        }
        h2.innerHTML = 'You are ' + days + ' days old';
    } else {
        h2.innerHTML = 'Enter a positive integer < 1 million';
    }
}

function reset() {
    document.getElementById('your__days').innerHTML = '';
}


// Cats generating
function cat__gen(){
    var img = document.createElement('img');
    var div = document.getElementById('cat__hood');
    img.setAttribute('id', 'cat__image')
    img.src = "http://thecatapi.com/api/images/get?format-src&type=gif&size=small";
    div.appendChild(img);
}

function cat__cleaner() {
    var image = document.getElementById('cat__image');
    image.remove();
}


//Rock, paper, scissors
var imgData = {
    'rock': document.getElementById('rock').src,  // src
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
};

function rpsGame(yourChoise){
    var humanTurn, computerTurn;
    humanTurn = yourChoise.id;
    computerTurn = choiseNumber(randNum()).id;

    var win = decideWinner(humanTurn, computerTurn);
    let message = checkWin(win);

    upsFontEnd(humanTurn, computerTurn, message);
}

function randNum() {
    return Math.floor(Math.random() * 3);
}

function choiseNumber(number) {
    return [rock, paper, scissors][number];
}

function decideWinner(humanTurn, computerTurn) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };

    var humanPoints = rpsDatabase[humanTurn][computerTurn];
    var computerPoints = rpsDatabase[computerTurn][humanTurn];

    return [humanPoints, computerPoints];
}

function checkWin([humanPoints, computerPoints]) {
    if (humanPoints === 0){
        return {'message': 'You Lost!', 'color': '#d62d49'};
    } else if (humanPoints === 0.5){
        return {'message': 'You Tied!', 'color': '#dbbb39'};
    } else {
        return {'message': 'You Win!', 'color': '#39db6a'};
    }
}

function upsFontEnd(humanImageChoise, computerImageChoise, message) {

    document.getElementById('rock').remove(); // remove images
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var resultBlock = document.createElement('div');
    resultBlock.setAttribute('class', 'flex__box')
    resultBlock.id = "result__block";
    document.getElementById('block__flex').appendChild(resultBlock);

    var humanDiv = document.createElement('div'); //create DIV
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    messageDiv.setAttribute('id', 'rock__text'); // set ID to message div

    var button = document.createElement('a'); // button
    button.setAttribute('id', 'rock__button');
    button.setAttribute('class', 'button');
    button.setAttribute('onclick', 'rpsReset()')
    button.innerHTML = "Reset";

    humanDiv.innerHTML = "<img onclick='rpsReset()' src='" + imgData[humanImageChoise] + "' style='outline: 3px solid #61e25d; box-shadow: 0px 0px 18px 0px rgba(111, 187, 75, 0.56)'>";
    document.getElementById('result__block').appendChild(humanDiv);

    messageDiv.innerHTML = "<h1 style='color:" + message.color + "; padding-top: 10px;'>" + message.message + "</h1>";
    document.getElementById('result__block').appendChild(messageDiv);
    document.getElementById('rock__text').appendChild(button)

    botDiv.innerHTML = "<img id='computer__choise' onclick='rpsReset()' src='" + imgData[computerImageChoise] + "' style='outline: 2px solid rgb(175, 41, 135); box-shadow: 0px 0px 18px 0px rgba(112, 62, 119, 0.56);'>"; 
    document.getElementById('result__block').appendChild(botDiv);
}

function rpsReset(){
    document.getElementById('result__block').remove();

    let oldBlock = document.getElementById('block__flex');

    for (i = 0; i < 3; i++){
        var naming = ['rock', 'paper', 'scissors'];

        let newImgs = document.createElement('img');
        newImgs.alt = naming[i];
        newImgs.setAttribute('onclick', 'rpsGame(this)')
        newImgs.setAttribute('id', naming[i])
        newImgs.width = '150';
        newImgs.height = '150';
        newImgs.src = imgData[naming[i]];

        oldBlock.appendChild(newImgs);
    }
}

// color change
var buttonsDir = document.getElementById('buttons__block');
var buttons = buttonsDir.getElementsByTagName('a');

var copyButtonsClass = [];
for (let i = 0; i < buttons.length; i++){
    copyButtonsClass.push(buttons[i].classList[1]);
}

function buttonColorChange(buttonValue){ //butValue = red/green/...
    var colorMod = buttonValue.value;

    if (colorMod === 'red'){
        for(i = 0; i < buttons.length; i++){
            buttons[i].classList.remove(buttons[i].classList[1]);
            buttons[i].classList.add('red__button');
        }
    } else if (colorMod === 'green'){
        for(i = 0; i < buttons.length; i++){
            buttons[i].classList.remove(buttons[i].classList[1]);
            buttons[i].classList.add('green__button');
        }
    } else if (colorMod === 'reset'){
        for(i = 0; i < buttons.length; i++){
            buttons[i].classList.remove(buttons[i].classList[1]);
            buttons[i].classList.add(copyButtonsClass[i]);
        }
    } else if (colorMod === 'random'){
        for(i = 0; i < buttons.length; i++){
            var colorClasses = ['red__button', 'green__button', 'blue__button', 'yellow__button'];
            var randomNum = Math.floor(Math.random() * 4);
            var randomColor = colorClasses[randomNum];

            buttons[i].classList.remove(buttons[i].classList[1]);
            buttons[i].classList.add(randomColor);
        }
    }
}

/* Blackjack */
let blackjackGame = {
    'you': {'scoreSpan': '#your__blackjack__score', 'div': '#your__box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer__blackjack__score', 'div': '#dealer__box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3':3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0
}



const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');

winSound.volume = 0.5;
loseSound.volume = 0.2;

document.querySelector('#blackjack__hit__button').addEventListener('click', hitButton);
document.querySelector('#blackjack__deal__button').addEventListener('click', dealButton);
document.querySelector('#blackjack__stand__button').addEventListener('click', standButton);

function deactivDealButton() {
    document.querySelector('#blackjack__deal__button').classList.add('not__active__button');
    document.querySelector('#blackjack__deal__button').style.cursor = 'default';
}
deactivDealButton()

function deactiveStandButton() {
    document.querySelector('#blackjack__stand__button').classList.add('not__active__button');
    document.querySelector('#blackjack__stand__button').style.cursor = 'default';
}

function deactiveHitButton() {
    document.querySelector('#blackjack__hit__button').classList.add('not__active__button');
    document.querySelector('#blackjack__hit__button').style.cursor = 'default';
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

var standCursor = document.querySelector('#blackjack__stand__button').style.cursor; 
var standCount = 0;

function hitButton(){
    if (DEALER['score'] == 0){
        blackjackHit();
    }
}

function blackjackHit() {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);

    // if (standCursor == 'default'){
    //     document.querySelector('#blackjack__stand__button').classList.remove('not__active__button');
    //     document.querySelector('#blackjack__stand__button').style.cursor = 'pointer';
    // }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21){
        let cardBlock = document.createElement('div');
        cardBlock.setAttribute('class', 'card__block');

        let cardImage = document.createElement('img');
        cardImage.src = `img/blackjack/${card}.jpg`;

        document.querySelector(activePlayer['div']).appendChild(cardBlock).appendChild(cardImage);
        hitSound.play();
    }
}

function standButton() {
    // if (YOU['score'] > 0) {
        standCount += 1;
        if (standCount == 1){
            dealerLogic();
            deactiveStandButton();
            deactiveHitButton();
        }
    // }
}

async function dealerLogic(){
    while (DEALER['score'] <= 15){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(500);
    }

    document.querySelector('#blackjack__deal__button').classList.remove('not__active__button');
    document.querySelector('#blackjack__deal__button').style.cursor = 'pointer';

    blackMessageOutput(blackCheckWin());     
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function dealButton() {
    var blackjackStatus = document.querySelector('#blackjack__status').textContent;
    
    if (blackjackStatus != "Let's play!") {
        blackjackRemove();
        deactivDealButton()
        standCount = 0;

        document.querySelector('#blackjack__stand__button').classList.remove('not__active__button');
        document.querySelector('#blackjack__stand__button').style.cursor = 'pointer';

        document.querySelector('#blackjack__hit__button').classList.remove('not__active__button');
        document.querySelector('#blackjack__hit__button').style.cursor = 'pointer';
    }
}

function blackjackRemove() {
    let yourImages = document.querySelector('#your__box').querySelectorAll('div');
    let dealerImages = document.querySelector('#dealer__box').querySelectorAll('div');


    if (yourImages.length > 0){
        for (i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
    }
    if (dealerImages.length > 0) {
        for (i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your__blackjack__score').textContent = 0;
    document.querySelector('#dealer__blackjack__score').textContent = 0;

    document.querySelector('#your__blackjack__score').style.color = '#fff';
    document.querySelector('#dealer__blackjack__score').style.color = '#fff';

    document.querySelector('#blackjack__status').textContent = "Let's play!";

    if (darkThemeEnabled()){
        document.querySelector('#blackjack__status').style.color = '#fefefe';
    } else {
        document.querySelector('#blackjack__status').style.color = '#232236';
    }

}

function updateScore(card, activePlayer) {
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] <= 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
} 

function blackCheckWin() {
    let winner;
    if (YOU['score'] <= 21) {
        if ((YOU['score'] < DEALER['score'] || YOU['score'] > 21) && DEALER['score'] <= 21) {
            winner = DEALER;
        } else if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = YOU;
        } else if (YOU['score'] == DEALER['score']) {
            winner = 'no one!';
        }
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        winner = 'no one!';
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
    }
    return winner;
}

function blackMessageOutput(winner) {
    console.log('Winner', winner);
    let message, messageColor;
    let messageSpot = document.querySelector('#blackjack__status');

    if (winner === DEALER) {
        message = 'You Lose!';
        messageColor = '#d62d49';
        loseSound.play();

        blackjackGame['losses']++;
    } else if (winner === YOU) {
        message = 'You Win!';
        messageColor = '#36da5a';
        winSound.play();

        blackjackGame['wins']++;
    } else {
        message = 'You Drew!';
        blackjackGame['draws']++;
    }

    if (winner === DEALER || winner === YOU) {
        messageSpot.textContent = message;
        document.querySelector('#blackjack__status').style.color = messageColor;
    } else {
        messageSpot.textContent = message;
    }

    document.querySelector('#blackjack__wins').textContent = blackjackGame['wins'];
    document.querySelector('#blackjack__losses').textContent = blackjackGame['losses'];
    document.querySelector('#blackjack__draws').textContent = blackjackGame['draws'];
}

// function activeButtons() {
//     let hitButton = document.querySelector('#blackjack__hit__button');
//     let standButton = document.querySelector('#blackjack__stand__button');
//     let dealButton = document.querySelector('#blackjack__deal__button');


//     if (YOU['score'] == 0){
//         standButton.classList.add('not__active__button');
//         dealButton.classList.add('not__active__button');
//     } else {
//         standButton.classList.remove('not__active__button');
//         dealButton.classList.remove('not__active__button');
//     }
// }