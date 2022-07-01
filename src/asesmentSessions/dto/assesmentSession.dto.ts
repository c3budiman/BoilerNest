import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
