import React from "react";
import Link from "next/link";
import { newsListType } from "../../types/types";

const Newslist = ({ newsList, isLoading, isSinglePage }: newsListType) => {
  //Destructuring the props that will be receuved from the parents
  const { id, imgUrl, title, description, author, publishedDate, content } =
    newsList;
  return (
    /* Depending on the isSinglePage props some elements are hidden and some css classes are dynamically changed */
    <figure
      className={
        isSinglePage
          ? "bg-red-500 customShadow flex flex-col w-[80%] m-auto mt-5"
          : "customShadow aspect-auto"
      }
      key={id}
    >
      <h1 className="font-bold text-center px-2 py-4">{title ? title : ""}</h1>
      {!isLoading ? (
        <img
          src={imgUrl ? imgUrl! : "/defaultImage.jpg"}
          alt={title}
          className="w-full  object-cover"
        />
      ) : (
        ""
      )}
      {!isLoading ? (
        <figcaption className="px-2 py-2 relative">
          <p>{description ? description : ""}</p>

          <p className="text-[14px] sm:text-[12px] flex gap-1 font-bold ">
            {author ? author : ""}
          </p>
          <h5 className="my-2">
            {" "}
            <span>Published:</span>{" "}
            {publishedDate
              ? publishedDate <= 0
                ? "Today"
                : `${publishedDate} days ago`
              : ""}
          </h5>
          {isSinglePage ? <p>{content ? content : ""}</p> : ""}
          {!isSinglePage ? (
            isLoading ? (
              ""
            ) : (
              <button className="bg-green-500 w-[90%]  text-white mx-2 my-2 h-10 rounded-md bottom-0 top-3">
                <Link passHref href={`Home/${id}`}>
                  See More Details
                </Link>{" "}
              </button>
            )
          ) : (
            ""
          )}
        </figcaption>
      ) : (
        ""
      )}
    </figure>
  );
};

export default Newslist;
