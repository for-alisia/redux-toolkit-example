import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { NeDbService } from '../db/nedb.service';

@Injectable()
export class UserService {
  constructor(private readonly neDbService: NeDbService) {}

  async findAllUsers(): Promise<User[]> {
    const usersDb = this.neDbService.getUsersDb();
    return usersDb.find({});
  }

  async findUsersByIds(ids: string[]): Promise<User[]> {
    const usersDb = this.neDbService.getUsersDb();
    return usersDb.find({ id: { $in: ids } });
  }
}
