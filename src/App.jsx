import { Suspense, lazy, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout";

const DoctorsList = lazy(() => import("./components/doctors"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          element={<Navigate to="/dashboard" replace="true" />}
        />
        <Route path="dashboard" element={<Layout />}>
          <Route
            path="doctors"
            element={
              <Suspense fallback={<p>Loading..</p>}>
                <DoctorsList />
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
