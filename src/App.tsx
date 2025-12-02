import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Problemset from "./components/Problemset";
import Profile from "./components/Profile";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user/slice";


const App = () => {
  const isAuth = useAppSelector(selectIsAuth);

  const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
    return element;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/problemset" element={<Problemset />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
    </Routes>
  );
};

export default App;
