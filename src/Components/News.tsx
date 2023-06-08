//Redux Toolkit Hooks
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";

//React Events
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
//Function from  redux store
import {
  newsData,
  getAllNews,
  getAllNewsSources,
} from "@/features/News/newsSlice";
//React Components
import Newslist from "./Newslist";
import Pagination from "./Pagination";
import Modal from "./Modal/Modal";
import { useRouter } from "next/router";
//Constants
const PER_PAGE = 10;
//User-defined types
import { newsType } from "../../types/types";

const News = ({ isNotNews }: newsType) => {
  //State management from redux toolkit
  const dispatch = useAppDispatch();
  const { loading, newsList, newsSources, errorMessage, error } =
    useAppSelector(newsData);
  const searchRef = useRef<HTMLInputElement>(null);
  //getting article id from route parameters  to impement dynamic fetching
  const router = useRouter();
  const articleId = router.query.articlesTopic! as string;

  //Custom state Managements
  const [currentPage, setCurrentPage] = useState(0);
  const [newsSource, setNewsSource] = useState<string>("");
  // This functions get the value of the select html element
  const filterNewsBySourceHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setNewsSource(value);
  };
  /* if article id is defined This hook Fetches data using redux toolkit state management functions when the component mounts and refetches if there is a change in html select element  if undefined uses fetches data dynamically*/
  useEffect(() => {
    let articletopic = "worldnews";
    dispatch(getAllNewsSources(newsSource));
    if (articleId === undefined && newsSource === "") {
      dispatch(getAllNews(articletopic));
    } else {
      articleId;
      dispatch(getAllNews(articleId));
    }
  }, [newsSource, articleId, dispatch]);
  /* This function is used by the react-paginate component to know the current page number index that was clicked by user */

  const handlePageClick = (page: { selected: number }) => {
    setCurrentPage(page.selected);
  };
  //Operations to determine the number of news articles per page
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(newsList.length / PER_PAGE);
  const CurrentPageData = newsList.slice(offset, offset + PER_PAGE);
  /* Function that executes when the form is submiited  if the value of input is undefined alerts user to type in a value else it fetches data with the value */
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    let title = searchRef.current?.value as string;
    if (title) {
      title = title.toLowerCase();
      title = title.trim();
      dispatch(getAllNews(title));
    } else {
      alert("Please input topic to search");
    }
    searchRef.current!.value = "";
  };

  return (
    /*Css Classes are updated dynamically based on the `isNotNews` state  */
    <section className="px-10 pt-4 min-w-[350px] max-w-[100%]">
      {/* Renders the modal component depending on the state */}
      {loading ? <Modal /> : ""}
      <form
        className={
          isNotNews
            ? "grid grid-cols-1"
            : `grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10`
        }
        onSubmit={submitHandler}
      >
        {isNotNews ? (
          ""
        ) : (
          <label htmlFor="">
            Which Topic Would You like to Read About Today
            <input
              type="text"
              className="border block w-full sm:w-full md:w-[90%] h-10 rounded-lg px-2"
              ref={searchRef}
            />
            <button className="h-10 border bg-green-600 text-white rounded-lg w-full sm:w-full md:w-[90%] my-3">
              Get-News-Article
            </button>
          </label>
        )}
        <label>
          Filter By News Source:
          <select
            className={
              isNotNews
                ? "border w-full mb-6 block h-10 rounded-lg"
                : "border w-full sm:w-full md:w-[90%] my-3 block h-10 rounded-lg px-2 relative"
            }
            onChange={filterNewsBySourceHandler}
          >
            <option value=""></option>
            {newsSources.length === 0 ? (
              <option value="" key={1}>
                No Sources Found Yet
              </option>
            ) : (
              newsSources.map((source) => (
                <option
                  key={source.id}
                  value={source.id}
                  title={source.description}
                >
                  {source.name}
                </option>
              ))
            )}
          </select>
        </label>
      </form>

      <div className=" grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3 mb-4">
        {CurrentPageData.length === 0 ? (
          <p className="text-center text-[20px] text-[red]">{`${errorMessage}`}</p>
        ) : (
          CurrentPageData.map((article) => (
            <Newslist newsList={article} isLoading={loading} key={article.id} />
          ))
        )}
      </div>

      {loading ? (
        ""
      ) : !error ? (
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          isArrayEmpty={error}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default News;
