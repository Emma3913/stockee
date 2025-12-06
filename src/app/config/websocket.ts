import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { uiStyles } from '../../ui/styles/uiStyles';

let client: Client | null = null;

export function connectWS(
  onMessage: any,
  onConnect: any,
  onDisconnect: any,
  uuidTienda: any,
) {
  const socket = new SockJS('https://store-1-9jzc.onrender.com/ws');

  client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: msg => console.log('STOMP:', msg),
  });

  client.onConnect = () => {
    console.log('Conectado');

    // TODO: Manejar Roles
    client!.subscribe(`/webhook/productos/uuidTienda/${uuidTienda}`, msg => {
      console.log('Mensaje recibido:', msg.body);
      onMessage(JSON.parse(msg.body));
    });

    client!.subscribe(`/webhook/ventas/uuidTienda/${uuidTienda}`, msg => {
      console.log('Mensaje recibido:', msg.body);
      onMessage(JSON.parse(msg.body));
    });

    client!.subscribe(`/webhook/usuario/idUsuario/${uuidTienda}`, msg => {
      console.log('Mensaje recibido:', msg.body);
      onMessage(JSON.parse(msg.body));
    });

    client!.subscribe(`/webhook/tiendas/uuidTienda/${uuidTienda}`, msg => {
      console.log('Mensaje recibido:', msg.body);
      onMessage(JSON.parse(msg.body));
    });

    onConnect?.();
  };

  client.onStompError = frame => {
    console.log('STOMP error:', frame);
  };

  client.onWebSocketClose = () => {
    console.log('WebSocket cerrado');
    onDisconnect?.();
  };

  client.activate();
}
