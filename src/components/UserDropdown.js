import React from 'react';
import { compose } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown, Menu, Avatar } from '@8base/boost';
import { withLogout } from '@8base/auth';

const TEAM_MEMBER_QUERY = gql`
  query TeamMember {
    teamMember {
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
    const { teamMember = {} } = data;

    if (loading) {
      return null;
    }

    return (
      <Dropdown defaultOpen={false}>
        <Dropdown.Head>
          <Avatar
            src={teamMember.avatar && teamMember.avatar.downloadUrl}
            name={teamMember.firstName}
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
    return <Query query={TEAM_MEMBER_QUERY}>{this.renderContent}</Query>;
  }
}

UserDropdown = compose(withLogout)(UserDropdown);

export { UserDropdown };
