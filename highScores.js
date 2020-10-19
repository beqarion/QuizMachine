const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML = highScores.map( el => {
	return`<li class='high-score'>${el.name} - ${el.score}</li>`;
}).join('');
resetScore = () => {
	localStorage.clear();
	location.reload();
	console.log("reset is clicked");
}