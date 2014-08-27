function Update () {
}

function OnTriggerEnter ( other : Collider ){

	var playerController = other.GetComponent(PlayerController);
	
	if( playerController ){
		Application.LoadLevel("Ending");
	}
}