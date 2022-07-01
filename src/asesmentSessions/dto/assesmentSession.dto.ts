import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CreateAssesmentSessions {
  @ApiProperty({
    description: 'Name of the assesment session',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Github repo for the sessions',
  })
  @IsNotEmpty()
  githubMain: string;
}

export class AssesmentList extends PaginationDto {}
