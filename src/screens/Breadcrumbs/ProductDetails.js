import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import Path from "./Path";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductFn = async () => {
      setShowLoader(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      if (data) {
        setProduct(data);
        setShowLoader(false);
      }
    };

    fetchProductFn();
  }, [id]);

  console.log("product", product);

  const getDiscountedPrice = (discountPercentage, price) => {
    let OriginalPrice = (price * 100) / (100 - discountPercentage);
    return OriginalPrice.toFixed();
  };

  return (
    <Fragment>
      <div className={styles.product_details_container}>
        <Path />
        {!showLoader && (
          <div className={styles.product}>
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className={styles.product_image}
            />
            <div>
              <span className={styles.product_title}>{product?.title}</span>
              <span className={styles.product_description}>
                {product?.description}
              </span>
              <span
                className={styles.product_price}
              >{`₹${product?.price}`}</span>
              <span
                className={styles.product_discounted_price}
              >{`₹${getDiscountedPrice(
                product?.discountPercentage,
                product?.price
              )}`}</span>
              <span
                className={styles.product_rating}
              >{`${product?.rating}⭐ | Category: ${product?.category} | Stock: ${product?.stock} | Brand: ${product?.brand}`}</span>
              <button className={styles.add_button}>Add To Cart</button>
            </div>
          </div>
        )}
        {showLoader && <p className={styles.loading}>Loading...</p>}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
