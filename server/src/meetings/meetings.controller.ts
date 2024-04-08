import { Controller, Get, Put, Param } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { Meeting, MeetingDTO } from './meeting.model';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  async findAll(): Promise<MeetingDTO[]> {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Meeting> {
    return this.meetingsService.findOne(parseInt(id, 10));
  }

  @Put('/seats/:id')
  async updateAvailableSeats(@Param('id') id: string) {
    return this.meetingsService.updateAvailableSeats(parseInt(id, 10));
  }
}
