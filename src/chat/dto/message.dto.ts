/* eslint-disable @typescript-eslint/no-unsafe-call */
// chat/dto/create-message.dto.ts
import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class MessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  serverName: string;

  @IsNumber()
  roomId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  message: string;
}
