import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
export type SortOrder = 'ASC' | 'DESC';

export class ListInvoicesDto {
  @ApiPropertyOptional({ 
    description: 'Sort order for the results',
    enum: ['ASC', 'DESC'],
    example: 'DESC',
    default: 'DESC'
  })
  @IsOptional() @IsIn(['ASC', 'DESC'])
  order?: SortOrder = 'DESC';
}
