import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },  
})

@Injectable()
export class WebsocketGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        this.server.emit('message', payload); // broadcast to all clients
    }

    sendUpdateToClient(data: any) {
        this.server.emit('updateAntrian', data); // broadcast to all clients
    }
}