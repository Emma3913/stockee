import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";

let client: Client | null = null;

export function connectWS(onMessage : any, onConnect: any, onDisconnect: any) {
    const socket = new SockJS("https://unkneaded-deepeningly-sandra.ngrok-free.dev/ws");

    client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (msg) => console.log("STOMP:", msg)
    });

    client.onConnect = () => {
        console.log("Conectado");

        client!.subscribe("/topic/changes", (msg) => {
            console.log("Mensaje recibido:", msg.body);
            onMessage(JSON.parse(msg.body));
        });

        onConnect?.();
    };

    client.onStompError = (frame) => {
        console.log("STOMP error:", frame);
    };

    client.onWebSocketClose = () => {
        console.log("WebSocket cerrado");
        onDisconnect?.();
    };

    client.activate();
}