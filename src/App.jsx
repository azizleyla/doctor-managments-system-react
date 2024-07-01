import { Suspense, lazy } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./ProtectedRoute";
import DynamicImport from "./utils/DynamicImport";
import EditDoctorPage from "./pages/doctors/edit-doctor";

const ProfilePage = lazy(() => import("./pages/profile"));
const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));
const DoctorsPage = lazy(() => import("./pages/doctors"));
const AddDoctorPage = lazy(() => import("./pages/doctors/add-doctor"));
const PatientsPage = lazy(() => import("./pages/patients"));

function App() {
  return (
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
          element={<DynamicImport component={DoctorsPage} />}
        />

        <Route
          path="profile"
          element={<DynamicImport component={ProfilePage} />}
        />

        <Route
          path="doctors/add-doctor"
          element={<DynamicImport component={AddDoctorPage} />}
        />
        <Route
          path="doctors/edit/:id"
          element={<DynamicImport component={EditDoctorPage} />}
        />
        <Route
          path="patients"
          element={<DynamicImport component={PatientsPage} />}
        />
      </Route>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
