import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedLayout from "./components/ProtectedLayout";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import RouteFallback from "./components/RouteFallback";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";

import NewInterview from "./pages/NewInterview";
import InterviewHistory from "./pages/InterviewHistory";

function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new-interview" element={<NewInterview />} />
              <Route path="/history" element={<InterviewHistory />} />
              <Route path="*" element={<RouteFallback />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="h-screen flex overflow-hidden">
      {!hideSidebar && (
        <div className="w-55 border">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;