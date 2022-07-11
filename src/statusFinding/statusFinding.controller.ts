import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
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
import { StatusFindingGetter } from './dto/statusFinding.dto';
import { StatusFindingService } from './statusFinding.service';

@ApiTags('status-finding')
@Controller('status-finding')
export class StatusFindingController {
  constructor(private readonly findingService: StatusFindingService) {}

  @ApiOperation({
    summary: 'List Status Finding',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  async getAll(@Query() query: StatusFindingGetter): Promise<ResponseDto> {
    const { limit, offset, order, ...filter } = query;

    const data = await this.findingService.getAll({
      where: {
        ...filter,
      },
      limit,
      offset,
      order,
    });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
