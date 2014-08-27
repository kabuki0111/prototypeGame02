function OnTriggerEnter (other : Collider){
	var PlayerController = other.GetComponent(PlayerController);
	
	if(PlayerController){
		PlayerController.OnEnterToDeadZone();
	}
}