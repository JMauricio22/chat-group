import { IsString, Length, IsInt, IsPositive } from 'class-validator';

export class CreateChannel {
  @IsString()
  @Length(5)
  name: string;

  @IsString()
  description: string;
}

export class AddUserToChannel {
  @IsInt()
  @IsPositive()
  channelId: number;
}

export class SendMessageToChannel extends AddUserToChannel {
  @IsString()
  text: string;
}
