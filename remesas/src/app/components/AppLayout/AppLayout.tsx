import React from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Navbar from "@components/Navbar/Navbar";
import "./style.scss";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__content">
        <Navbar />
        <div className="app-layout__content__body">{children}</div>
      </div>
    </div>
  );
}
