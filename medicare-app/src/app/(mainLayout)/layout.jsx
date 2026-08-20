import MainFooter from "@/app/ui/Footer";
import MainNavbar from "@/app/ui/Navbar";
import React from "react";

const Mainlayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar></MainNavbar>
      <main className="flex-grow min-h-screen">{children}</main>
      <MainFooter></MainFooter>
    </div>
  );
};

export default Mainlayout;
