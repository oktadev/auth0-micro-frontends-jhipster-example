import { IPost } from 'app/shared/model/blog/post.model';

export interface ITag {
  id?: string;
  name?: string;
  posts?: IPost[] | null;
}

export const defaultValue: Readonly<ITag> = {};
