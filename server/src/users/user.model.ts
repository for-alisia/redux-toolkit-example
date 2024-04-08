export type Gender = 'female' | 'male';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
