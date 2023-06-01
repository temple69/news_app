import React, { FC, ReactNode } from "react";
import Navbar from "../Navbar";
interface ParentComponentProps {
  children: ReactNode;
}
//General Layout for All pages
const Layout = ({ children }: ParentComponentProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
