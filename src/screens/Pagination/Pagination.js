import React, { Fragment, useEffect, useState } from "react";
import "./Pagination.css";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const NUM_PRODUCT_ON_PAGE = 10;

const Pagination = () => {
  // FRONTEND DRIVEN CODE START
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoaderBack, setShowLoaderBack] = useState(false);

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

  console.log("products-->", products);

  const selectPageHandler = (selectedPage) => {
    console.log("selectedPage", selectedPage);

    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / NUM_PRODUCT_ON_PAGE &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  // FRONTEND DRIVEN CODE END
  // BACKEND DRIVEN CODE START
  const [productsBack, setProductsBack] = useState([]);
  const [pageBack, setPageBack] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProductsBackend = async () => {
    setShowLoaderBack(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${
        pageBack * NUM_PRODUCT_ON_PAGE - NUM_PRODUCT_ON_PAGE
      }`
    );
    const data = await res.json();

    console.log("backend", data);

    if (data && data.products) {
      setProductsBack(data.products);
      setTotalPages(data.total / NUM_PRODUCT_ON_PAGE);
      setShowLoaderBack(false);
    }
  };

  useEffect(() => {
    fetchProductsBackend();
  }, [pageBack]);

  const selectPageHandlerBack = (selectedPage) => {
    console.log("selectedPage", selectedPage);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== pageBack
    ) {
      setPageBack(selectedPage);
    }
  };

  // BACKEND DRIVEN CODE END

  return (
    <Fragment>
      <div className="pagination__body">
        <h4>Pagination UI Frontend Driven </h4>

        {showLoader && <p>Loading....</p>}

        <div>
          {products.length > 0 && !showLoader && (
            <div className="products">
              {products
                .slice(
                  page * NUM_PRODUCT_ON_PAGE - NUM_PRODUCT_ON_PAGE,
                  page * NUM_PRODUCT_ON_PAGE
                )
                .map((prod) => {
                  return (
                    <span className="products__single" key={prod.id}>
                      <img src={prod.thumbnail} alt={prod.title} />{" "}
                      {/* alt is imp */}
                      <span>{prod.title}</span>
                    </span>
                  );
                })}
            </div>
          )}

          {products.length > 0 && (
            <div className="pagination">
              <span
                onClick={() => selectPageHandler(page - 1)}
                className={page > 1 ? "" : "pagination__disable"}
              >
                ◀
              </span>

              {[...Array(products.length / NUM_PRODUCT_ON_PAGE)].map((_, i) => {
                return (
                  <span
                    key={i}
                    className={page === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandler(i + 1)}
                  >
                    {i + 1}
                  </span>
                );
              })}

              <span
                onClick={() => selectPageHandler(page + 1)}
                className={
                  page < products.length / NUM_PRODUCT_ON_PAGE
                    ? ""
                    : "pagination__disable"
                }
              >
                ▶
              </span>
            </div>
          )}
        </div>
        <GoBackButton />
        <h4 className="mt-4">Pagination UI Backend Driven </h4>
        {showLoaderBack && <p>Loading....</p>}
        <div>
          {productsBack.length > 0 && !showLoaderBack && (
            <div className="products">
              {productsBack.map((prod) => {
                return (
                  <span className="products__single" key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title} />{" "}
                    {/* alt is imp */}
                    <span>{prod.title}</span>
                  </span>
                );
              })}
            </div>
          )}

          {productsBack.length > 0 && (
            <div className="pagination">
              <span
                onClick={() => selectPageHandlerBack(pageBack - 1)}
                className={pageBack > 1 ? "" : "pagination__disable"}
              >
                ◀
              </span>

              {[...Array(totalPages)].map((_, i) => {
                return (
                  <span
                    key={i}
                    className={pageBack === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandlerBack(i + 1)}
                  >
                    {i + 1}
                  </span>
                );
              })}

              <span
                onClick={() => selectPageHandlerBack(pageBack + 1)}
                className={pageBack < totalPages ? "" : "pagination__disable"}
              >
                ▶
              </span>
            </div>
          )}
        </div>

        <GoBackButton />
      </div>
    </Fragment>
  );
};

export default Pagination;
