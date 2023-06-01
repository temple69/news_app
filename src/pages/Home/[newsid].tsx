import Newslist from "@/Components/Newslist";
import { useAppSelector } from "@/app/hooks/hooks";
import { newsData } from "@/features/News/newsSlice";
import { useRouter } from "next/router";


const singleNewsPage = () => {
  const { newsList } = useAppSelector(newsData);
  const router = useRouter();
  const id = router.query.newsid!;//Getting the id  from the url
  const singleNews = newsList.find((news) => news.id === id);

  return (
    <Newslist newsList={singleNews!} isSinglePage={true}/>
  );
};

export default singleNewsPage;
