

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
    button.href = "#";
    button.setAttribute('onclick', 'rpsReset()')
    button.innerHTML = "Reset";

    humanDiv.innerHTML = "<img onclick='rpsReset()' src='" + imgData[humanImageChoise] + "' height='150' width='150' style='outline: 3px solid #61e25d; box-shadow: 0px 0px 18px 0px rgba(111, 187, 75, 0.56)'>";
    document.getElementById('result__block').appendChild(humanDiv);

    messageDiv.innerHTML = "<h1 style='color:" + message.color + "; padding-top: 10px;'>" + message.message + "</h1>";
    document.getElementById('result__block').appendChild(messageDiv);
    document.getElementById('rock__text').appendChild(button)

    botDiv.innerHTML = "<img onclick='rpsReset()' src='" + imgData[computerImageChoise] + "' height='150' width='150' style='outline: 2px solid rgb(175, 41, 135); box-shadow: 0px 0px 18px 0px rgba(112, 62, 119, 0.56);'>"; 
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