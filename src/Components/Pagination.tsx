import React from "react";
import ReactPaginate from "react-paginate";
import { PaginationType } from "../../types/types";

const Pagination = ({
  pageCount,
  handlePageClick,
  isArrayEmpty,
}: PaginationType) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={!isArrayEmpty ? "← " : ""}
        nextLabel={!isArrayEmpty ? "→" : ""}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={!isArrayEmpty ? "pagination" : ""}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={!isArrayEmpty ? "pagination__link--disabled" : ""}
        activeClassName={"pagination__link--active"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={pageCount}
      />
    </div>
  );
};

export default Pagination;
