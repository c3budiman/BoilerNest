import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusFinding } from './models/statusFinding.model';
import { StatusFindingController } from './statusFinding.controller';
import { StatusFindingService } from './statusFinding.service';

@Module({
  imports: [SequelizeModule.forFeature([StatusFinding])],
  controllers: [StatusFindingController],
  providers: [StatusFindingService],
  exports: [StatusFindingService],
})
export class StatusFindingModule {}
