var questionEl = document.querySelector('.question');
var answerEl = document.querySelector('.answers');
var btnStart = document.querySelector('.start');
var controlsContainer = document.querySelector('.control')
var playerInput = document.querySelector('#player')
var timerEl = document.querySelector('.timer');
var countEl = document.querySelector('.score')
var body = document.body;
var questionNumber = 0;
var timerCount = 60;
var scoreCount = 0;
var setTime2;
var playerName;
var playersList = [];
var storedList = JSON.parse(localStorage.getItem('playerList'));
console.log(storedList)
if (Array.isArray(storedList)) {
    playersList = storedList;
    playersList.sort(function (a, b) {
        return b.score - a.score;
    });
    playersList.forEach(createRanking);
}

var quiz = [{
        question: "Wich one of this is an html tag?",
        answers: ["<p>", "<hello>", "<bye>", "<create>"],
        correct: 0
    },
    {
        question: "Coding language used in M.E.R.N ?",
        answers: ["Java", "Javascript", "Phyton", "PHP"],
        correct: 1
    },
    {
        question: "all arrays start on the index?",
        answers: ["3", "-1", "0", "first"],
        correct: 2
    },
    {
        question: "coding language used to style your websites?",
        answers: ["javascript", "css", "html", "none"],
        correct: 1
    }
];

function gameOver() {
    timerCount = 0;
    if (scoreCount > 2) {

        answerEl.innerHTML = `<h1> your score is: ${scoreCount} out of 4 YOU PASSED!!!</h1>`;
    } else {
        answerEl.innerHTML = `<h1> your score is: ${scoreCount} out of 4 TRY AGAIN!!!</h1>`;


    }
    controlsContainer.style.display = 'block';
}
//click
function next() {
    questionNumber++;
    if (questionNumber < quiz.length) {
        generateQuestion();
        countEl.textContent = scoreCount;
    } else {
        gameOver();

    }
}

//Function to make the timer work
function setTime() {
    if (timerCount > 0) {
        generateQuestion();
        var setTime2 = setInterval(function () {
            timerCount--;
            if (timerCount < 0 || questionNumber >= 4) {

                clearInterval(setTime2);
                gameOver();
                var storedPlayer = {};
                storedPlayer.player = playerName;
                storedPlayer.score = scoreCount;
                playersList.push(storedPlayer);
                localStorage.setItem(`playerList`, JSON.stringify(playersList));
                //calling the createRanking with the last player

                document.querySelector('.players').textContent = "";
                playersList.sort(function (a, b) {
                    return b.score - a.score;
                });
                playersList.forEach(createRanking);

            }
            timerEl.textContent = timerCount

        }, 1000)
    }

};

//list my ranking
function createRanking(answer) {
    var playerLi = answer.player;
    var scoreLi = answer.score;
    var player = document.createElement('li');
    player.innerHTML = `${playerLi}: ${scoreLi}`;
    document.querySelector('.players').appendChild(player);
}


//function for the start button it set everything to default; 
function startQuiz() {
    if (playerInput.value) {
        timerCount = 60;
        scoreCount = 0;
        questionNumber = 0;
        playerName = playerInput.value
        playerInput.value = "";
        controlsContainer.style.display = 'none';
        setTime();

    } else {
        alert('You need a name to start playing')
    }
}
//eventListener for the start button 
btnStart.addEventListener('click', startQuiz)


//generate the question and its answers
function generateQuestion() {
    questionEl.textContent = quiz[questionNumber].question;
    answerEl.innerHTML = "";
    //forEach to display the questions and give them data-index
    quiz[questionNumber].answers.forEach((answer) => {
        var answerTest = document.createElement("button");
        answerTest.setAttribute('data-index', quiz[questionNumber].answers.indexOf(answer));
        answerTest.setAttribute('class', 'btn btn-primary col-5 ')
        answerTest.addEventListener('click', function (e) {
            e.preventDefault();
            var target1 = e.target;
            console.log(questionEl)
            if (target1.matches('button')) {

                if (e.target.getAttribute('data-index') == quiz[questionNumber].correct) {
                    console.log('correct')
                    scoreCount++;
                    countEl.textContent = scoreCount;
                    answerTest.classList.add('correct');
                    setTimeout(next, 500)

                } else {
                    timerCount -= 10;
                    countEl.textContent = scoreCount;
                    console.log('incorrect');
                    answerTest.classList.add('incorrect');
                    setTimeout(next, 500)




                }

            }

        });
        answerTest.textContent = answer;
        answerEl.appendChild(answerTest)
        console.log(answerTest)
    })
}