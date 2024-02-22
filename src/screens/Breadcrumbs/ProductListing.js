import React, { Fragment, useState, useEffect } from "react";
import styles from "./Breadcrumbs.module.css";
import { useNavigate, Link } from "react-router-dom";
import Path from "./Path";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const goButtonClickHandler = () => {
    navigate(-1);
  };

  const fetchProducts = async () => {
    setShowLoader(true);
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    console.log("frontend", data);

    if (data && data.products) {
      setProducts(data.products);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // JSX START
  return (
    <Fragment>
      <div className={styles.breadcrumbs_body}>
        <Path />
        <div className={styles.breadcrumbs_container}>All Products</div>
        {showLoader && <p>Loading....</p>}
        <div>
          {products.length > 0 && !showLoader && (
            <div className={styles.products}>
              {products.slice(0, 54).map((prod) => {
                return (
                  <Link
                    to={`/Breadcrumbs/products/${prod.id}`}
                    className={styles.products__single}
                    key={prod.id}
                  >
                    <img src={prod.thumbnail} alt={prod.title} />{" "}
                    {/* alt is imp */}
                    <span>{prod.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.button_container}>
          <button
            onClick={goButtonClickHandler}
            className={`${styles.all_product_btn} ${styles.go_back_button}`}
          >
            Go Back
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductListing;
