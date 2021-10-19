import React from "react";
import { Link } from "react-router-dom";
import { Menu, Header, Icon, Label } from 'semantic-ui-react'

import { connect } from "react-redux";

const Navbar = ({ products=[] }) => {

  var sum = 0;
  for (var i=0; i<products.length; i++) {
    if(products[i].qty) {
      sum += products[i].qty;
    }
  }
  
  return (
    <Menu style={{marginBottom: '20px'}}>
      <Menu.Item as={Link} to="/">
        <Header as='h3'>Home</Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        {sum ? <Menu.Item as={Link} to="/cart">
          <Icon name='cart' size='big' />
          <Label.Group circular>
            <Label as='a'>{sum}</Label>
          </Label.Group>
        </Menu.Item> : 
        <Menu.Item>
          <Icon name='cart' size='big' />
          <Label.Group circular>
            <Label as='a'>{sum}</Label>
          </Label.Group>
      </Menu.Item>}
      </Menu.Menu>
    </Menu>  
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Navbar);
