var questionEl = document.querySelector('.question');
var answerEl = document.querySelector('.answers');
var btnNext = document.querySelector('.next');
var btnPrev = document.querySelector('.prev');
var btnStart = document.querySelector('.start');
var timerCount = 60;
var scoreCount=0;
var timerEl = document.querySelector('.timer');
var countEl = document.querySelector('.score')
var body = document.body;
var questionNumber = 0;
var setTime2;
var quiz = [
    {
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


//click
function next() {
    questionNumber++;
    if (questionNumber < quiz.length) {
        generateQuestion();
         countEl.textContent = scoreCount;} 
         else { clearInterval(setTime2)
            if(scoreCount > 2 ){
        
             answerEl.innerHTML= `<h1> your score is: ${scoreCount} out of 4 YOU PASSED!!!</h1>`;
            } else { answerEl.innerHTML=`<h1> your score is: ${scoreCount} out of 4 TRY AGAIN!!!</h1>`;
           btnStart.style.display = 'block';
        }
         }
}

//Function to make the timer work
function setTime() {
    if (timerCount > 0) { 
        btnStart.style.display = 'none';
        generateQuestion();
        var setTime2 = setInterval(function () {
            timerCount--;
            if (timerCount == 0 || questionNumber == 4) {
                clearInterval(setTime2)
            }
            timerEl.textContent = timerCount;
        }, 1000)
    }
};

btnStart.addEventListener('click', setTime)


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
countEl.textContent = scoreCount;
                    console.log('incorrect')
                    timerCount -= 10;
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
