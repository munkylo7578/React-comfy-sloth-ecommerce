import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    // color and amount is the value that user have chosen
    const { id, color, amount, product } = action.payload;
    //Looking for the item matched the product that user have selected
    const tempItem = state.cart.find((i) => i.id === id + color);
    // if the item is already in the cart, go here
    if (tempItem) {
      // Change amount of product
      const tempCart = state.cart.map((cartItem) => {
        // if match the product that user have chosen
        if (cartItem.id === id + color) {
          // newAmount equal to the current amount in the cart plus amount that user have chosen
          let newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        }
        // do nothing just return the item
        else {
          return { ...cartItem };
        }
      });
      return { ...state, cart: tempCart };
    }
    // if user haven't picked that item, go here
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      let tempAmount = item.amount;
      if (item.id === id && value === "inc") {
        tempAmount += 1;
        if (tempAmount > item.max) {
          tempAmount = item.max;
        }
      }
      if (item.id === id && value === "dec") {
        tempAmount -= 1;
        if (tempAmount < 1) {
          tempAmount = 1;
        }
      }
      return { ...item, amount: tempAmount };
    });

    return { ...state, cart: tempCart };
  }
  if(action.type === COUNT_CART_TOTALS){
    const {total_items,total_amount} = state.cart.reduce((total,item)=>{
      total.total_items += item.amount
      total.total_amount += item.price * item.amount
      return total
    },{
      total_items:0,
      total_amount: 0
    })
   
    return{...state,total_items,total_amount}
  }
  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
