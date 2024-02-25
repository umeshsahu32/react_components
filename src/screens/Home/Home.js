import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <h4 className="mt-5 text-center">Home Page</h4>
      <div className="nav_links">
        <Link to="/LoginToggle"> Toggle UI</Link>
        <Link to="/Pagination">Pagination</Link>
        <Link to="/MultiSelectInput">Multi Select Input</Link>
        <Link to="/ProgressBar">Progress Bar</Link>
        <Link to="/TicTakToe">Tic Tak Toe</Link>
        <Link to="/GridLight">Grid Light</Link>
        <Link to="/Stepper">Stepper</Link>
        <Link to="/JobBoard">Job Board</Link>
        <Link to="/FormValidation">Form Validation</Link>
        <Link to="/LoginOtp">Login Otp</Link>
        <Link to="/PasswordGenerator">Password Generator</Link>
        <Link to="/Breadcrumbs">Breadcrumbs</Link>
        <Link to="/DragAndDrop">Drag & Drop</Link>
        <Link to="/ShopCartHome">Shopping Cart</Link>
      </div>
    </Fragment>
  );
};

export default Home;
