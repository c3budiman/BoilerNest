import {
  Body,
  Get,
  Controller,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FilterIdDto } from 'src/common/dto/filter-id.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import {
  CreateFindings,
  FindingsList,
  UpdateFindings,
} from './dto/finding.dto';
import { FindingsService } from './finding.service';

@ApiTags('findings')
@Controller('findings')
export class FindingsController {
  constructor(private readonly findingService: FindingsService) {}

  @ApiOperation({
    summary: 'Submit Finding Arrays',
    description: `
    JSON Object array of : 
    [
        {
            "githubPath": "",
            "message": "",
            "cwe": "",
            "owasp": "",
            "references": "",
            "severity": "",
            "isFalsePositive": "",
            "assesmentWord": "",
            "idStatus": "",
            "sessionsId": ""
        }
    ]
    `,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  async create(
    @Body(new ParseArrayPipe({ items: CreateFindings })) body: CreateFindings[],
  ): Promise<ResponseDto> {
    const data = await Promise.all(
      body.map((e) => this.findingService.create(e)),
    );
    // const data = await this.findingService.create(body);
    // console.log('tes', data);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'List All Findings',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  async getAll(@Query() query: FindingsList): Promise<ResponseDto> {
    const { limit, offset, order, ...filter } = query;

    const data = await this.findingService.getAll({
      where: {
        ...filter,
      },
      limit,
      offset,
      order,
      include: ['session', 'status'],
    });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'update Findings',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(FileFieldsInterceptor([]))
  @Put(':id')
  async update(
    @Param() param: FilterIdDto,
    @Body() body: UpdateFindings,
  ): Promise<ResponseDto> {
    const { id } = param;

    const data = await this.findingService.update(body, {
      where: {
        id,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
