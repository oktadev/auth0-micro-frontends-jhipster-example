import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Tag from './tag';
import TagDetail from './tag-detail';
import TagUpdate from './tag-update';
import TagDeleteDialog from './tag-delete-dialog';

const TagRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Tag />} />
    <Route path="new" element={<TagUpdate />} />
    <Route path=":id">
      <Route index element={<TagDetail />} />
      <Route path="edit" element={<TagUpdate />} />
      <Route path="delete" element={<TagDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TagRoutes;
