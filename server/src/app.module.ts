import { NeDbService } from './db/nedb.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [MeetingsModule],
  controllers: [AppController],
  providers: [AppService, NeDbService],
})
export class AppModule {}
