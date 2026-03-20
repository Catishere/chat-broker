import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MessageDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @IsNotEmpty()
  serverName: string;
  @IsNumber()
  roomId: number;
  @IsNumber()
  userId: number;
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  message: string;
}
