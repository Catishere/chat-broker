/* eslint-disable @typescript-eslint/no-unsafe-call */
// chat/dto/create-message.dto.ts
import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class RoomDto {
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  serverName: string;

  @IsNumber()
  newRoomId: number;

  @IsNumber()
  oldRoomId: number;

  @IsNumber()
  userId: number;
}
