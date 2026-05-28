import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedLayout from "./components/ProtectedLayout";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import RouteFallback from "./components/RouteFallback";
import Profile from "./components/Profile";


function App() {

  function Layout() {

    const location = useLocation()

    const hideSidebar =
      location.pathname === "/login" ||
      location.pathname === "/signup"

    return (
      <div className="flex h-screen">

        {
          hideSidebar
            ? null
            : <div className="w-32 border-1">Sidebar</div>
        }

        <div>

          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<RouteFallback />} />
          </Routes>

        </div>
      </div>
    )
  }
  return (
    <>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </>
  )
}

export default App
