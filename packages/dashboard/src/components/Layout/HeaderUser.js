import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
import { useTranslation } from 'react-i18next';

const MenuDrop = ({ logout }) => {
  const { t } = useTranslation();
  return (
    <Menu>
      <Menu.Item onClick={logout}>
        <Icon type="logout" />
        {t('common.logout')}
      </Menu.Item>
    </Menu>
  );
};
MenuDrop.propTypes = {
  logout: PropTypes.func,
};

const HeaderUser = ({ logout, user }) => (
  <Dropdown
    overlay={() => <MenuDrop logout={logout} />}
    placement="bottomRight"
  >
    <div className="custom-header-user">
      <Avatar icon="user" />
      {user && (
        <span style={{ paddingLeft: 8 }}>{user.name || user.username}</span>
      )}
    </div>
  </Dropdown>
);

HeaderUser.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};

HeaderUser.displayName = 'HeaderUser';

export default HeaderUser;
