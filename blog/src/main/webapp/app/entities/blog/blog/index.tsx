import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Blog from './blog';
import BlogDetail from './blog-detail';
import BlogUpdate from './blog-update';
import BlogDeleteDialog from './blog-delete-dialog';

const BlogRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Blog />} />
    <Route path="new" element={<BlogUpdate />} />
    <Route path=":id">
      <Route index element={<BlogDetail />} />
      <Route path="edit" element={<BlogUpdate />} />
      <Route path="delete" element={<BlogDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BlogRoutes;
