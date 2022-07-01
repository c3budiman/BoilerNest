import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from '../common/interfaces/generic-service.interface';
import { PaginationResult } from '../common/types/pagination-result.type';
import { AssementSessions } from './models/asessmentSessions.models';

@Injectable()
export class AsessmentSessionsService
  implements IGenericService<AssementSessions>
{
  constructor(
    @InjectModel(AssementSessions)
    private readonly roleModel: typeof AssementSessions,
  ) {}

  async get(
    options: FindOptions<AssementSessions>,
    scopes?: Array<string>,
  ): Promise<AssementSessions> {
    return this.roleModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<AssementSessions>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<AssementSessions>> {
    return this.roleModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<AssementSessions>,
    scopes?: Array<string>,
  ): Promise<AssementSessions> {
    const data = await this.roleModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();
    return data.reload();
  }

  async update(
    values: Partial<AssementSessions>,
    options: FindOptions<AssementSessions>,
    scopes?: Array<string>,
  ): Promise<AssementSessions> {
    const data = await this.roleModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    if (!data) {
      throw new NotFoundException('sessions not found');
    }

    return data.update(values);
  }
}
