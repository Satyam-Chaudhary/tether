import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import Lottie from "lottie-react";
import animationData from '@/assets/lottieAnimations/loader2.json';

// PrivateRoute component that will only render its children if the user is authenticated
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; // !! converts to boolean value of userInfo false for undefined or null
  return isAuthenticated ? children : <Navigate to="/auth" />; // if authenticated render children else navigate to auth
};

// AuthRoute component that will only render its children if the user is not authenticated
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children; // if authenticated navigate to chat else render children
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  // for direct access to chat page if user is already authenticated via jwt
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        //console.log({ response });
        if(response.status === 200 && response.data.user.id){
          setUserInfo(response.data.user);
        }else{
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
        console.log({ error });
      }finally{
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      // if user info is already present then set loading to false
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    // Skeleton
    return (
      <div className="flex h-screen justify-center items-center">
        <Lottie
          isClickToPauseDisabled={true}
          height={100}
          width={100}
          animationData={animationData}
        />
      </div>
    );
  }


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
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
