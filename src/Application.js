import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WebAuth0AuthClient } from '@8base/web-auth0-auth-client';
import { ApiTokenAuthClient } from '@8base/api-token-auth-client';
import { EightBaseAppProvider } from '@8base/app-provider';
import { EightBaseBoostProvider, AsyncContent } from '@8base/boost';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_SUCCESS_MESSAGE } from './shared/constants';

import { Root } from './Root';

/** __AUTH_API_TOKEN_START__ */
const authClient = new ApiTokenAuthClient({
  apiToken: '__APP_API_TOKEN__',
});
/** __AUTH_API_TOKEN_END__ */

/** __AUTH_WEB_START__ */
const APP_API_ENDPOINT = '__APP_API_ENDPOINT__';
const APP_AUTH_CLIENT_ID = '__APP_AUTH_CLIENT_ID__';
const APP_AUTH_DOMAIN = '__APP_AUTH_DOMAIN__';

const auth0WebClient = new WebAuth0AuthClient({
  domain: APP_AUTH_DOMAIN,
  clientId: APP_AUTH_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`,
  logoutRedirectUri: `${window.location.origin}/auth`,
});
/** __AUTH_WEB_END__ */

class Application extends React.PureComponent {
  onRequestSuccess = ({ operation }) => {
    const message = operation.getContext()[TOAST_SUCCESS_MESSAGE];

    if (message) {
      toast.success(message);
    }
  };

  onRequestError = ({ graphQLErrors }) => {
    const hasGraphQLErrors = Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach(error => {
        toast.error(error.message);
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <EightBaseBoostProvider>
          <EightBaseAppProvider
            uri={APP_API_ENDPOINT}
            authClient={authClient}
            onRequestSuccess={this.onRequestSuccess}
            onRequestError={this.onRequestError}
          >
            {({ loading }) => (
              <AsyncContent loading={loading} stretch>
                <Root />
              </AsyncContent>
            )}
          </EightBaseAppProvider>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </EightBaseBoostProvider>
      </BrowserRouter>
    );
  }
}

export { Application };
