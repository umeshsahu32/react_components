import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { CartReducer, ProductReducer } from "./ShopReducer";

const Cart = createContext();
faker.seed(99);

const ShopContext = ({ children }) => {
  const products = [...Array(21)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7, 11, 15, 20]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const initialState = {
    products: products,
    cart: [],
  };

  const initialStateFilter = {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [productState, productDispatch] = useReducer(
    ProductReducer,
    initialStateFilter
  );

  console.log("productState", productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default ShopContext;

export const CartState = () => {
  return useContext(Cart);
};
