import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { NeDbService } from '../db/nedb.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, NeDbService],
})
export class CommentModule {}
