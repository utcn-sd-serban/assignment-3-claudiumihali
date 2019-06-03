import { EventEmitter } from "events";
import { Client } from "@stomp/stompjs";

class WebSocketEmitter extends EventEmitter {
    constructor() {
        super();
        this.client = new Client({
            brokerURL: "ws://localhost:8080/api/websocket",
            onConnect: () => {
                this.client.subscribe("/topic/events", message => {
                    this.emit("event", JSON.parse(message.body));
                })
            }
        });
        this.client.activate();
    }
}

const webSocketEmitter = new WebSocketEmitter();

export default webSocketEmitter;