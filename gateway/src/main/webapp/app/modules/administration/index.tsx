import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Docs from './docs/docs';
import Gateway from './gateway/gateway';

const AdministrationRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="gateway" element={<Gateway />} />
      <Route path="health" element={<Health />} />
      <Route path="metrics" element={<Metrics />} />
      <Route path="configuration" element={<Configuration />} />
      <Route path="logs" element={<Logs />} />
      <Route path="docs" element={<Docs />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default AdministrationRoutes;
