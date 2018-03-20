import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

class MenuBar extends Component {
  render() {
    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a'>
            <img src='assets/pm_logo.png' width='40px' /><span style={{marginLeft: '10px'}}>Podcast Machine</span>
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

export default MenuBar;