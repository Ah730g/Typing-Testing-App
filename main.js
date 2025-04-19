let words = [
    "Door",
    "International"
    // "Window",
    // "Table",
    // "Disk",
    // "Chair",
    // "Donkey"
];
let levelObj = {
    "Easy" : 5,
    "Medium" : 3,
    "Hard" : 2
};
//Important Elements
let radios = document.querySelectorAll(".choosing-level input[type='radio']"); 
let levelNameElement = document.querySelector(".message .level");
let levelTimeElement = document.querySelector(".message .tries");
let leftOverTime = document.querySelector(".time span");
let totalScore = document.querySelector(".total");
let startButton = document.querySelector(".start");
let input = document.querySelector("input[type='text']");
let upcomingWords = document.querySelector(".testing-words");
let theChoosingWord = document.querySelector(".the-word");
let finishGame = document.querySelector(".finish");
let gotScore = document.querySelector(".correct-words");
let choosingLevel = document.querySelector(".choosing-level");

let levelName  = "";
let levelTime = 0;
function setDefultDynamicData() {
    levelTime = levelObj[levelName];
    levelNameElement.innerHTML = levelName;
    levelTimeElement.innerHTML = levelTime;
    leftOverTime.innerHTML = levelTime;
}
function chooseTheLevel() {
    radios.forEach(radio => {
        radio.addEventListener("change",e=> {
            levelName = radio.dataset.level;
            setDefultDynamicData();
        });
    });
    
};
function setDefaultData() {
    document.querySelector("#easy").checked = true;
    levelName = "Easy";
    setDefultDynamicData();
    totalScore.innerHTML = words.length;
}
startButton.onclick = function() {
    this.remove();
    input.focus();
    createWords();
    enableTheSelectionBox();
}
function enableTheSelectionBox() {
    choosingLevel.classList.add("enabled");
}
input.onpaste = function() {
    return false;
}
function increasingTime() {
    leftOverTime.innerHTML = levelTime;
    let timeInterval = setInterval(function() {
        leftOverTime.innerHTML--;
        if(leftOverTime.innerHTML == 0)
        {
            gotScore.innerHTML++;
            clearInterval(timeInterval);
            if(words.length > 0)
            {
                if(input.value.toLowerCase() === theChoosingWord.innerHTML.toLowerCase())
                {
                    createWords();
                }
                else
                {
                    finishTheGame("bad");
                }
            }
            else 
            {
                finishTheGame("good");
            }
        }
    },1000)
}
function createWords() {
    input.value = "";
    let theWord = words[Math.floor(Math.random() * words.length)];
    let theWordIndex = words.indexOf(theWord);
    words.splice(theWordIndex,1);
    upcomingWords.innerHTML = "";
    theChoosingWord.innerHTML = theWord;
    for(let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        div.textContent = words[i];
        upcomingWords.appendChild(div);
    };
    increasingTime();
}
function finishTheGame(PlayingLevel)
{
    let div = document.createElement("div");
    div.className = PlayingLevel;
    let divText = document.createTextNode("Game Over");
    div.appendChild(divText);
    finishGame.appendChild(div);
    input.remove();
    upcomingWords.remove();
    theChoosingWord.remove();
}
setDefaultData();
chooseTheLevel();
