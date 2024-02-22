import React, { Fragment, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./GridLight.css";

// ? CELL COMPONENT
const Cell = ({ filled, onClick, isDisabled, label }) => {
  return (
    <button
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={filled ? "grid_cell grid_cell_activated" : "grid_cell"}
    />
  );
};

const GridLight = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  // config.flat(1) ==> [1,1,1,1,0,1,1,1,1]

  // ? DEACTIVATE CELL FUNCTION
  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  // ? ON CELL CLICK HANDLER
  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    //!DEACTIVATION OF CELLS
    console.log(config.flat(1));
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  // ? JSX START
  return (
    <Fragment>
      <h4 className="my-4">Grid Light UI</h4>
      <div className="grid_wrapper">
        <div
          className="grid_light"
          style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr )` }}
        >
          {config.flat(1).map((value, index) => {
            return value ? (
              <Cell
                key={index}
                label={`Cell ${index}`}
                filled={order.includes(index)}
                onClick={() => activateCells(index)}
                isDisabled={order.includes(index) || isDeactivating}
              />
            ) : (
              <span></span>
            );
          })}
        </div>
      </div>
      <GoBackButton />
    </Fragment>
  );
};

export default GridLight;
