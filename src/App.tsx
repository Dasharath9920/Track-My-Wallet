import { Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Navbar from "./components/Navbar/Navbar"
import { useSelector } from "react-redux"
import type { InitialState } from "./datatypes"
import { useEffect } from "react"
import LoginForm from "./components/Login/LoginForm"

function App() {
  const user = useSelector((state: InitialState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user-login');
    } else {
      navigate('/home');
    }
  }, [user]);

  return (
    <div>
      <Routes>
        <Route path="/user-login" element={<LoginForm />} />
        <Route path="/home" element={<>
          <Navbar />
          <Dashboard />
        </>}
        />
      </Routes>
    </div>
  )
}

export default App
