import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { NeDbService } from '../db/nedb.service';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService, NeDbService],
})
export class MeetingsModule {}
