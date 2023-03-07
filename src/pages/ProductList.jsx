import React, { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import CardTotal from "../components/CardTotal";
import axios from "axios";

const ProductList = () => {
  const url = process.env.REACT_APP_API_URL;
  console.log(url);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(false);
      const { data } = await axios(url);
      setProducts(data);
    } catch (error) {
      setErrorState(true);
    }
  };

  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-3">
      <div className={"bg-light d-sm-block d-md-flex"}>
        {loading ? (
          <p className="text-center text-danger w-100">Loading....</p>
        ) : products.length > 0 ? (
          <>
            <article id="product-panel" className="col-md-5">
              {products.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    getProducts={getProducts}
                  />
                );
              })}
            </article>
            <article className="col-md-5 m-3">
              <CardTotal products={products} />
            </article>
          </>
        ) : (
          <p className="text-center text-danger w-100">No products data...</p>
        )}
        {errorState && (
          <p className="text-center text-danger w-100">Error ...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
