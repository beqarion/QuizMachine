const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionCounterText = document.getElementById("questionCounter");
let scoreText = document.getElementById("score");
let loader = document.getElementById("loader");
let innerContainer = document.getElementById("inner-cont");
let questions = [];
let apiUrl = localStorage.getItem("apiUrl");
fetch(apiUrl).then( response => {
	console.log(response);
	return response.json();
}).	then ( response => {
	console.log(response.results);
	questions = response.results.map( quesObj => {
		const formatedObj = {
			//REPLACING &039; with ' and &quot; with "
			question: quesObj.question.replace(/\&\S*?\;/gm, replacer) 
			//answer = randomNum
		}
		const answers = [...quesObj.incorrect_answers];
		formatedObj.answer = Math.floor(Math.random() * 3 + 1);
		answers.splice(formatedObj.answer - 1, 0, quesObj.correct_answer);

		answers.forEach( (choice, index) => {
			formatedObj["choice" + (index + 1)] = choice;
		});
		return formatedObj;
	});
	innerContainer.classList.remove("hidden");
	loader.classList.add("hidden");
	startQuiz();

}).catch ( error => {
	console.log(error);
});

let readyToClick = false;

const SCORE_STEP = 10;

startQuiz = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	setNewQuestion();
}
setNewQuestion = () => {
	if (availableQuestions.length <= 0){
		localStorage.setItem("lastScore", score);
		return window.location.assign("finish.html");
	}
	questionCounter ++;
	questionCounterText.innerText = `${questionCounter}/${questions.length}`;
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);
	readyToClick = true;
}
choices.forEach( choice => {
	choice.addEventListener("click", e =>{
		if (!readyToClick) return;
		readyToClick = false;
		const choiceElement = e.target;
		const answerCode = choiceElement.dataset['number'];
		
		const classToApply = answerCode == currentQuestion.answer ? 'correct' : 'incorrect';
		if (classToApply === 'correct') {
			incrementScore(SCORE_STEP);
		}

		choiceElement.parentElement.classList.add(classToApply);
		setTimeout( ()=>{
			choiceElement.parentElement.classList.remove(classToApply);
			setNewQuestion();
		}, 500);
	});
});
const incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

replacer = (match) => {
    if (match == "&#39;"){
        return `\'`;
    } else if (match == "&quot;"){
		return `\"`;
    } else if (match == "&amp;"){
    	return `\&`;
    }else if (match == "&#039;"){
		return `\'`;
    }
}
