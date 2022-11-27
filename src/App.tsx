import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./common/auth";
import Layout from "./components/layout";
import Browse from "./pages/browse";
import Login from "./pages/login";
import Profile from "./pages/profile";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [user]);
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // } else {
  //   return children;
  // }
}

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Profile />} />
          <Route path="ManageProfiles" element={<Profile edit />} />

          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>

          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>latest</h1>} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
