import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Finding } from './models/finding.model';
import { FindingsService } from './finding.service';
import { FindingsController } from './finding.controller';

@Module({
  imports: [SequelizeModule.forFeature([Finding])],
  controllers: [FindingsController],
  providers: [FindingsService],
  exports: [FindingsService],
})
export class FindingsModule {}
