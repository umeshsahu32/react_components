import React, { Fragment } from "react";
import ShopHeader from "./ShopComponents/ShopHeader";
import ShopHome from "./ShopComponents/ShopHome";
import Wishlist from "./ShopComponents/Wishlist";
import ShopContext from "./ShopContext/ShopContext";
import { useLocation } from "react-router-dom";

const ShopCart = () => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <ShopContext>
        <ShopHeader />
        {pathname === "/ShopCartHome" && <ShopHome />}
        {pathname === "/Wishlist" && <Wishlist />}
      </ShopContext>
    </Fragment>
  );
};

export default ShopCart;
