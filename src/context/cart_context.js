import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();

// const getLocalCartData = async () => {
//   await localStorage.getItem("DevCart").then(value => {
//     if (value == null) {
//       return [];
//     } else {
//       return JSON.parse(value);
//     }
//   })
// };


const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};




const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('DevCart')) || [];
    dispatch({ type: 'SET_CART', payload: storedCart });
  }, []);


  useEffect(() => {
    localStorage.setItem('DevCart', JSON.stringify(state.cart));
  }, [state.cart]);
  

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };


  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });

    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("DevCart", JSON.stringify(state.cart));
  }, [state.cart]);




  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };


  return (

    <CartContext.Provider value={{ ...state, addToCart, removeItem,clearCart,setDecrease,setIncrement }}>
      {children}
    </CartContext.Provider>

  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
