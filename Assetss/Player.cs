// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.24
// 

using Colyseus.Schema;

public class Player : Schema {
	[Type(0, "ref", typeof(Position))]
	public Position position = new Position();

	[Type(1, "ref", typeof(Position))]
	public Position rotation = new Position();

	[Type(2, "string")]
	public string holding = "";
}

