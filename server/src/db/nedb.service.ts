import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';
import { Meeting } from 'src/meetings/meeting.model';
import { initializeDatabase } from './data-init';

@Injectable()
export class NeDbService {
  private db: Datastore<Meeting>;

  constructor() {
    this.db = Datastore.create({ inMemoryOnly: true });
    initializeDatabase(this.db);
  }

  getDb(): Datastore<Meeting> {
    return this.db;
  }
}
