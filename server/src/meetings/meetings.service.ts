import { Injectable } from '@nestjs/common';
import { NeDbService } from '../db/nedb.service';
import { Meeting, MeetingDTO } from './meeting.model';

@Injectable()
export class MeetingsService {
  static DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  static TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
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
    const { id, title, description, level, city, topic, availableSeats, date } =
      meeting;

    const formattedDate = MeetingsService.DATE_FORMATTER.format(date);
    const formattedTime = MeetingsService.TIME_FORMATTER.format(date);

    return {
      id,
      title,
      description,
      level,
      city,
      topic,
      availableSeats,
      date: formattedDate,
      time: formattedTime,
    };
  }
}
