import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AssementSessions } from './models/asessmentSessions.models';
import { AssesmentSessionsController } from './asessmentSessions.controller';
import { AsessmentSessionsService } from './asessmentSessions.service';

@Module({
  imports: [SequelizeModule.forFeature([AssementSessions])],
  controllers: [AssesmentSessionsController],
  providers: [AsessmentSessionsService],
  exports: [AsessmentSessionsService],
})
export class AsessmentSessionModule {}
