import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { useAppStore } from "./store";
import {useEffect, useState } from "react";
import {Loader2} from "lucide-react"
import { GET_USER_INFO } from "./utils/constants";
import { apiClient } from "./lib/api-client";
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
const App = () => {
  const {userInfo,setUserInfo} = useAppStore();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const res = await apiClient.get(GET_USER_INFO,{withCredentials:true});
        if(res.status === 200 && res.data.id){
          setUserInfo(res.data);
        }
        else{
          setUserInfo(undefined);
        }
      }
      catch (error){
        setUserInfo(undefined);
      }
      finally{
        setLoading(false)
      }
    }
    if(!userInfo){
      fetchUserInfo()
    }
    else{
      setLoading(false);
    }
  }, [userInfo,setUserInfo]);

  if(loading) return <Loader2 className="animate-spin"/>
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
