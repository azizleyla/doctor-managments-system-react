import { Suspense, lazy } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));

const DoctorsPage = lazy(() => import("./pages/doctors"));
const AddDoctorPage = lazy(() => import("./pages/doctors/add-doctor"));
const PatientsPage = lazy(() => import("./pages/patients"));

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />}></Route>

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
          <Route
            path="/patients"
            element={
              <Suspense fallback={<p>Loading..</p>}>
                <PatientsPage />
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
