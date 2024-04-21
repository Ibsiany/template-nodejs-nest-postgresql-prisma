import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CategoryEntityDTO } from '../../../categories/dtos/response/category.entity.dto';
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

  @ApiPropertyOptional({
    type: CategoryEntityDTO,
    description: 'Category',
  })
  @IsOptional()
  readonly categories: CategoryEntityDTO[];
}
