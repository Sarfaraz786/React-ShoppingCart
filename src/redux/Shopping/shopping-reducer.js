import * as actionTypes from "./shopping-types";

// From this url get below all products https://muigrocery.free.beeceptor.com/groceries

const INITIAL_STATE = {
  products: [],
  cart: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
	case actionTypes.PRODUCT_LIST:
		return {
			...state,
			products: action.payload.data
		}
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
		: [...state.cart, { ...item, qty: 1 }],
		products: state.products.map((product) =>
			product.id === action.payload.id
			? { ...product, qty: product.qty + 1 }
			: product
		)
          
      };

    case actionTypes.REMOVE_TO_CART:
        // Great Item data from products array
        const rItem = state.products.find(
          (product) => product.id === action.payload.id
        );
        // Check if Item is in cart already
        const inRCart = state.cart.find((rItem) =>
          rItem.id === action.payload.id ? true : false
        );
  
        return {
			...state,
			cart: inRCart
			  ? state.cart.map((rItem) =>
				  rItem.id === action.payload.id
					? { ...rItem, qty: rItem.qty - 1 } 
					: rItem
				)
			  : [...state.cart, { ...rItem, qty: 1 }],
			  
			products: state.products.map((product) =>
			  product.id === action.payload.id
			  ? { ...product, qty: product.qty-1 < 0 ? 0 : product.qty - 1 }
			  : product
		  )
        };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
		products: state.products.filter((item) => item.id !== action.payload.id),
      };
	case actionTypes.ADJUST_ITEM_QTY:
	return {
		...state,
		cart: state.cart.map((item) =>
		item.id === action.payload.id
			? { ...item, qty: +action.payload.qty }
			: item
		),
	};
  default:
    return state;
  }
};

export default shopReducer;
