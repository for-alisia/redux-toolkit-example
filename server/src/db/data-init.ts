import Datastore from 'nedb-promises';
import { Meeting } from 'src/meetings/meeting.model';

const initialMeetings: Meeting[] = [
  {
    id: 1,
    title: 'Meeting 1',
    description: 'Description 1',
    date: new Date(),
    availableSeats: 10,
    status: 'Active',
    level: 'Beginner',
    attendies: ['John', 'Jane'],
  },
  {
    id: 2,
    title: 'Meeting 2',
    description: 'Description 2',
    date: new Date(),
    availableSeats: 15,
    status: 'Inactive',
    level: 'Intermediate',
    attendies: ['Bob', 'Alice'],
  },
  // Add more initial meetings as needed
];

const initializeDatabase = async (db: Datastore<Meeting>): Promise<void> => {
  await db.insert(initialMeetings);
};

export { initializeDatabase };
