import React, { Fragment, useState, useEffect } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./JobBoard.css";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function JobPosting({ url, by, time, title }) {
  const formattedTime = new Date(time * 1000).toLocaleString();

  return (
    <div className="custom__post" role="listitem">
      <h2 className="custom__post__title">
        <a
          className={url ? "" : "inactive__link"}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
      <span className="custom__post__metadata">
        By {by} · {formattedTime}
      </span>
    </div>
  );
}

const JobBoard = () => {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json()
        )
      )
    );
    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  console.log("itemIds", itemIds);

  return (
    <Fragment>
      <div className="background_body">
        <div className="custom__app">
          <h1 className="custom__title">Hacker News Jobs Board</h1>
          {itemIds === null || items.length < 1 ? (
            <p className="custom__loading">Loading...</p>
          ) : (
            <div>
              <div className="custom__items" role="list">
                {items.map((item) => (
                  <JobPosting key={item.id} {...item} />
                ))}
              </div>
              {items.length > 0 &&
                currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE <
                  itemIds.length && (
                  <button
                    className={`custom__load__more__button`}
                    disabled={fetchingDetails}
                    onClick={() => fetchItems(currentPage + 1)}
                  >
                    {fetchingDetails ? "loading..." : "Load more jobs"}
                  </button>
                )}
              <GoBackButton />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JobBoard;
