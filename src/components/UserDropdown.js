import React from 'react';
import { compose } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown, Menu, Avatar } from '@8base/boost';
import { withLogout } from '@8base/auth';

const USER_QUERY = gql`
  query User {
    user {
      email
      firstName
      id
      lastName
      avatar {
        id
        downloadUrl
      }
    }
  }
`;

class UserDropdown extends React.Component {
  renderContent = ({ data, loading }) => {
    const { user = {} } = data;

    if (loading) {
      return null;
    }

    return (
      <Dropdown defaultOpen={false}>
        <Dropdown.Head>
          <Avatar
            src={user.avatar && user.avatar.downloadUrl}
            name={user.firstName}
            size="sm"
          />
        </Dropdown.Head>
        <Dropdown.Body pin="right">
          {({ closeDropdown }) => (
            <Menu>
              <Menu.Item
                onClick={async () => {
                  await this.props.logout();
                  closeDropdown();
                }}
              >
                Log Out
              </Menu.Item>
            </Menu>
          )}
        </Dropdown.Body>
      </Dropdown>
    );
  };

  render() {
    return <Query query={USER_QUERY}>{this.renderContent}</Query>;
  }
}

UserDropdown = compose(withLogout)(UserDropdown);

export { UserDropdown };
