import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { RoomDto } from './dto/room.dto';
import { getRoomId } from './utils/string.util';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      return new WsException(errors);
    },
  }),
)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {
  @SubscribeMessage('room')
  async handleRoom(
    @MessageBody() data: RoomDto,
    @ConnectedSocket() client: Socket,
  ): Promise<boolean> {
    if (data.oldRoomId) {
      await client.leave(getRoomId(data.serverName, data.oldRoomId));
    } else {
      console.log(`User ${client.id} joined server ${data.serverName}`);
    }
    await client.join(getRoomId(data.serverName, data.newRoomId));
    return true;
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: MessageDto,
    @ConnectedSocket() client: Socket,
  ): boolean {
    client.broadcast
      .to(getRoomId(data.serverName, data.roomId))
      .emit('message', data.message);
    return true;
  }

  handleDisconnect(client: Socket) {
    console.log(`User ${client.id} left`);
  }
}
