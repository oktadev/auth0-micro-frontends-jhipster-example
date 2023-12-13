import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { addTranslationSourcePrefix } from 'app/shared/reducers/locale';
import { useAppDispatch, useAppSelector } from 'app/config/store';

const EntitiesMenu = () => {
  const lastChange = useAppSelector(state => state.locale.lastChange);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addTranslationSourcePrefix('services/blog/'));
  }, [lastChange]);

  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/blog/blog">
        <Translate contentKey="global.menu.entities.blogBlog" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/blog/post">
        <Translate contentKey="global.menu.entities.blogPost" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/blog/tag">
        <Translate contentKey="global.menu.entities.blogTag" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
