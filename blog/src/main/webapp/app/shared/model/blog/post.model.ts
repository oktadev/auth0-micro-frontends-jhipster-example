import dayjs from 'dayjs';
import { IBlog } from 'app/shared/model/blog/blog.model';
import { ITag } from 'app/shared/model/blog/tag.model';

export interface IPost {
  id?: string;
  title?: string;
  content?: string;
  date?: dayjs.Dayjs;
  blog?: IBlog | null;
  tags?: ITag[] | null;
}

export const defaultValue: Readonly<IPost> = {};
