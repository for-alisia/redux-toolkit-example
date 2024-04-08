import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { NeDbService } from '../db/nedb.service';

@Injectable()
export class CommentService {
  constructor(private readonly neDbService: NeDbService) {}

  async findAllCommentsForMeeting(meetingId: number): Promise<Comment[]> {
    const commentsDb = this.neDbService.getCommentsDb();
    return commentsDb.find({ meetingId });
  }

  async createComment(comment: Comment): Promise<Comment> {
    const commentsDb = this.neDbService.getCommentsDb();
    return commentsDb.insert(comment);
  }
}
