const container = document.querySelector("#container");
const startBtn = document.querySelector("#start");
const score = document.querySelector("#score");
const errorMsg = document.querySelector("#errormsg");
const countDownDisplay = document.querySelector("#countdown");
const picArea = document.querySelectorAll(".picarea");
const hole = document.querySelectorAll(".hole");
const highscoretext = document.getElementById("highscoretext");
const highnametext = document.getElementById("highnametext");
let count = 0;
let init = 30;
let n = 0;
let iter = 0;
let highscore = {name:"", score: 0};
let highscorestorage = JSON.parse(window.localStorage.getItem("highscore"));

if(highscorestorage !== null) {
    highscore = highscorestorage;
    highnametext.innerText = highscore.name;
    highscoretext.innerText = highscore.score;
}

function randomSelect() {
    let mole = setInterval( () => {
        
        for(let element of picArea) {
            element.classList.remove(`ratpic`);
            element.classList.remove(`moleGotHit`);
        }
        
        let randSel = Math.floor(Math.random() * 9);
        picArea[randSel].classList.add(`ratpic`);
        n++;
        if(n === 31) {
            clearInterval(mole);
            for(let element of picArea) {
            element.classList.remove(`ratpic`);
            element.classList.remove(`moleGotHit`);
            }
        }
    }, 1000);
}

function countHit() {
    for(let element of picArea) {
        element.onclick = function () {
            if(element.classList.contains(`ratpic`)) {
                count++;
                sum = count;
                score.textContent = `目前分數為${sum}分`;
                element.classList.replace(`ratpic`, `moleGotHit`);
            }
        }
    }
    count = 0;
    let countDown = setInterval( () => {
        countDownDisplay.textContent = `還剩下 ${init--} 秒`;
        if(init === -1) {
            clearInterval(countDown);
            countDownDisplay.textContent = `時間到!`;
            init = 30;
            if(highscorestorage = null || (highscore.score < count)){
	            let playername = prompt("最高分!，請輸入你的名字");
	            highscore.name = playername;
	            highscore.score = count;
	            window.localStorage.setItem("highscore", JSON.stringify(highscore));
	            highnametext.innerText = highscore.name;
	            highscoretext.innerText = highscore.score;
	        }
        }
    },1000);
}
        
// 開始遊戲
startBtn.onclick = function () {
    score.textContent = `目前分數為0分`;
    randomSelect();
    countHit();
}