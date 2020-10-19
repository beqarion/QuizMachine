storeUrl = () => {
	let url = "https://opentdb.com/api.php?" + $("#queryForm").serialize() + "&type=multiple";
	localStorage.setItem('apiUrl',url);
	console.log(localStorage.getItem("apiUrl"));
}