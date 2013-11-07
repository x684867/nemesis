/*
	Nemesis Audit Server package
	/srv/nemesis/packages/audit/main.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
*/
module.exports=function(){

	listen=function(){
	
		/*
			Evaluate inbound message and route it to the proper function.
		
			polo_route_<routeName>
			
		*/
			
	
	
	}

}
/* 
	polo_route_register():
	
	Accept and validate a registration message then return a sessionId  Track this
   	sessionId with the peer in the run-time peer list.
 */
function polo_route_register(message){

	 
}
/*
	polo_route_advertise():
	
	Accepts and handles advertisements from marco.  If the object exists on the local
	system it will return the object to the advertising (remote) marco instance.
 */
function polo_route_advertise(message){

}
/*
	polo_route_replicate(message):

	Accepts a remote marco.push() message and evaluates the inbound replicated object for
	local storage or rejection.
*/
function polo_route_replicate(message){
	
		
}