import Link from "next/link";
import React from "react";
import { useState } from "react";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "News", link: "/News" },
    { name: "Science", link: "/Science" },
    { name: "Innovation", link: "/Innovation" },
    { name: "Technology", link: "/Technology" },
    { name: "Blockchain", link: "/Blockchain" },
  ];
  return (
    <>
      <header className=" bg-red-500 min-w-[350px] flex w-full  justify-between items-start lg:items-center text-white py-3 gap-2 px-4">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
          <h1 className="font-bold text-[16px] py-4 sm:text-[30px]">
            Your No 1 online Newspaper
          </h1>
          <div className="flex order-2 ">
            <ul
              className={`text-[20px]   gap-3  lg:flex   ${
                toggle ? "flex flex-col  justify-center w-full pt-2" : "hidden"
              }`}
            >
              {links.map((link) => (
                <li>
                  <Link
                    href={link.link}
                    passHref
                    onClick={() => {
                      setToggle(false);
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="lg:hidden py-4 "
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Toggle
        </button>
      </header>
    </>
  );
};

export default Navbar;
