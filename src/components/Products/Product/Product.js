import React from "react";
import { Button, Input, Table } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import {
  addToCart,
  removeToCart,
} from "../../../redux/Shopping/shopping-actions";

const Product = ({ product, addToCart, removeToCart, cart }) => {

  return (       
    <Table.Row>
      <Table.Cell>{product.name}</Table.Cell>
      <Table.Cell style={{textTransform:"capitalize"}}>{product.type}</Table.Cell>
      <Table.Cell>${product.price.toFixed(0)}</Table.Cell>
      <Table.Cell>
        <Button size='tiny' color='red' onClick={() => removeToCart(product.id, product.qty)}>-</Button>
        <Input textAlign="center" value={product.qty} style={{width:'50px', margin: '0 5px'}} />
        <Button size='tiny' color='blue' onClick={() => addToCart(product.id)}>+</Button>
      </Table.Cell>
    </Table.Row>      
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    removeToCart: (id, qty) => dispatch(removeToCart(id, qty)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
