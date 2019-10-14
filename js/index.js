// localStorage vars
var playerRef = "playerName";
var playerName= "Guest";
var bestPlayerRef = "bestPlayer";

function assignUser(){
	un=localStorage.getItem(playerRef);
	if (un == null) {
		un=prompt("Assign Your Name Please:","Guest");
		if (un == null) {
			localStorage.setItem(playerRef,playerName);
		} else {
			localStorage.setItem(playerRef,un);
			playerName=un;
			
		}
	} else {
		playerName=localStorage.getItem(playerRef);
	
	}
	document.getElementById("himsg").innerHTML="Hi " + playerName;

}
