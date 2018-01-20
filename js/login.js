var oLogin = document.getElementById("navLogin");
var oSignup = document.getElementById("navSingup");
var olsFlag = 1;

oLogin.onclick = function() {
	olsFlag = 2;
	window.location.href = 'login.html';
}

oSignup.onclick = function() {
	olsFlag = 3;
	window.location.href = 'login.html';
}
