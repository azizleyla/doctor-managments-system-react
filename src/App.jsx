import { Suspense, lazy } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

const LoginPage = lazy(() => import("./pages/login"));
const DoctorsPage = lazy(() => import("./pages/doctors"));
const AddDoctorPage = lazy(() => import("./pages/doctors/add-doctor"));

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      ></Route>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route
            path="doctors"
            element={
              <Suspense fallback={<p>Loading..</p>}>
                <DoctorsPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/doctors/add-doctor"
            element={
              <Suspense fallback={<p>Loading..</p>}>
                <AddDoctorPage />
              </Suspense>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
