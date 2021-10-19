import React, { useState } from "react";
import { Table, Input, Button } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart
} from "../../../redux/Shopping/shopping-actions";

const CartItem = ({item, adjustQty, removeFromCart}) => {
  const [input, setInput] = useState(item.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };

  return (
    <>
    <Table.Row>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>${item.price.toFixed(0)}</Table.Cell>
      <Table.Cell>
        <label htmlFor="qty" style={{marginRight:'5px'}}>Qty</label>
        <Input
          min="1"
          type="number"
          id="qty"
          name="qty"
          value={input}
          onChange={onChangeHandler}
          style={{width:'80px'}}
        />
      </Table.Cell>
      <Table.Cell>
        <Button color="red" icon="trash" title="delete" onClick={() => removeFromCart(item.id)} />
      </Table.Cell>
    </Table.Row>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
