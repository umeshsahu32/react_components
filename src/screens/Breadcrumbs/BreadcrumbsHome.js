import React, { Fragment, useState, useEffect } from "react";
import styles from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";

const BreadcrumbsHome = () => {
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const fetchProducts = async () => {
    setShowLoader(true);
    const res = await fetch(`https://dummyjson.com/products?limit=10`);
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
      <div className={styles.pagination__body}>
        {showLoader && <p>Loading....</p>}
        <div>
          {products.length > 0 && !showLoader && (
            <div className={styles.products}>
              {products.slice(0, 6).map((prod) => {
                return (
                  <Link
                    to={`/Breadcrumbs/products/${prod.id}`}
                    className={styles.products__single}
                    key={prod.id}
                  >
                    <img src={prod.thumbnail} alt={prod.title} />{" "}
                    <span>{prod.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BreadcrumbsHome;
