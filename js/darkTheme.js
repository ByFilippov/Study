// Dark Theme
var darkLink = document.getElementById('dark__link'); //dark theme css

if (localStorage.length > 0){
    var numLocal = Number(localStorage.getItem("numberOfToggle"));
    if (numLocal == 1){
        darkLink.href = 'css/dark.css';
        switchToggleDirect(0);
        setThemeHeader(0);
    } else {
        setThemeHeader(1);
    }
} else {
    localStorage.setItem("numberOfToggle", 0); //create 0
}
numLocal = Number(localStorage.getItem("numberOfToggle")); //local > int

function darkTheme() {
    if (numLocal == 0) {
        localStorage.setItem("numberOfToggle", 1);
        numLocal = 1;
    } else if (numLocal == 1) {
        localStorage.setItem("numberOfToggle", 0)
        numLocal = 0;
    }
    // localStorage.clear;
    // localStorage

    if (numLocal % 2 != 0){
        darkLink.href = 'css/dark.css';
        setThemeHeader(0);
    } else {
        darkLink.href = ' ';
        setThemeHeader(1);
    }
}

function switchToggleDirect(code){ 
    let toggleBlock = document.getElementById('dark__toggle__block');
    if (code == 0){ 
        toggleBlock.setAttribute('class', 'local__block');
    }
}

function setThemeHeader(code){
    let themeHeader = document.getElementById('theme__header');
    if (code == 0){
        themeHeader.innerHTML = 'Dark Theme Set!';
    } else {
        themeHeader.innerHTML = 'Dark Theme!';
    }
}