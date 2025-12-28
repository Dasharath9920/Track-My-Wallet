import { Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Navbar from "./components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { StoreActions, type InitialState } from "./datatypes"
import { useEffect } from "react"
import LoginForm from "./components/Login/LoginForm"
import { getUserById } from "./core/user-web"
import { USERID } from "./constants"

function App() {
  const user = useSelector((state: InitialState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchOrLogin() {
    const userId = localStorage.getItem(USERID);
    if (userId) {
      try {
        const res = await getUserById(userId);
        if (res.ok) {
          const user = await res.json();
          dispatch({
            type: StoreActions.UPDATE_USER,
            data: user.data
          });
          return;
        }
      } catch (_) { }
    }
    navigate('/user-login');
  }

  useEffect(() => {
    fetchOrLogin();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USERID, user.user_id);
      navigate('/home');
    } else {
      navigate('/user-login');
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
