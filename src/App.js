import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import LoginToggle from "./screens/ToggleUI/LoginToggle";
import TicTakToe from "./screens/TicTakToe/TicTakToe";
import Stepper from "./screens/Stepper/Stepper";
import ProgressBar from "./screens/ProgressBar/ProgressBar";
import Pagination from "./screens/Pagination/Pagination";
import MultiSelectInput from "./screens/MultiSelectInput/MultiSelectInput";
import LoginOtp from "./screens/LoginOtp/LoginOtp";
import GridLight from "./screens/GridLight/GridLight";
import DarkMode from "./screens/DarkMode/DarkMode";
import ShoppingCart from "./screens/ShoppingCart/ShoppingCart";
import FormValidation from "./screens/FormValidation/FormValidation";
import JobBoard from "./screens/JobBoard/JobBoard";
import Breadcrumbs from "./screens/Breadcrumbs/Breadcrumbs";
import ProductListing from "./screens/Breadcrumbs/ProductListing";
import ProductDetails from "./screens/Breadcrumbs/ProductDetails";
import PasswordGenerator from "./screens/PasswordGenerator/PasswordGenerator";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/TicTakToe" element={<TicTakToe />} />
      <Route path="/Stepper" element={<Stepper />} />
      <Route path="/ProgressBar" element={<ProgressBar />} />
      <Route path="/Pagination" element={<Pagination />} />
      <Route path="/MultiSelectInput" element={<MultiSelectInput />} />
      <Route path="/LoginOtp" element={<LoginOtp />} />
      <Route path="/GridLight" element={<GridLight />} />
      <Route path="/DarkMode" element={<DarkMode />} />
      <Route path="/LoginToggle" element={<LoginToggle />} />
      <Route path="/ShoppingCart" element={<ShoppingCart />} />
      <Route path="/JobBoard" element={<JobBoard />} />
      <Route path="/Breadcrumbs" element={<Breadcrumbs />} />
      <Route path="/Breadcrumbs/products" element={<ProductListing />} />
      <Route path="/Breadcrumbs/products/:id" element={<ProductDetails />} />
      <Route path="/PasswordGenerator" element={<PasswordGenerator />} />
      <Route path="/FormValidation" element={<FormValidation />} />
    </Routes>
  );
};

export default App;
