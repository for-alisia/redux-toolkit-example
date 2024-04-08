export type Meeting = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  availableSeats: number;
  city: string;
  level: string;
  attendies: string[];
}

export type MeetingDTO = Omit<Meeting, 'time'>;

export type MetingDetailed = Meeting & { status: string };