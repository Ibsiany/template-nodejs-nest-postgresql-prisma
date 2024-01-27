import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntityInterface } from '../../../users/interfaces/user-entity.interface';

export class CreateAndSaveCardDTO {
  @ApiProperty({
    type: 'string',
    description: 'Description card',
    example: 'create crud',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: 'string',
    description: 'Status card',
    example: '10',
  })
  @IsString()
  readonly status: string;

  @ApiProperty({
    type: 'string',
    description: 'Title card',
    example: 'Create CRUD',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: 'User',
  })
  @IsString()
  readonly user: UserEntityInterface;
}
