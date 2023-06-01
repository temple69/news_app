import { v4 as uuidv4 } from "uuid";
// Function which calculates the number of pastdays from the current day with the parameter gotten from the api
const getTotalNoOfPastDays = (dateString: string): number => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
};
export const filteredDataHandler = (arrayOfArticles: any) => {
  if (arrayOfArticles.length === 0) {
    //checks if length of array is 0 and returns empty array if true
    return [];
  }
  const authorRegex = /(http|https|www)/; //Regular expression to test for author name which contains either http,https and www
  const imageRegex = /\.(jpg|png|jpeg|svg)$/; //Regular expression to test for urlToImage name which ends with either .jpg,.jpeg,.svg and .png

  const extractNeededTypeData = arrayOfArticles.map((newsItem: any) => {
    //Maps and returns value needed for the newslist component type
    const { title, description, author, content } = newsItem;
    const daysAgo = getTotalNoOfPastDays(newsItem.publishedAt);
    return {
      id: uuidv4(),
      authorFallBack: newsItem.source.name,
      title,
      description,
      author: authorRegex.test(author)
        ? (newsItem.source.name as string)
        : author
        ? author
        : (newsItem.source.name as string),
      publishedDate: daysAgo,
      imgUrl: imageRegex.test(newsItem.urlToImage) ? newsItem.urlToImage : "",
      content,
    };
  });
  return extractNeededTypeData;
};
//Function which gets the current day of the week
export const getCurrentDateOfTheWeek = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const currentDay = currentDate.getDate();

  const currentDateString = `${currentYear}-${
    currentMonth < 10 ? "0" + currentMonth : currentMonth // if current month is less than 10 add 0 in front
  }-${currentDay < 10 ? "0" + currentDay : currentDay}`; // if current Day is less than 10 add 0 in front
  return currentDateString;
};
