import { Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Navbar from "./components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { StoreActions, type InitialState } from "./datatypes"
import { useEffect, useState } from "react"
import LoginForm from "./components/Login/LoginForm"
import { getUserById } from "./core/user-web"
import { USERID } from "./constants"

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: InitialState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchOrLogin() {
    const userId = localStorage.getItem(USERID);
    if (userId && userId !== 'undefined' && userId !== 'null') {
      try {
        const res = await getUserById(userId);
        if (res.ok) {
          const userData = await res.json();
          dispatch({
            type: StoreActions.UPDATE_USER,
            data: userData.data
          });
          localStorage.setItem(USERID, userData.data.user_id);
          navigate('/');
        } else {
          navigate('/user-login');
        }
      } catch (_) {
        navigate("/user-login");
      }
    } else {
      navigate('/user-login');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOrLogin();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading your wallet...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/user-login" element={<LoginForm />} />
        <Route path="/" element={!user ? <></> : <>
          <Navbar />
          <Dashboard />
        </>}
        />
      </Routes>
    </div>
  )
}

export default App
