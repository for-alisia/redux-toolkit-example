export class Meeting {
  id: number;
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
  status: string;
  attendies: string[];
  city: string;
  level: string;
}

export type MeetingDTO = Pick<
  Meeting,
  'id' | 'title' | 'description' | 'availableSeats' | 'city' | 'level'
> & { date: string };
