import React, { ReactNode } from "react";
import Navbar from "../Navbar";
interface ParentComponentProps {
  children: ReactNode;
}
//General Layout for All pages
const Layout = ({ children }: ParentComponentProps) => {
  return (
    <>
    
      <main className="min-w-[300px]">{children}</main>
    </>
  );
};

export default Layout;
