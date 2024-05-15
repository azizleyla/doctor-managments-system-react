import { Suspense, useState } from "react";
import "./App.css";
import Doctors from "./components/doctors";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="dashboard" element={<Layout />}>
          <Route
            path="doctors"
            element={
              <Suspense fallback={<p>Loading..</p>}>
                <Doctors />
              </Suspense>
            }
          />
        </Route>
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
