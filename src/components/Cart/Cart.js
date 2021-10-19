import React, { useState, useEffect } from "react";
import { Grid, Card, Header, Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import CartItem from "./CartItem/CartItem";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;
    
    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  
  console.log('Cart page', cart)
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                <Table.HeaderCell>Unit Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>

      <Grid.Column width={4}>
        <Card>
        <Card.Content textAlign="center">
          <Header as='h4'>Cart Summary</Header>
          <Card.Description>
            <Header as='h5' style={{marginBottom: '20px'}}>
              TOTAL: ({totalItems} items)
              <span>$ {totalPrice.toFixed(0)}</span>
            </Header>
          </Card.Description>
          <Button size='tiny' color='blue'>Proceed To Checkout</Button>
          </Card.Content>
        </Card>
      </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart);
