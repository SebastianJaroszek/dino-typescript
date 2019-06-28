import io from 'socket.io-client';
import {Player} from '../../server/src/modules/game_2/player';

class GameSocket {
    private socket: SocketIOClient.Socket;
    private players: Map<string, Player> = new Map();

    constructor() {
        this.socket = io('http://localhost:3000');
        this.init();
    }

    private init() {
        this.socket.on('connect', this.onConnect.bind(this));
    }

    private onConnect(): void {
        console.log('connect ' + this.socket.id);
    }

    private onAllPlayers(players: string) {
        this.players = new Map(JSON.parse(players));
    }

    getPlayers(): Map<string, Player> {
        return this.players;
    }

    getPlayer(): Player {
        return this.players.get(this.socket.id);
    }

}

export default GameSocket;
