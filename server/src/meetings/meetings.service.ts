import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { NeDbService } from '../db/nedb.service';
import { Meeting, MeetingDTO } from './meeting.model';

@Injectable()
export class MeetingsService {
  constructor(private readonly neDbService: NeDbService) {}

  async findAll(): Promise<MeetingDTO[]> {
    const meetingsDb = this.neDbService.getMeetingsDb();
    return (await meetingsDb.find({})).map(this.prepareMeetingDTO);
  }

  async findOne(meetingId: number): Promise<Meeting> {
    const meetingsDb = this.neDbService.getMeetingsDb();
    const meeting = await meetingsDb.findOne({ id: meetingId });

    if (!meeting) {
      throw new NotFoundException(`Meeting with id ${meetingId} not found`);
    }

    return meeting;
  }

  async updateAvailableSeats(id: number): Promise<MeetingDTO> {
    const meeting: Meeting = await this.findOne(id);
    const meetingsDb = this.neDbService.getMeetingsDb();

    if (meeting.availableSeats === 0) {
      throw new BadRequestException('No available seats');
    }

    meeting.availableSeats -= 1;

    const numAffected = await meetingsDb.update({ id: id }, { $set: meeting });
    if (numAffected === 0) {
      return null;
    }

    return this.prepareMeetingDTO(meeting);
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
