import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { RoomDto } from './dto/room.dto';
import { getRoomId } from './utils/string.util';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('room')
  async handleRoom(
    @MessageBody() data: RoomDto,
    @ConnectedSocket() client: Socket,
  ): Promise<boolean> {
    await client.leave(getRoomId(data.serverName, data.oldRoomId));
    await client.join(getRoomId(data.serverName, data.newRoomId));
    return true;
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: MessageDto): boolean {
    this.server
      .to(getRoomId(data.serverName, data.roomId))
      .emit('message', data.message);
    return true;
  }

  handleDisconnect(client: Socket) {
    console.log(`Cleanup for user: ${client.id}`);
  }
}
