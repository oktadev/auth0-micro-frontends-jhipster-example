import post from 'app/entities/blog/post/post.reducer';
import blog from 'app/entities/blog/blog/blog.reducer';
import tag from 'app/entities/blog/tag/tag.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  post,
  blog,
  tag,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
