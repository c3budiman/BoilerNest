import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export enum SeverityStatus {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class CreateFindings {
  @ApiProperty({
    description: 'githubPath',
  })
  @IsNotEmpty()
  githubPath: string;

  @ApiPropertyOptional({
    description: 'message for finding',
  })
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'cwe for finding',
  })
  @IsOptional()
  cwe?: string;

  @ApiPropertyOptional({
    description: 'owasp for finding',
  })
  @IsOptional()
  owasp?: string;

  @ApiPropertyOptional({
    description: 'references for finding',
  })
  @IsOptional()
  references?: string;

  @ApiPropertyOptional({
    description: 'severity for finding',
    enum: ['low', 'medium', 'high'],
  })
  @IsOptional()
  severity?: string;

  @ApiProperty({
    description: 'Sessions ID',
  })
  @IsUUID()
  @IsNotEmpty()
  sessionsId: string;

  @ApiProperty({
    description: 'ID Status',
  })
  @IsUUID()
  @IsNotEmpty()
  idStatus: string;
}

export class FindingsList extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Severity Status',
    enum: SeverityStatus,
  })
  @IsOptional()
  @IsEnum(SeverityStatus, { each: true })
  severity?: string[];
  @ApiPropertyOptional({
    description: 'Sessions ID',
  })
  @IsUUID()
  @IsOptional()
  sessionsId: string;

  @ApiPropertyOptional({
    description: 'ID Status',
  })
  @IsUUID()
  @IsOptional()
  idStatus: string;
}

export class UpdateFindings extends CreateFindings {
  @ApiPropertyOptional({
    description: 'githubPath',
  })
  @IsOptional()
  githubPath: string;

  @ApiPropertyOptional({
    description: 'Sessions ID',
  })
  @IsUUID()
  @IsOptional()
  sessionsId: string;

  @ApiPropertyOptional({
    description: 'isFalsePositive',
  })
  @IsOptional()
  isFalsePositive: boolean;

  @ApiPropertyOptional({
    description: 'assesmentWord',
  })
  @IsOptional()
  assesmentWord: string;

  @ApiPropertyOptional({
    description: 'ID Status',
  })
  @IsUUID()
  @IsOptional()
  idStatus: string;
}
