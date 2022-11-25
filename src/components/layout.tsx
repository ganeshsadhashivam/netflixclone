import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
export default function layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
