import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AsessmentSessionsService } from './asessmentSessions.service';
import { CreateAssesmentSessions } from './dto/assesmentSession.dto';

@ApiTags('assesment sessions')
@Controller('assesmentSessions')
export class AssesmentSessionsController {
  constructor(private readonly assesmentService: AsessmentSessionsService) {}

  @ApiOperation({
    summary: 'Create assesment sessions',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  async create(@Body() body: CreateAssesmentSessions): Promise<ResponseDto> {
    const data = await this.assesmentService.create(body);
    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }
}
