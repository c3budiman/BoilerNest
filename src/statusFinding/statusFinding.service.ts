import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from '../common/interfaces/generic-service.interface';
import { PaginationResult } from '../common/types/pagination-result.type';
import { StatusFinding } from './models/statusFinding.model';

@Injectable()
export class StatusFindingService implements IGenericService<StatusFinding> {
  constructor(
    @InjectModel(StatusFinding)
    private readonly model: typeof StatusFinding,
  ) {}

  async get(
    options: FindOptions<StatusFinding>,
    scopes?: Array<string>,
  ): Promise<StatusFinding> {
    return this.model.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<StatusFinding>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<StatusFinding>> {
    return this.model.scope(scopes ?? 'defaultScope').findAndCountAll(options);
  }

  async create(
    values: Partial<StatusFinding>,
    scopes?: Array<string>,
  ): Promise<StatusFinding> {
    const data = await this.model
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();
    return data.reload();
  }

  async update(
    values: Partial<StatusFinding>,
    options: FindOptions<StatusFinding>,
    scopes?: Array<string>,
  ): Promise<StatusFinding> {
    const data = await this.model
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    if (!data) {
      throw new NotFoundException('user not found');
    }

    return data.update(values);
  }
}
