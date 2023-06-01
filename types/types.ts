 type newsDataType = {
    id: string;
    title: string;
    description: string;
    author: string;
    publishedDate: number;
    imgUrl: string;
    authorFallBack?: string;
  };
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
  export type newsListType = {
    newsList: newsDataType;
    isLoading?:boolean
  };
  export type PaginationType={
    pageCount:number
    handlePageClick:(page: {selected: number;})=>void,
    isArrayEmpty:boolean
}