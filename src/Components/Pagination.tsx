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
        previousLabel={"← "}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={pageCount}
      />
    </div>
  );
};

export default Pagination;
