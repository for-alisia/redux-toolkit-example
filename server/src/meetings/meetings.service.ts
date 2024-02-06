import { Injectable } from '@nestjs/common';
import { NeDbService } from '../db/nedb.service';
import { Meeting, MeetingDTO } from './meeting.model';

@Injectable()
export class MeetingsService {
  constructor(private readonly neDbService: NeDbService) {}

  async findAll(): Promise<MeetingDTO[]> {
    const dbMeetings = await this.neDbService.getDb().find<Meeting>({});

    return dbMeetings.map(this.prepareMeetingDTO);
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

  private prepareMeetingDTO(meeting: Meeting): MeetingDTO {
    const { id, title, description, level, city, availableSeats, date } =
      meeting;

    const formattedDate = date.toLocaleDateString();

    return {
      id,
      title,
      description,
      level,
      city,
      availableSeats,
      date: formattedDate,
    };
  }
}
