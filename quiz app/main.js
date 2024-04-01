//adding 10 questions
const questions = [
    {
        question: "In what country was Elon Musk born?",
        answers: [
            {text: "A) Pretoria, South Africa" , correct: true},
            {text: "B) New York, America" , correct: false},
            {text: "C) Canbera, Australia" , correct: false},
            {text: "D) London, United Kingdom" , correct: false},
        ]
    },
    {
        question: "What is a group of crows called?",
        answers: [
            {text: "A) A horde" , correct: false},
            {text: "B) A murder" , correct: false},
            {text: "C) Both A & B" , correct: true},
            {text: "D) none" , correct: false},
        ]
    },
    {
        question: "Compared to their body weight, what animal is the strongest?",
        answers: [
            {text: "A) Elephant" , correct:false},
            {text: "B) Dung Beetle" , correct:true},
            {text: "C) Rhenocerous" , correct:false},
            {text: "D) Cow" , correct:false},
        ]
    },
    {
        question: "What is the capital of Ireland?",
        answers: [
            {text: "A) Ottawa" , correct:false},
            {text: "B) Dublin" , correct:true},
            {text: "C) Birmingham" , correct:false},
            {text: "D) Durban" , correct:false},
        ]
    },
    {
        question: "On what continent would you find the city of Baku?",
        answers: [
            {text: "A) Africa" , correct:false},
            {text: "B) Oceania" , correct:false},
            {text: "C) Europe" , correct:false},
            {text: "D) Asia" , correct:true},
        ]
    },
    {
        question: "Where did sushi originate?",
        answers: [
            {text:"A) Japan" , correct:false},
            {text:"B) China" , correct:true},
            {text:"C) Nepal" , correct:false},
            {text:"D) South Korea" , correct:false},
        ]
    },
    {
        question: "What sporting event has a strict dress code of all-white?",
        answers: [
            {text:"A) Wimbledon" , correct:true},
            {text:"B) Cricket" , correct:false},
            {text:"C) Basketball" , correct:false},
            {text:"D) Football" , correct:false},
        ]
    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            {text:"A) 8" , correct:false},
            {text:"B) 3" , correct:true},
            {text:"C) 5" , correct:false},
            {text:"D) 1" , correct:false},
        ]
    },
    {
        question: "What country has the most islands?",
        answers: [
            {text:"A) Finland" , correct:false},
            {text:"B) Indonesia" , correct:false},
            {text:"C) Sweden" , correct:true},
            {text:"D) Iceland" , correct:false},
        ]
    },
    {
        question: "Which planet has the most moons?",
        answers: [
            {text:"A) Uranus" , correct:false},
            {text:"B) Jupiter" , correct:false},
            {text:"C) Neptune" , correct:false},
            {text:"D) Saturn" , correct:true},
        ]
    }
];

//accessing the divs through their id's
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("ans-button");
const nextBtn = document.getElementById("next");


//current question and score
let currQuestionIdx = 0;
let score = 0;

function StartSession(){
    currQuestionIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

// show next question
function showQuestion(){
    rebootState();
    let currQuestion = questions [currQuestionIdx];
    let questionNo = currQuestionIdx + 1;
    questionElement.innerHTML = questionNo + "." + currQuestion.question;

    // buttons for each answer
    currQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer); 
        answerElement.appendChild(button);  
    });
}

function rebootState () {
    nextBtn.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function nextnextbutton (){
    currQuestionIdx++;
    if(currQuestionIdx < questions.length){
        showQuestion();
    }
}

function showScoreGuide(score) {
    let scoreGuideText = "";
    if (score < 4) {
        scoreGuideText = "Lot of Improvement required";
    } else if (score >= 4 && score <= 6) {
        scoreGuideText = "Average";
    } else if (score > 6 && score <= 8) {
        scoreGuideText = "Better Luck Next Time";
    } else {
        scoreGuideText = "Excellent";
    }
    document.getElementById("score-guide-text").textContent = scoreGuideText;
    document.getElementById("score-guide").style.display = "block";
}



function showScore() {
    rebootState ();
    questionElement.innerHTML = `Finished! Your Score is ${score} out of ${questions.length}!`;
    answerElement.innerHTML = ``;
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "none";
    showScoreGuide(score);
}

// add event listener to next button
nextBtn.addEventListener("click" , () => {
    if(currQuestionIdx < questions.length){
        nextnextbutton();
    } else {
        showScore ();
    }
}); 

//start quiz
StartSession();


