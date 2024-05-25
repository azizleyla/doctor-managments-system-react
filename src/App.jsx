import { Suspense, lazy } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./ProtectedRoute";
import SkeletonLoading from "./components/shared/skeleton/SkeletonLoading";
import CardSkeleton from "./pages/doctors/CardSkeleton";

const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));
const DoctorsPage = lazy(() => import("./pages/doctors"));
const AddDoctorPage = lazy(() => import("./pages/doctors/add-doctor"));
const PatientsPage = lazy(() => import("./pages/patients"));

function App() {
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Routes>
        <Route
          path="/auth"
          element={
            <ProtectedRoute isAuthPage>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="doctors"
            element={
              <Suspense
                fallback={
                  <SkeletonLoading count={5}>
                    <CardSkeleton />
                  </SkeletonLoading>
                }
              >
                <DoctorsPage />
              </Suspense>
            }
          />
          <Route path="doctors/add-doctor" element={<AddDoctorPage />} />
          <Route path="patients" element={<PatientsPage />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Suspense>
  );
}

export default App;
