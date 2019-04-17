import React from 'react';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import { Mutation, Query } from 'react-apollo';
import { LOGOUT, IS_LOGGED_IN } from '../../graphql';

const MenuDrop = () => {
  const { t } = useTranslation();
  return (
    <Mutation mutation={LOGOUT}>
      {logout => (
        <Menu>
          <Menu.Item onClick={logout}>
            <Icon type="logout" />
            {t('common.logout')}
          </Menu.Item>
        </Menu>
      )}
    </Mutation>
  );
};

const HeaderUser = () => (
  <Query query={IS_LOGGED_IN}>
    {({ data: { userLogged } }) => {
      const user = JSON.parse(userLogged.currentUser);
      return (
        <Dropdown overlay={() => <MenuDrop />} placement="bottomRight">
          <div className="custom-header-user">
            <Avatar icon="user" />
            {user && (
              <span style={{ paddingLeft: 8 }}>
                {user.name || user.username}
              </span>
            )}
          </div>
        </Dropdown>
      );
    }}
  </Query>
);

HeaderUser.displayName = 'HeaderUser';

export default HeaderUser;
