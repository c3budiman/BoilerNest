import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from '../common/interfaces/generic-service.interface';
import { PaginationResult } from '../common/types/pagination-result.type';
import { Finding } from './models/finding.model';

@Injectable()
export class FindingsService implements IGenericService<Finding> {
  constructor(
    @InjectModel(Finding)
    private readonly model: typeof Finding,
  ) {}

  async get(
    options: FindOptions<Finding>,
    scopes?: Array<string>,
  ): Promise<Finding> {
    return this.model.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Finding>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Finding>> {
    return this.model.scope(scopes ?? 'defaultScope').findAndCountAll(options);
  }

  async create(
    values: Partial<Finding>,
    scopes?: Array<string>,
  ): Promise<Finding> {
    const data = await this.model
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();
    return data.reload();
  }

  async update(
    values: Partial<Finding>,
    options: FindOptions<Finding>,
    scopes?: Array<string>,
  ): Promise<Finding> {
    const data = await this.model
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    if (!data) {
      throw new NotFoundException('user not found');
    }

    return data.update(values);
  }
}
