static var life = 4;

function OnEnterToDeadZone (){
	if(--life <= 0){
		life = 4;
		Application.LoadLevel("Title");
	}else{
		Application.LoadLevel(Application.loadedLevelName);
	}
}

function OnGUI (){
	GUI.Label(Rect(24, 24, 200, 120), "LIFE" + life );
}