import { v4 as uuidv4 } from "uuid";
const getTotalNoOfPastDays = (dateString: string) => {
  const date = new Date(dateString);

  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();

  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
};
export const filteredDataHandler = (arrayOfArticles: any) => {
  if (arrayOfArticles.length === 0) {
    return []
  }
  
  
  const authorRegex=/(http|https|www)/
  const imageRegex=/\.(jpg|png|jpeg|svg)$/
  const extractNeededTypeData = arrayOfArticles.map((newsItem: any) => {
    const { title, description, author,content } = newsItem;
    const daysAgo = getTotalNoOfPastDays(newsItem.publishedAt);
    return {
      id: uuidv4(),
      authorFallBack: newsItem.source.name,
      title,
      description,
      author: authorRegex.test(author) ? newsItem.source.name as string :author?author: newsItem.source.name as string ,
      publishedDate: daysAgo,
      imgUrl: imageRegex.test(newsItem.urlToImage) ? newsItem.urlToImage : "",
      content
      
    };
  });
  return extractNeededTypeData;
};
export const getCurrentDateOfTheWeek = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const currentDay = currentDate.getDate();

  const currentDateString = `${currentYear}-${
    currentMonth < 10 ? "0" + currentMonth : currentMonth
  }-${currentDay < 10 ? "0" + currentDay : currentDay}`;
  return currentDateString
};
