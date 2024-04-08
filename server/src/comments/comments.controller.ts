import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Comment } from './comment.model'; // Import your Comment model here
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':meetingId')
  async findAllCommentsForMeeting(
    @Param('meetingId', ParseIntPipe) meetingId: number,
  ): Promise<Comment[]> {
    return this.commentService.findAllCommentsForMeeting(meetingId);
  }

  @Post()
  async createComment(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.createComment(comment);
  }
}
