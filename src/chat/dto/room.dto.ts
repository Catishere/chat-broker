import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RoomDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  serverName: string;
  @IsNumber()
  newRoomId: number;
  @IsNumber()
  @IsOptional()
  oldRoomId?: number;
  @IsNumber()
  userId: number;
}
