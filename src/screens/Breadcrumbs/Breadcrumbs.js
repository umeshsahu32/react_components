import React from "react";
import { Fragment } from "react";
import styles from "./Breadcrumbs.module.css";
import BreadcrumbsHome from "./BreadcrumbsHome";
import { Link } from "react-router-dom";
import Path from "./Path";

const Breadcrumbs = () => {
  return (
    <Fragment>
      <div className={styles.breadcrumbs_body}>
        <div className={styles.breadcrumbs_container}>Trending Products</div>
        <Path />
        <BreadcrumbsHome />
        <div className={styles.button_container}>
          <Link to="/Breadcrumbs/products">
            <button className={styles.all_product_btn}>All Products</button>
          </Link>
          <Link to="/">
            <button
              className={`${styles.all_product_btn} ${styles.go_back_button}`}
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Breadcrumbs;
