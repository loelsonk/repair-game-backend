import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";


export class Position extends Schema {
    @type("float64")
    x: number = 0;

    @type("float64")
    y: number = 0;

    @type("float64")
    z: number = 0;

    set(x, y, z) {
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        if (z) {
            this.z = z;
        }
    }
}

// class World extends Schema {
//     @type("number")
//     width: number;
//
//     @type("number")
//     height: number;
//
//     @type("number")
//     items: number = 10;
// }
//
// class MyState extends Schema {
//     @type(World)
//     world: World = new World();
// }

export class Player extends Schema {
    @type(Position)
    position: Position = new Position();

    @type(Position)
    rotation: Position = new Position();

    @type("string") holding = '';
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    movePlayer (id: string, { x, y, z }: any) {
        this.players[id].position.set(x, y, z);
    }

    rotatePlayer (id: string, { x, y, z }: any) {
        this.players[id].rotation.set(x, y, z);
    }
}

export class RepairGameRoom extends Room<State> {
    maxClients = 4;

    onCreate (options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());
    }

    onJoin (client: Client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("StateHandlerRoom received message from", client.sessionId, ":", data);

        if (data.position) {
            this.state.movePlayer(client.sessionId, data.position);
        }

        if (data.rotation) {
            this.state.rotatePlayer(client.sessionId, data.rotation);
        }
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}
