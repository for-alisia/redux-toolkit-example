import { Injectable } from '@nestjs/common';
import { NeDbService } from '../db/nedb.service';
import { Meeting } from './meeting.model';

@Injectable()
export class MeetingsService {
  constructor(private readonly neDbService: NeDbService) {}

  async findAll(): Promise<Meeting[]> {
    return this.neDbService.getDb().find<Meeting>({});
  }

  async findOne(id: number): Promise<Meeting> {
    return this.neDbService.getDb().findOne<Meeting>({ id });
  }

  async create(meeting: Meeting): Promise<Meeting> {
    return this.neDbService.getDb().insert<Meeting>(meeting);
  }

  async update(id: number, meeting: Meeting): Promise<Meeting> {
    await this.neDbService.getDb().update({ id }, { $set: meeting }, {});
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.neDbService.getDb().remove({ id }, { multi: false });
  }
}
