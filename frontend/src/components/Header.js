import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Menu style={{ marginTop: '0px', }} size={'large'}>
      <Menu.Item><Link to='/UI-project'>Azure UI</Link></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item><Link to='/UI-project/frontend/helloworld'><Icon name='tasks' />Hello World!</Link></Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};