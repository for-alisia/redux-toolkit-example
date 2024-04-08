import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';
import { Meeting } from 'src/meetings/meeting.model';
import { User } from 'src/users/user.model';
import { Comment } from 'src/comments/comment.model';
import {
  initializeDatabase,
  initialComments,
  initialMeetings,
  initialUsers,
} from './data-init';

@Injectable()
export class NeDbService {
  private meetings: Datastore<Meeting>;
  private users: Datastore<User>;
  private comments: Datastore<Comment>;

  constructor() {
    this.meetings = Datastore.create({ inMemoryOnly: true });
    this.comments = Datastore.create({ inMemoryOnly: true });
    this.users = Datastore.create({ inMemoryOnly: true });
    initializeDatabase(this.meetings, initialMeetings);
    initializeDatabase(this.comments, initialComments);
    initializeDatabase(this.users, initialUsers);
  }

  getMeetingsDb(): Datastore<Meeting> {
    return this.meetings;
  }

  getCommentsDb(): Datastore<Comment> {
    return this.comments;
  }

  getUsersDb(): Datastore<User> {
    return this.users;
  }
}
