import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post('byId')
  async findUsersByIds(@Body() body: { ids: string[] }): Promise<User[]> {
    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      console.log(body);
      throw new BadRequestException(
        'Please provide user ids in the request body as an array',
      );
    }
    return this.userService.findUsersByIds(body.ids);
  }
}
