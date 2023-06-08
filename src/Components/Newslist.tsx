import React from "react";
import Link from "next/link";
import { newsListType } from "../../types/types";
const Newslist = ({ newsList, isLoading, isSinglePage }: newsListType) => {
  // checking for undefined
  if (newsList === undefined) {
    newsList = {
      id: "",
      title: "",
      description: "",
      author: "",
      publishedDate: 0,
      imgUrl: "",
      content: "",
    };
    return (
      <p className="font-bold text-center text-[red] text-[20px]">
        This data is not persistent so it,s state was lost when you moved back
      </p>
    );
  }
  //Destructuring the props that will be receuved from the parents
  const { id, imgUrl, title, description, author, publishedDate, content } =
    newsList;
  return (
    /* Depending on the isSinglePage props some elements are hidden and some css classes are dynamically changed */
    <figure
      className={
        !isLoading
          ? isSinglePage
            ? "customShadow flex flex-col w-[90%] m-auto mt-5"
            : `${id ? "customShadow aspect-auto" : ""}`
          : ""
      }
      key={id}
    >
      <h1
        className={`font-bold text-center px-2 py-4  ${
          isSinglePage ? "" : " text-ellipsis overflow-hidden whitespace-nowrap"
        }`}
      >
        {isLoading ? "" : title}
      </h1>
      {isSinglePage ? (
        <img
          src={imgUrl ? imgUrl! : "/defaultImage.jpg"}
          alt={title}
          className="w-full  object-cover"
        />
      ) : (
        ""
      )}
      {!isLoading ? (
        <figcaption className="px-2 py-2  relative">
          <h3
            className={`text-[18px]${
              isSinglePage
                ? ""
                : " text-ellipsis overflow-hidden whitespace-nowrap"
            }`}
          >
            {description}
          </h3>

          <p
            className={`text-[14px] sm:text-[16px] ${
              isSinglePage
                ? ""
                : " text-ellipsis overflow-hidden whitespace-nowrap"
            }flex gap-1 font-bold `}
          >
            {author ? author : ""}
          </p>
          {publishedDate ? (
            <h5 className="my-2">
              {" "}
              <span>Published:</span>{" "}
              {publishedDate <= 0 ? "Today" : `${publishedDate} days ago`}
            </h5>
          ) : (
            ""
          )}
          {isSinglePage ? <p className="text-[18px]">{content}</p> : ""}
        </figcaption>
      ) : (
        ""
      )}
      {!isSinglePage ? (
        isLoading ? (
          ""
        ) : (
          <Link
            passHref
            href={`Home/${id}`}
            className={`${
              id ? "bg-green-500" : ""
            } w-[95%] block text-center  py-2  text-white  mx-2 my-1 mb-2 h-10 rounded-md bottom-0 top-3`}
          >
            {id ? "Read Full News" : ""}
          </Link>
        )
      ) : (
        ""
      )}
    </figure>
  );
};

export default Newslist;
