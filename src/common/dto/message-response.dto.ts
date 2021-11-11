import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ObjectType({ description: 'message' })
export class MessageResponseDto {
  @ApiProperty({ description: 'message', example: 'ok' })
  @IsString()
  @Field()
  readonly message: string;
}
