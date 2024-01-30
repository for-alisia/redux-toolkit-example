import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  @Post()
  async create(@Body() meeting: Meeting): Promise<Meeting> {
    return this.meetingsService.create(meeting);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() meeting: Meeting,
  ): Promise<Meeting> {
    return this.meetingsService.update(parseInt(id, 10), meeting);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.meetingsService.remove(parseInt(id, 10));
  }
}
