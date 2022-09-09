import React, { useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Table, Button } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getGatewayRoutes } from '../administration.reducer';

export const GatewayPage = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(state => state.administration.loading);
  const routes = useAppSelector(state => state.administration.gateway.routes);

  useEffect(() => {
    dispatch(getGatewayRoutes());
  }, []);

  const metadata = instance => {
    const spans = [];
    Object.keys(instance).map((key, index) => {
      spans.push(
        <span key={key.toString() + 'value'}>
          <Badge key={key.toString() + '-containerbadge'} className="fw-normal">
            <Badge key={key.toString() + '-badge'} color="info" className="fw-normal" pill>
              {key}
            </Badge>
            {instance[key]}
          </Badge>
        </span>
      );
    });
    return spans;
  };

  const badgeInfo = info => {
    if (info) {
      if (info.status === 'UP') {
        return <Badge color="success">{info.status}</Badge>;
      } else {
        return <Badge color="danger">{info.status}</Badge>;
      }
    } else {
      return <Badge color="warning">?</Badge>;
    }
  };

  const instanceInfo = route => {
    if (route) {
      return (
        <Table striped responsive>
          <tbody>
            {route.serviceInstances.map((instance, i) => (
              <tr key={instance.instanceInfo + '-info'}>
                <td>
                  <a href={instance.uri} target="_blank" rel="noopener noreferrer">
                    {instance.uri}
                  </a>
                </td>
                <td>{badgeInfo(instance.instanceInfo)}</td>
                <td>{metadata(instance.metadata)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };

  const gatewayRoutes = () => {
    if (!isFetching) {
      dispatch(getGatewayRoutes());
    }
  };

  return (
    <div>
      <h2>Gateway</h2>
      <p>
        <Button onClick={gatewayRoutes} color={isFetching ? 'danger' : 'primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>

      <Table striped responsive>
        <thead>
          <tr key="header">
            <th>
              <Translate contentKey="gateway.routes.url">URL</Translate>
            </th>
            <th>
              <Translate contentKey="gateway.routes.service">Service</Translate>
            </th>
            <th>
              <Translate contentKey="gateway.routes.servers">Available servers</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, i) => (
            <tr key={`routes-${i}`}>
              <td>{route.path}</td>
              <td>{route.serviceId}</td>
              <td>{instanceInfo(route)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GatewayPage;
