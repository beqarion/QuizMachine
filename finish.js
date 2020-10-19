
const nameInput	= document.getElementById("nameInput");
const scoreText = document.getElementById("finalScore");
const lastScore = localStorage.getItem("lastScore");
scoreText.innerText = lastScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);





saveScore = (e) => {
	e.preventDefault();
	console.log("clicked btn");

	const score = {
		score: lastScore,
		name: nameInput.value
	};
	highScores.push(score);
	highScores.sort( (a,b) => b.score - a.score);
	highScores.splice(10);
	
	localStorage.setItem("highScores", JSON.stringify(highScores));


	nameInput.value = '';
	window.location.href = 'highScores.html';
}