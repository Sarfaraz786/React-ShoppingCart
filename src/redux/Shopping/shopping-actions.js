import * as actionTypes from "./shopping-types";

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeToCart = (itemID, qty) => {
  if(qty === 1) {
   return removeFromCart(itemID) 
  }
  return {
    type: actionTypes.REMOVE_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const adjustItemQty = (itemID, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
    },
  };
};

export const fetchProduct = (data) => {
  return {
    type: actionTypes.PRODUCT_LIST,
    payload: {
      data: data
    },
  };
};
