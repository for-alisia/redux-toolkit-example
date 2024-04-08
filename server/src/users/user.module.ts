import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NeDbService } from '../db/nedb.service';

@Module({
  controllers: [UserController],
  providers: [UserService, NeDbService], // Include NeDbService as a provider
})
export class UserModule {}
