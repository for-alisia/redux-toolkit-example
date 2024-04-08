export interface Comment {
  meetingId: number;
  authorId: string;
  authorName: string;
  date: string;
  time: string;
  text: string;
}

export type CommentDTO = Omit<Comment, 'date' | 'time' | 'authorName'> & {
  createdDate: string;
}