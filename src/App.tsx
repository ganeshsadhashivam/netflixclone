import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout";
import Browse from "./pages/browse";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>default view</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />}>
          <Route index element={<h1>latest</h1>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppRouter />;
}
