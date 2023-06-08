import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import {
  filteredDataHandler,
  getCurrentDateOfTheWeek,
} from "../../../utils/utilities";
import { NewsState } from "../../../types/types";
//initial Redux State
const initialState: NewsState = {
  newsList: [
    {
      id: "",
      title: "",
      description: "",
      author: "",
      publishedDate: 0,
      imgUrl: "",
      content: "",
    },
  ],
  loading: false,
  error: false,
  errorMessage: "",
  newsSources: [
    {
      id: "",
      name: "",
      description: "",
    },
  ],
};
let isSourceDataPresent = false; //A boolean which changes state if select html elemeny has a value
const currentDate = getCurrentDateOfTheWeek(); // function which returns current day of the  week
let isRequestExceeded = false;
/* Redux Function that will be called using dispatch hook which Fetches latest news articles with data provided from the news api and returns the  response from the api */
export const getAllNews = createAsyncThunk("news", async (topic: string) => {
  const response = await fetch(
    `http://newsapi.org/v2/everything?q=${topic}&from=2023-05-31&to=${currentDate}&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const newsData = await response.json();
  if (response.status === 429) {
    isRequestExceeded = true;
    return isRequestExceeded;
  }
  isRequestExceeded = false;
  return newsData;
});
/* Redux Function that will be called using dispatch hook which depends on data provided to fetch results and return all sources of news to the user when the data provided is undefined and returns results from the news api when queried with the data to get all news articles from the user selected source the function also checks if there a data provided and modifies local State variable ` isSourceDataPresent`  */
export const getAllNewsSources = createAsyncThunk(
  "sources",
  async (sourceData: string) => {
    const response = await fetch(
      sourceData
        ? `http://newsapi.org/v2/everything?sources=${sourceData}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
        : `http://newsapi.org/v2/top-headlines/sources?&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (sourceData) {
      isSourceDataPresent = true;
    } else {
      isSourceDataPresent = false;
    }
    const newsSources = await response.json();
    if (response.status === 429) {
      isRequestExceeded = true;
      return isRequestExceeded;
    }
    isRequestExceeded = false;
    return newsSources;
  }
);
//Error Handling message sent to user when request limit is exceeded
let exceedRequestErrorMessage =
  "Hello User Your Requests Limit has been exceeded For Today Please Come Back in the next 24 Hours";
//Empty array sent when no response is gotten from the api for the news title queried and when request limit is exceeded
let emptyArray: [] = [];
//redux create slice function where one can define update redux state with functions
const newsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //sets loading state to true when the Promise returned by createAsyncThunk function is Pending
      .addCase(getAllNews.pending, (state) => {
        state.loading = true;
      })
      //updates redux state when promise returned by createAsyncThunk function is Fulfililed
      .addCase(getAllNews.fulfilled, (state, { payload }) => {
        const { articles } = payload; //Destructuring articles from the payload results of queried data returned
        const { totalResults } = payload; //Destructuring totalResults from the payload results of queried data returned

        if (totalResults === 0 && articles.length === 0) {
          //updates error,error message and newslist state if no article is found
          state.error = true;
          state.errorMessage = `No Articles found`;
          state.newsList = emptyArray;
        } else if (isRequestExceeded) {
          //updates error,loading,error message and newslist state request limit is exceeded
          const filteredData = filteredDataHandler(emptyArray);
          state.newsList = filteredData;
          state.errorMessage = exceedRequestErrorMessage;
          state.error = true;
          state.loading = false;
        } else {
          //updates error,loading and newslist state if result for the queried data from the api exists
          const filteredData = filteredDataHandler(articles);
          (state.loading = false), (state.newsList = filteredData);
          state.error = false;
        }
      })
      //updates state when promise returned by createAsyncThunk function is rejected
      .addCase(getAllNews.rejected, (state) => {
        (state.loading = false), (state.error = true);
      })
      //updates state when promise returned by createAsyncThunk function is pending for the getAllNewsSources Function
      .addCase(getAllNewsSources.pending, (state) => {
        state.loading = true;
      })
      //updates redux state when promise returned by createAsyncThunk function is Fulfililed the getAllNewsSources Function
      .addCase(getAllNewsSources.fulfilled, (state, { payload }) => {
        state.loading = false; //sets loadind state to false
        if (isSourceDataPresent) {
          const { articles } = payload;
          const { totalResults } = payload;
          if (totalResults === 0 && articles.length === 0) {
            //updates error,error message and newslist state if no article is found
            state.error = true;
            state.errorMessage = `No Articles found`;
            state.newsList = emptyArray;
          } else {
            //if results exist for the queried data from the api results are passed to filteredDataHandler Function which operates on data and returns it newslist state is updated with the returned data
            const filteredData = filteredDataHandler(articles);
            state.newsList = filteredData;
          }
        } else if (isRequestExceeded) {
          //updates error,loading,error message and newslist state request limit is exceeded
          state.newsSources = emptyArray;
          state.errorMessage = exceedRequestErrorMessage;
          state.error = true;
          state.loading = false;
        } else {
          //updates newsSources state if no data was queried with the api
          const { sources } = payload;
          state.newsSources = sources;
        }
      })
      //updates state when promise returned by createAsyncThunk function is rejected
      .addCase(getAllNewsSources.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = true);
      });
  },
});
export const newsData = (state: RootState) => state.newsData; // exporting redux state so it can be accesed by react components
export default newsSlice.reducer; //exporting reducer so as to register in in the reux store
