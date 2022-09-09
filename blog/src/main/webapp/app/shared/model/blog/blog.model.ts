import { IUser } from 'app/shared/model/user.model';

export interface IBlog {
  id?: string;
  name?: string;
  handle?: string;
  user?: IUser | null;
}

export const defaultValue: Readonly<IBlog> = {};
