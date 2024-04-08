import { NeDbService } from './db/nedb.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingsModule } from './meetings/meetings.module';
import { UserModule } from './users/user.module';
import { CommentModule } from './comments/comments.module';

@Module({
  imports: [MeetingsModule, UserModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, NeDbService],
})
export class AppModule {}
