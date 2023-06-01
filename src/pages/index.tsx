import Image from "next/image";
import { Inter } from "next/font/google";
import News from "@/Components/News";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <News isNotNews={false}/>;
}
