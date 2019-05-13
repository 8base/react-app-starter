import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '@8base/auth';

const renderComponent = props => {
  const { render, children, component, ...rest } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...rest }, children);
  }

  if (render) {
    rendered = render({ ...rest, children });
  }

  if (typeof children === 'function') {
    rendered = children(rest);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error('Error: must specify either a render prop, a render function as children, or a component prop.');
  }

  return rendered;
};

class ProtectedRoute extends React.Component {
  renderRoute = () => {
    const {
      auth: { isAuthorized },
      ...rest
    } = this.props;

    if (isAuthorized) {
      return renderComponent(rest);
    }

    return <Redirect to={{ pathname: '/auth', state: { from: rest.location } }} />;
  };

  render() {
    const { component, render, ...restProps } = this.props;

    return <Route {...restProps} render={this.renderRoute} />;
  }
}

ProtectedRoute = withAuth(ProtectedRoute);

export { ProtectedRoute };
