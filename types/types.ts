 //declaring types for the rendered news article
 type newsDataType = {
    id: string;
    title: string;
    description: string;
    author: string;
    publishedDate: number;
    imgUrl: string;
    content:string
  };
  //Declaring types for the initial Redux State
  export type NewsState = {
    newsList: newsDataType[];
    loading: boolean;
    errorMessage: string;
    error: boolean;
    newsSources: {
      id: string;
      name: string;
      description: string;
    }[];
  };
  // Declaring types for the newsList Component
  export type newsListType = {
    newsList: newsDataType;
    isLoading?:boolean,
    isSinglePage?:boolean
  };
  //Declaring types for the pagination component
  export type PaginationType={
    pageCount:number
    handlePageClick:(page: {selected: number;})=>void,
    isArrayEmpty:boolean
}
//Declaring types for the news component
export type newsType = {
  isNotNews: boolean;
};